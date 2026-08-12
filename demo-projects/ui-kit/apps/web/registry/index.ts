import type { ComponentType } from "react"

type PreviewLoader = () => Promise<{ default: ComponentType }>

export const previewRegistry: Record<string, Record<string, PreviewLoader>> = {
  accordion: {
    "accordion-chevron": () => import("./accordion/accordion-chevron"),
    "accordion-plus-minus": () => import("./accordion/accordion-plus-minus"),
    "accordion-left-chevron": () => import("./accordion/accordion-left-chevron"),
    "accordion-left-plus-minus": () => import("./accordion/accordion-left-plus-minus"),
    "accordion-bordered": () => import("./accordion/accordion-bordered"),
    "accordion-filled": () => import("./accordion/accordion-filled"),
    "accordion-multiple": () => import("./accordion/accordion-multiple"),
    "accordion-disabled-item": () => import("./accordion/accordion-disabled-item"),
    "accordion-with-description": () => import("./accordion/accordion-with-description"),
    "accordion-nested": () => import("./accordion/accordion-nested"),
    "accordion-compact": () => import("./accordion/accordion-compact"),
  },
}

export function getPreviewLoader(category: string, name: string): PreviewLoader | undefined {
  return previewRegistry[category]?.[name]
}
