import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const CONTACT_EMAIL = process.env.CONTACT_EMAIL || "hyelimiam@gmail.com";
const lastRequest = new Map<string, number>();

function getClientIp(req: Request) {
  const forwardedFor = req.headers.get("x-forwarded-for") || "";
  const ip = forwardedFor.split(",")[0]?.trim();
  if (ip) return ip;

  const realIp = req.headers.get("x-real-ip");
  if (realIp) return realIp.trim();

  return "unknown";
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const name = typeof body?.name === "string" ? body.name.trim() : "";
    const email = typeof body?.email === "string" ? body.email.trim() : "";
    const message = typeof body?.message === "string" ? body.message.trim() : "";

    const ip = getClientIp(req);
    const now = Date.now();
    const last = lastRequest.get(ip) || 0;

    if (now - last < 10000) {
      return Response.json({ error: "Please wait before sending another message." }, { status: 429 });
    }

    lastRequest.set(ip, now);

    if (!email || !message) {
      return Response.json({ error: "Please enter your email and message." }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return Response.json({ error: "Please enter a valid email address." }, { status: 400 });
    }

    if (message.length < 10) {
      return Response.json({ error: "Message is too short." }, { status: 400 });
    }

    if (message.length > 3000) {
      return Response.json({ error: "Message is too long." }, { status: 400 });
    }

    const result = await resend.emails.send({
      from: "Hailey Portfolio <onboarding@resend.dev>",
      to: "hyelimiam@gmail.com",
      replyTo: email,
      subject: `Portfolio contact from ${name || "Visitor"}`,
      text: [`From: ${name || "Not provided"}`, `Reply email: ${email}`, "", "Message:", message].join("\n"),
    });

    if (result.error) {
      console.error("Resend send error:", result.error);

      return Response.json(
        {
          error: "Email could not be sent in test mode. Make sure the recipient is hyelimiam@gmail.com and that your Resend API key is correct.",
        },
        { status: 500 },
      );
    }
    console.log("RESEND_TO =", process.env.RESEND_TO);

    return Response.json({ success: true });
  } catch (error) {
    console.error("Contact route error:", error);

    return Response.json({ error: "Something went wrong while sending the message." }, { status: 500 });
  }
}
