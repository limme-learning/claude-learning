export interface Style {
  name: string
  title: string
  description: string
}

export const STYLES: Style[] = [
  { name: "vega", title: "Vega", description: "Clean, neutral, and familiar" },
  { name: "nova", title: "Nova", description: "Reduced padding and margins" },
  {
    name: "maia",
    title: "Maia",
    description: "Rounded, with generous spacing.",
  },
  { name: "lyra", title: "Lyra", description: "Minimalist, with sharp edges." },
  {
    name: "mira",
    title: "Mira",
    description: "Balanced with compact padding.",
  },
  { name: "luma", title: "Luma", description: "Bright, airy, and soft." },
  { name: "sera", title: "Sera", description: "Editorial and sharp." },
  { name: "rhea", title: "Rhea", description: "Wide and warm." },
] as const

export type StyleName = Style["name"]
