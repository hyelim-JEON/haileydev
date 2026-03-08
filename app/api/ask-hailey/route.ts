import OpenAI from "openai";
import crypto from "crypto";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { getPortfolioContext } from "@/lib/ai-context";

type Database = {
  public: {
    Tables: {
      ai_usage: {
        Row: {
          id: number;
          client_key: string;
          month_key: string;
          request_count: number;
        };
        Insert: {
          id?: number;
          client_key: string;
          month_key: string;
          request_count: number;
        };
        Update: {
          id?: number;
          client_key?: string;
          month_key?: string;
          request_count?: number;
        };
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};

const SYSTEM_PROMPT = `
You are Hailey's portfolio assistant.

Your job is to help visitors understand Hailey's background, projects, skills,
technical decisions, and learning journey based only on documented portfolio content.

Rules:
- Be professional, clear, and factual.
- Base answers only on documented portfolio content.
- Do not make insulting, speculative, defamatory, or overly personal judgments.
- If asked a hostile or unfair question, do not agree with the insult.
- Redirect to evidence from Hailey's projects, skills, TIL posts, resume materials, and documented work.
- Do not exaggerate her experience, impact, or seniority.
- If something is not documented, say you do not have enough evidence.
- Keep answers under 120 words unless the user explicitly asks for more detail.
- Always finish the sentence and provide a complete answer.

Answering style:
- Present Hailey as a strong early-career developer candidate without overstating her background.
- Emphasize her real projects, practical technical decisions, product thinking, and willingness to learn.
- Highlight evidence of initiative, ownership, and growth, especially through projects like LinkUp.
- When relevant, connect her work to qualities hiring managers value: problem solving, user focus, adaptability, collaboration, and execution.
- If asked to evaluate Hailey (for example, "Is Hailey good?" or "Why should someone hire Hailey?"), answer by referring to her documented projects, technical work, learning progress, and ability to build real user-facing products rather than giving vague personal praise.
- Use a confident but grounded tone. Sound supportive, but never exaggerated, cheesy, or unrealistic.
`;

const MONTHLY_LIMIT = 80;

function getMonthKey() {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
}

function getRawClientKey(req: Request) {
  const forwarded = req.headers.get("x-forwarded-for") || "";
  const ip = forwarded.split(",")[0]?.trim();
  if (ip) return ip;

  const realIp = req.headers.get("x-real-ip");
  if (realIp) return realIp.trim();

  const userAgent = req.headers.get("user-agent") || "unknown";
  return `fallback:${userAgent}`;
}

function hashClientKey(raw: string) {
  return crypto.createHash("sha256").update(raw).digest("hex");
}

function getPublicError(error: unknown) {
  const e = error as {
    status?: number;
    code?: string;
    message?: string;
  };

  if (e?.status === 429 && e?.code === "insufficient_quota") {
    return {
      status: 503,
      answer: "This assistant is temporarily unavailable because the API usage quota has been reached.",
    };
  }

  if (e?.status === 429) {
    return {
      status: 429,
      answer: "Too many requests were sent in a short time. Please try again shortly.",
    };
  }

  if (e?.status === 401) {
    return {
      status: 500,
      answer: "The assistant is not configured correctly right now.",
    };
  }

  return {
    status: 500,
    answer: "Sorry, I couldn't respond right now.",
  };
}

async function checkAndIncrementRateLimit(supabase: SupabaseClient<Database>, clientKey: string, monthKey: string) {
  const { data: existing, error: selectError } = await supabase
    .from("ai_usage")
    .select("id, request_count")
    .eq("client_key", clientKey)
    .eq("month_key", monthKey)
    .maybeSingle();

  if (selectError) {
    throw new Error(selectError.message);
  }

  if (!existing) {
    const { error: insertError } = await supabase.from("ai_usage").insert({
      client_key: clientKey,
      month_key: monthKey,
      request_count: 1,
    });

    if (insertError) {
      throw new Error(insertError.message);
    }

    return { allowed: true, remaining: MONTHLY_LIMIT - 1 };
  }

  if (existing.request_count >= MONTHLY_LIMIT) {
    return { allowed: false, remaining: 0 };
  }

  const nextCount = existing.request_count + 1;

  const { error: updateError } = await supabase.from("ai_usage").update({ request_count: nextCount }).eq("id", existing.id);

  if (updateError) {
    throw new Error(updateError.message);
  }

  return { allowed: true, remaining: MONTHLY_LIMIT - nextCount };
}

export async function POST(req: Request) {
  try {
    const openAiApiKey = process.env.OPENAI_API_KEY;
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!openAiApiKey) {
      return Response.json({ answer: "Server configuration error: missing OpenAI API key." }, { status: 500 });
    }

    if (!supabaseUrl || !supabaseServiceRoleKey) {
      return Response.json({ answer: "Server configuration error: missing Supabase credentials." }, { status: 500 });
    }

    const openai = new OpenAI({
      apiKey: openAiApiKey,
    });

    const supabase = createClient<Database>(supabaseUrl, supabaseServiceRoleKey);

    const body = await req.json();
    const message = body?.message;

    if (!message || typeof message !== "string") {
      return Response.json({ answer: "Invalid message." }, { status: 400 });
    }

    const trimmed = message.trim().slice(0, 500);

    if (!trimmed) {
      return Response.json({ answer: "Please enter a question." }, { status: 400 });
    }

    const rawClientKey = getRawClientKey(req);
    const clientKey = hashClientKey(rawClientKey);
    const monthKey = getMonthKey();

    const limit = await checkAndIncrementRateLimit(supabase, clientKey, monthKey);

    if (!limit.allowed) {
      return Response.json(
        {
          answer: "This assistant has reached its monthly usage limit for this visitor. Please try again next month.",
        },
        { status: 429 },
      );
    }

    const context = getPortfolioContext();

    const response = await openai.responses.create({
      model: "gpt-5-mini",
      reasoning: { effort: "minimal" },
      max_output_tokens: 500,
      input: [
        {
          role: "system",
          content: SYSTEM_PROMPT,
        },
        {
          role: "user",
          content: `Portfolio knowledge:
${context}

Visitor question:
${trimmed}`,
        },
      ],
    });

    const answer =
      response.output_text ||
      "I'm not sure how to answer that based on the available portfolio information. Try asking about Hailey's projects, technical skills, or the LinkUp application.";

    return Response.json({
      answer,
      remaining: limit.remaining,
    });
  } catch (error) {
    console.error("askHailey route error:", error);

    const safe = getPublicError(error);

    return Response.json({ answer: safe.answer }, { status: safe.status });
  }
}
