"use client";

import React, { useState } from "react";
import { Check, Copy, Info, AlertTriangle, Lightbulb, Flame, ExternalLink } from "lucide-react";

function CodeBlock({ code, language }: { code: string; language: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group my-6 rounded-2xl overflow-hidden border border-white/10 bg-[#0c0d12] shadow-xl">
      {/* Mac Terminal Style Window Header */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-white/[0.04] border-b border-white/5 text-xs text-zinc-400 font-mono">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
          </div>
          <span className="ml-2 text-zinc-500 text-[11px] font-sans">
            {language ? language.toUpperCase() : "CODE"}
          </span>
        </div>

        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white transition-all text-xs"
          title="复制全部代码"
          aria-label="复制代码"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-emerald-400 font-medium">已复制</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span>复制</span>
            </>
          )}
        </button>
      </div>

      {/* Code Area */}
      <div className="p-4 overflow-x-auto text-sm font-mono text-zinc-200 leading-relaxed selection:bg-[#FF5A1F]/30 selection:text-white">
        <pre className="!bg-transparent !p-0 !m-0">
          <code>{code}</code>
        </pre>
      </div>
    </div>
  );
}

function renderInlineText(text: string): React.ReactNode {
  // Parse inline elements: `code`, **bold**, *italic*, [link](url), images ![alt](src)
  const parts: React.ReactNode[] = [];
  let remaining = text;
  let keyIndex = 0;

  while (remaining.length > 0) {
    // 1. Inline code: `code`
    const codeMatch = remaining.match(/`([^`]+)`/);
    // 2. Bold: **text** or __text__
    const boldMatch = remaining.match(/\*\*([^*]+)\*\*/);
    // 3. Link: [text](url)
    const linkMatch = remaining.match(/\[([^\]]+)\]\(([^)]+)\)/);
    // 4. Strikethrough: ~~text~~
    const strikeMatch = remaining.match(/~~([^~]+)~~/);

    // Find the earliest match
    const matches = [
      codeMatch ? { type: "code", index: codeMatch.index!, match: codeMatch } : null,
      boldMatch ? { type: "bold", index: boldMatch.index!, match: boldMatch } : null,
      linkMatch ? { type: "link", index: linkMatch.index!, match: linkMatch } : null,
      strikeMatch ? { type: "strike", index: strikeMatch.index!, match: strikeMatch } : null,
    ].filter(Boolean) as { type: string; index: number; match: RegExpMatchArray }[];

    if (matches.length === 0) {
      parts.push(remaining);
      break;
    }

    // Sort by index
    matches.sort((a, b) => a.index - b.index);
    const earliest = matches[0];

    // Push text before match
    if (earliest.index > 0) {
      parts.push(remaining.substring(0, earliest.index));
    }

    const { type, match } = earliest;
    const fullMatch = match[0];

    if (type === "code") {
      parts.push(
        <code
          key={`inline-code-${keyIndex++}`}
          className="px-1.5 py-0.5 mx-0.5 rounded-md bg-white/10 text-[#FF8554] border border-white/5 font-mono text-[0.875em]"
        >
          {match[1]}
        </code>
      );
    } else if (type === "bold") {
      parts.push(
        <strong key={`bold-${keyIndex++}`} className="font-semibold text-white">
          {renderInlineText(match[1])}
        </strong>
      );
    } else if (type === "link") {
      const href = match[2];
      const isExternal = href.startsWith("http");
      parts.push(
        <a
          key={`link-${keyIndex++}`}
          href={href}
          target={isExternal ? "_blank" : undefined}
          rel={isExternal ? "noreferrer" : undefined}
          className="text-[#FF5A1F] hover:text-[#ff7847] underline underline-offset-4 decoration-[#FF5A1F]/40 hover:decoration-[#FF5A1F] transition-colors inline-flex items-center gap-0.5"
        >
          <span>{match[1]}</span>
          {isExternal && <ExternalLink className="w-3 h-3 inline-block ml-0.5 opacity-70" />}
        </a>
      );
    } else if (type === "strike") {
      parts.push(
        <del key={`strike-${keyIndex++}`} className="line-through text-zinc-500">
          {match[1]}
        </del>
      );
    }

    remaining = remaining.substring(earliest.index + fullMatch.length);
  }

  return parts;
}

export default function MarkdownRenderer({ content }: { content: string }) {
  const blocks: React.ReactNode[] = [];
  const lines = content.split(/\r?\n/);
  let i = 0;
  let blockKey = 0;

  while (i < lines.length) {
    const line = lines[i];

    // Empty line
    if (!line.trim()) {
      i++;
      continue;
    }

    // Fenced Code Block ```lang
    if (line.trim().startsWith("```")) {
      const lang = line.trim().slice(3).trim();
      const codeLines: string[] = [];
      i++;
      while (i < lines.length && !lines[i].trim().startsWith("```")) {
        codeLines.push(lines[i]);
        i++;
      }
      i++; // skip closing ```
      blocks.push(
        <CodeBlock key={`block-${blockKey++}`} language={lang} code={codeLines.join("\n")} />
      );
      continue;
    }

    // Callout / Blockquote: > [!NOTE], > [!TIP], > [!WARNING], or standard >
    if (line.startsWith(">")) {
      const quoteLines: string[] = [];
      while (i < lines.length && lines[i].startsWith(">")) {
        quoteLines.push(lines[i].replace(/^>\s?/, ""));
        i++;
      }

      const firstLine = quoteLines[0] || "";
      let calloutType: "NOTE" | "TIP" | "WARNING" | "IMPORTANT" | null = null;
      let calloutContent = quoteLines;

      const calloutMatch = firstLine.match(/^\[!(NOTE|TIP|WARNING|IMPORTANT)\]/i);
      if (calloutMatch) {
        calloutType = calloutMatch[1].toUpperCase() as "NOTE" | "TIP" | "WARNING" | "IMPORTANT";
        calloutContent = quoteLines.slice(1);
      }

      if (calloutType) {
        const config = {
          NOTE: {
            border: "border-sky-500/30",
            bg: "bg-sky-500/10",
            icon: <Info className="w-5 h-5 text-sky-400 shrink-0" />,
            title: "提示 / NOTE",
            titleColor: "text-sky-300",
          },
          TIP: {
            border: "border-emerald-500/30",
            bg: "bg-emerald-500/10",
            icon: <Lightbulb className="w-5 h-5 text-emerald-400 shrink-0" />,
            title: "心得 / TIP",
            titleColor: "text-emerald-300",
          },
          WARNING: {
            border: "border-amber-500/30",
            bg: "bg-amber-500/10",
            icon: <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0" />,
            title: "注意 / WARNING",
            titleColor: "text-amber-300",
          },
          IMPORTANT: {
            border: "border-[#FF5A1F]/30",
            bg: "bg-[#FF5A1F]/10",
            icon: <Flame className="w-5 h-5 text-[#FF5A1F] shrink-0" />,
            title: "核心原则 / IMPORTANT",
            titleColor: "text-[#FF8554]",
          },
        }[calloutType];

        blocks.push(
          <div
            key={`block-${blockKey++}`}
            className={`my-6 p-4 sm:p-5 rounded-2xl border ${config.border} ${config.bg} flex items-start gap-3.5`}
          >
            {config.icon}
            <div className="flex-1 text-sm text-zinc-300 leading-relaxed">
              <div className={`font-semibold text-xs tracking-wider uppercase mb-1 ${config.titleColor}`}>
                {config.title}
              </div>
              <div className="space-y-1">
                {calloutContent.map((qLine, qIdx) => (
                  <p key={qIdx}>{renderInlineText(qLine)}</p>
                ))}
              </div>
            </div>
          </div>
        );
      } else {
        // Standard Blockquote
        blocks.push(
          <blockquote
            key={`block-${blockKey++}`}
            className="my-6 pl-4 border-l-2 border-[#FF5A1F] bg-white/[0.02] py-2 px-3 rounded-r-xl text-zinc-300 italic text-base leading-relaxed"
          >
            {quoteLines.map((qLine, qIdx) => (
              <p key={qIdx} className={qIdx > 0 ? "mt-2" : ""}>
                {renderInlineText(qLine)}
              </p>
            ))}
          </blockquote>
        );
      }
      continue;
    }

    // Markdown Table: lines starting with "|"
    if (line.trim().startsWith("|") && line.trim().endsWith("|")) {
      const tableLines: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith("|") && lines[i].trim().endsWith("|")) {
        tableLines.push(lines[i]);
        i++;
      }

      if (tableLines.length >= 2) {
        const parseRow = (rowStr: string) =>
          rowStr
            .split("|")
            .slice(1, -1)
            .map((c) => c.trim());

        const headerRow = parseRow(tableLines[0]);
        // line 1 is usually divider like | --- | --- |
        const dataRows = tableLines.slice(2).map(parseRow);

        blocks.push(
          <div
            key={`block-${blockKey++}`}
            className="my-6 overflow-x-auto rounded-2xl border border-white/10 bg-white/[0.01]"
          >
            <table className="w-full text-left text-sm text-zinc-300">
              <thead className="bg-white/5 border-b border-white/10 text-xs uppercase tracking-wider text-zinc-200">
                <tr>
                  {headerRow.map((col, cIdx) => (
                    <th key={cIdx} className="px-4 py-3 font-semibold">
                      {renderInlineText(col)}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {dataRows.map((row, rIdx) => (
                  <tr key={rIdx} className="hover:bg-white/[0.02] transition-colors">
                    {row.map((cell, cIdx) => (
                      <td key={cIdx} className="px-4 py-3 text-zinc-400">
                        {renderInlineText(cell)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
        continue;
      }
    }

    // Headings
    if (line.startsWith("#")) {
      const match = line.match(/^(#{1,6})\s+(.+)$/);
      if (match) {
        const level = match[1].length;
        const text = match[2];
        const id = text
          .toLowerCase()
          .replace(/[^\w\u4e00-\u9fa5-]+/g, "-")
          .replace(/^-+|-+$/g, "");

        if (level === 1) {
          blocks.push(
            <h1
              key={`block-${blockKey++}`}
              id={id}
              className="text-2xl sm:text-3xl font-extrabold text-white mt-10 mb-4 tracking-tight scroll-mt-28"
            >
              {renderInlineText(text)}
            </h1>
          );
        } else if (level === 2) {
          blocks.push(
            <h2
              key={`block-${blockKey++}`}
              id={id}
              className="text-xl sm:text-2xl font-bold text-white mt-10 mb-3.5 tracking-tight flex items-center gap-2 group scroll-mt-28 border-b border-white/5 pb-2.5"
            >
              <a
                href={`#${id}`}
                className="opacity-0 group-hover:opacity-100 text-[#FF5A1F] transition-opacity -ml-6 pr-2 select-none"
                aria-label="跳转到此章节"
              >
                #
              </a>
              <span>{renderInlineText(text)}</span>
            </h2>
          );
        } else if (level === 3) {
          blocks.push(
            <h3
              key={`block-${blockKey++}`}
              id={id}
              className="text-lg sm:text-xl font-bold text-zinc-100 mt-8 mb-2.5 tracking-tight scroll-mt-28"
            >
              {renderInlineText(text)}
            </h3>
          );
        } else {
          blocks.push(
            <h4
              key={`block-${blockKey++}`}
              id={id}
              className="text-base font-semibold text-zinc-200 mt-6 mb-2 scroll-mt-28"
            >
              {renderInlineText(text)}
            </h4>
          );
        }

        i++;
        continue;
      }
    }

    // Horizontal Divider --- or ***
    if (/^(\*{3,}|-{3,}|_{3,})$/.test(line.trim())) {
      blocks.push(
        <hr key={`block-${blockKey++}`} className="my-10 border-t border-white/10" />
      );
      i++;
      continue;
    }

    // Images: ![alt](url)
    const imgMatch = line.trim().match(/^!\[([^\]]*)\]\(([^)]+)\)$/);
    if (imgMatch) {
      const alt = imgMatch[1];
      const src = imgMatch[2];
      blocks.push(
        <figure key={`block-${blockKey++}`} className="my-8">
          <div className="rounded-2xl overflow-hidden border border-white/10 bg-black/40 shadow-2xl">
            <img src={src} alt={alt} className="w-full h-auto object-cover max-h-[500px]" />
          </div>
          {alt && (
            <figcaption className="text-center text-xs text-zinc-500 mt-2 font-mono">
              {alt}
            </figcaption>
          )}
        </figure>
      );
      i++;
      continue;
    }

    // Lists (Unordered - / * or Ordered 1.)
    if (/^(\*|-|\d+\.)\s+/.test(line.trim())) {
      const isOrdered = /^\d+\.\s+/.test(line.trim());
      const listItems: { text: string; subItems?: string[] }[] = [];

      while (i < lines.length && /^(\*|-|\d+\.)\s+/.test(lines[i].trim())) {
        const itemText = lines[i].trim().replace(/^(\*|-|\d+\.)\s+/, "");
        i++;
        listItems.push({ text: itemText });
      }

      if (isOrdered) {
        blocks.push(
          <ol key={`block-${blockKey++}`} className="my-5 space-y-2.5 list-none counter-reset pl-1">
            {listItems.map((item, idx) => (
              <li key={idx} className="flex items-start gap-3 text-zinc-300 text-sm sm:text-base leading-relaxed">
                <span className="w-5 h-5 rounded-full bg-white/10 border border-white/10 text-xs font-mono text-[#FF5A1F] flex items-center justify-center shrink-0 mt-0.5 font-bold">
                  {idx + 1}
                </span>
                <div className="flex-1">{renderInlineText(item.text)}</div>
              </li>
            ))}
          </ol>
        );
      } else {
        blocks.push(
          <ul key={`block-${blockKey++}`} className="my-5 space-y-2 list-none pl-1">
            {listItems.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2.5 text-zinc-300 text-sm sm:text-base leading-relaxed">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF5A1F] shrink-0 mt-2.5" />
                <div className="flex-1">{renderInlineText(item.text)}</div>
              </li>
            ))}
          </ul>
        );
      }
      continue;
    }

    // Regular Paragraph
    blocks.push(
      <p
        key={`block-${blockKey++}`}
        className="my-4 text-zinc-300 text-sm sm:text-base leading-relaxed sm:leading-loose font-normal"
      >
        {renderInlineText(line)}
      </p>
    );
    i++;
  }

  return <div className="blog-prose space-y-2 text-zinc-200">{blocks}</div>;
}
