import { BASES, type Base, type BaseName } from "./bases"
import { STYLES, type Style, type StyleName } from "./styles"

export { BASES, type Base, type BaseName }
export { STYLES, type Style, type StyleName }

export const AVAILABLE_BASES = ["base", "radix"] as const
export type AvailableBaseName = (typeof AVAILABLE_BASES)[number]

export const DEFAULT_STYLE = "nova" as const

export function isAvailableBaseName(name: string): name is AvailableBaseName {
  return (AVAILABLE_BASES as readonly string[]).includes(name)
}

export function titleCase(slug: string): string {
  return slug
    .split("-")
    .map((word) => (word[0]?.toUpperCase() ?? "") + word.slice(1))
    .join(" ")
}
