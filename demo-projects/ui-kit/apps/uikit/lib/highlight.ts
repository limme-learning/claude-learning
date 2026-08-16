import { createHighlighter, type Highlighter, type ThemeInput } from "shiki"

// Token colors are CSS variables defined against the ui-kit design tokens in
// globals.css (`--shiki-*`), so highlighting follows the class-based theme
// toggle with a single HTML block and zero client-side highlighting code.
const theme: ThemeInput = {
  name: "ui-kit",
  type: "dark",
  fg: "var(--shiki-fg)",
  bg: "transparent",
  colors: {
    "editor.background": "transparent",
    "editor.foreground": "var(--shiki-fg)",
  },
  tokenColors: [
    {
      scope: ["comment", "punctuation.definition.comment"],
      settings: { foreground: "var(--shiki-comment)" },
    },
    {
      scope: ["keyword", "storage", "keyword.operator", "punctuation.accessor"],
      settings: { foreground: "var(--shiki-keyword)" },
    },
    {
      scope: ["string", "string.template"],
      settings: { foreground: "var(--shiki-string)" },
    },
    {
      scope: ["constant", "constant.language", "constant.numeric"],
      settings: { foreground: "var(--shiki-constant)" },
    },
    {
      scope: [
        "entity.name.function",
        "entity.name.function.call",
        "support.function",
      ],
      settings: { foreground: "var(--shiki-function)" },
    },
    {
      scope: [
        "entity.name.type",
        "entity.name.class",
        "support.type",
        "storage.type.class",
      ],
      settings: { foreground: "var(--shiki-type)" },
    },
    {
      scope: ["variable.parameter", "parameter"],
      settings: { foreground: "var(--shiki-parameter)" },
    },
    {
      scope: ["punctuation"],
      settings: { foreground: "var(--shiki-punctuation)" },
    },
    {
      scope: ["string.other.link", "markup.inserted"],
      settings: { foreground: "var(--shiki-link)" },
    },
  ],
}

let highlighterPromise: Promise<Highlighter> | null = null

function getHighlighter(): Promise<Highlighter> {
  highlighterPromise ??= createHighlighter({ themes: [theme], langs: ["tsx"] })
  return highlighterPromise
}

export async function highlightTsx(source: string): Promise<string> {
  if (!source) return ""
  const highlighter = await getHighlighter()
  return highlighter.codeToHtml(source, { lang: "tsx", theme: "ui-kit" })
}
