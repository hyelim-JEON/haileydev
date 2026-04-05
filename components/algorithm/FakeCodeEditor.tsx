"use client";

import React, { useState } from "react";

type Props = {
  code: string;
  fileName?: string;
  language?: "js" | "ts";
};

const KEYWORDS = new Set([
  "function",
  "return",
  "const",
  "let",
  "var",
  "if",
  "else",
  "for",
  "while",
  "true",
  "false",
  "new",
  "class",
  "try",
  "catch",
  "throw",
]);

const BUILT_INS = new Set(["Map", "Set", "JSON", "Math", "Object", "Array", "String", "Number", "Boolean"]);

const OPERATORS = /^(=|=>|\+|-|\*|\/|%|<|>|!|&|\||\?|\:|\.\.\.)+$/;
const BRACKETS = /^[()[\]{}]$/;

function tokenize(line: string) {
  return (
    line.match(
      /\/\/.*|"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|`(?:[^`\\]|\\.)*`|\b\d+(\.\d+)?\b|\b[A-Za-z_$][\w$]*\b|=>|===|==|!==|!=|<=|>=|\+\+|--|&&|\|\||[=+\-*/<>!&|?:.%]+|[()[\]{}]|[^\s]+|\s+/g,
    ) || []
  );
}

function isFunctionName(tokens: string[], index: number) {
  const token = tokens[index];
  const nextNonSpace = tokens.slice(index + 1).find((t) => !/^\s+$/.test(t));
  return /^[A-Za-z_$][\w$]*$/.test(token) && nextNonSpace === "(";
}

export default function FakeCodeEditor({ code, fileName = "solution.js", language = "js" }: Props) {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const lines = code.split("\n");
  const isDark = theme === "dark";

  const colors = {
    wrapper: isDark ? "border-[#2d2d2d] bg-[#1e1e1e]" : "border-[#7f7f7f] bg-white shadow-[inset_1px_1px_0_#ffffff,inset_-1px_-1px_0_#808080]",
    tabBar: isDark ? "border-[#2d2d2d] bg-[#252526]" : "border-[#808080] bg-[#d4d0c8]",
    activeTab: isDark ? "border-[#3c3c3c] bg-[#1e1e1e] text-[#cccccc]" : "border-[#808080] bg-white text-[#222]",
    toggleBtn: isDark
      ? "border-[#3c3c3c] bg-[#2d2d2d] text-[#cccccc] hover:bg-[#383838]"
      : "border-[#808080] bg-[#efefef] text-[#222] hover:bg-white",
    pathBar: isDark ? "border-[#2d2d2d] bg-[#181818] text-[#8c8c8c]" : "border-[#b7b7b7] bg-[#d4d0c8] text-[#555]",
    scrollArea: isDark ? "bg-[#1e1e1e]" : "bg-white",
    lineHover: isDark ? "hover:bg-[#2a2d2e]" : "hover:bg-[#f3f7ff]",
    gutter: isDark
      ? "border-[#2d2d2d] bg-[#1e1e1e] text-[#858585] group-hover:bg-[#252526]"
      : "border-[#d7d7d7] bg-[#f7f7f7] text-[#888] group-hover:bg-[#efefef]",
    codeText: isDark ? "text-[#d4d4d4]" : "text-black",
    statusBar: isDark ? "border-[#2d2d2d] bg-[#252526] text-[#cccccc]" : "border-[#b7b7b7] bg-[#d4d0c8] text-[#222]",
    caret: isDark ? "bg-[#aeafad]" : "bg-black",
    keyword: isDark ? "text-[#569cd6]" : "text-[#0000ff]",
    builtin: isDark ? "text-[#4ec9b0]" : "text-[#267f99]",
    fn: isDark ? "text-[#dcdcaa]" : "text-[#795e26]",
    string: isDark ? "text-[#ce9178]" : "text-[#a31515]",
    comment: isDark ? "text-[#6a9955]" : "text-[#008000]",
    number: isDark ? "text-[#b5cea8]" : "text-[#098658]",
    op: isDark ? "text-[#d4d4d4]" : "text-[#444]",
    bracket: isDark ? "text-[#d4d4d4]" : "text-[#333]",
  };

  function highlightLine(line: string) {
    const tokens = tokenize(line);

    return tokens.map((token, i) => {
      if (/^\s+$/.test(token)) return <span key={i}>{token}</span>;

      if (token.startsWith("//")) {
        return (
          <span key={i} className={colors.comment}>
            {token}
          </span>
        );
      }

      if (
        (token.startsWith('"') && token.endsWith('"')) ||
        (token.startsWith("'") && token.endsWith("'")) ||
        (token.startsWith("`") && token.endsWith("`"))
      ) {
        return (
          <span key={i} className={colors.string}>
            {token}
          </span>
        );
      }

      if (/^\d+(\.\d+)?$/.test(token)) {
        return (
          <span key={i} className={colors.number}>
            {token}
          </span>
        );
      }

      if (KEYWORDS.has(token)) {
        return (
          <span key={i} className={`${colors.keyword} font-medium`}>
            {token}
          </span>
        );
      }

      if (BUILT_INS.has(token)) {
        return (
          <span key={i} className={colors.builtin}>
            {token}
          </span>
        );
      }

      if (isFunctionName(tokens, i)) {
        return (
          <span key={i} className={colors.fn}>
            {token}
          </span>
        );
      }

      if (OPERATORS.test(token)) {
        return (
          <span key={i} className={colors.op}>
            {token}
          </span>
        );
      }

      if (BRACKETS.test(token)) {
        return (
          <span key={i} className={colors.bracket}>
            {token}
          </span>
        );
      }

      return <span key={i}>{token}</span>;
    });
  }

  return (
    <section className={`overflow-hidden rounded-sm border ${colors.wrapper}`}>
      <div className={`border-b ${colors.tabBar}`}>
        <div className="flex items-end justify-between px-2 pt-2">
          <div className={`rounded-t-sm border border-b-0 px-3 py-1.5 text-[11px] ${colors.activeTab}`}>{fileName}</div>

          <button
            onClick={() => setTheme((prev) => (prev === "light" ? "dark" : "light"))}
            className={`mb-1 rounded-sm border px-1.5 py-[2px] text-[9px] leading-none ${colors.toggleBtn}`}
          >
            {theme === "light" ? "Dark" : "Light"}
          </button>
        </div>
      </div>

      <div className={`border-b px-3 py-1 text-[11px] ${colors.pathBar}`}>
        problems / {language} / {fileName}
      </div>

      <div className={`overflow-x-auto overflow-y-auto ${lines.length > 12 ? "h-[320px]" : "h-auto"}`}>
        <div className={`min-w-max font-mono text-[13px] leading-6 ${colors.codeText}`}>
          {lines.map((line, index) => {
            const isLastLine = index === lines.length - 1;

            return (
              <div key={index} className={`group flex min-h-[24px] ${colors.lineHover}`}>
                <div className={`w-14 shrink-0 select-none border-r px-3 text-right ${colors.gutter}`}>{index + 1}</div>

                <div className="flex-1 whitespace-pre px-4">
                  {highlightLine(line)}
                  {isLastLine && <span className={`ml-[1px] inline-block h-[15px] w-[8px] animate-pulse align-middle ${colors.caret}`} />}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className={`flex items-center justify-between border-t px-3 py-1 text-[10px] ${colors.statusBar}`}>
        <span>{language.toUpperCase()}</span>
        <span>{theme === "dark" ? "VSCode Dark" : "Light"}</span>
      </div>
    </section>
  );
}
