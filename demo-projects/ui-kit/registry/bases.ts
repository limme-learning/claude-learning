export interface BaseDefinition {
  name: "base" | "radix"
  type: "registry:style"
  title: string
  description: string
  dependencies: string[]
}

export const BASES: BaseDefinition[] = [
  {
    name: "base",
    type: "registry:style",
    title: "Base UI",
    description:
      "Headless UI primitives from Base UI, wrapped in the ui-kit design language.",
    dependencies: ["@base-ui/react"],
  },
  {
    name: "radix",
    type: "registry:style",
    title: "Radix UI",
    description:
      "Headless UI primitives from Radix, wrapped in the ui-kit design language.",
    dependencies: ["radix-ui"],
  },
]

export type Base = (typeof BASES)[number]
export type BaseName = Base["name"]
