"use client"

import * as React from "react"
import { usePathname, useRouter } from "next/navigation"
import {
  MonitorIcon,
  MoonIcon,
  SlidersHorizontalIcon,
  SunIcon,
} from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@ui-kit/ui/components/button"
import { ScrollArea } from "@ui-kit/ui/components/scroll-area"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@ui-kit/ui/components/sheet"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@ui-kit/ui/components/tooltip"
import { cn } from "@ui-kit/ui/lib/utils"
import {
  AVAILABLE_BASES,
  DEFAULT_STYLE,
  STYLES,
} from "../../../../registry/config"

const ENGINE_LABELS: Record<string, string> = {
  base: "Base UI",
  radix: "Radix UI",
}

// Mirrors each style's own `.cn-sheet-header` horizontal padding (packages/ui/src/styles/style-*.css)
// so the list below the title lines up with it instead of a fixed px-4.
const STYLE_HEADER_PADDING_X: Record<string, string> = {
  vega: "px-4",
  nova: "px-4",
  maia: "px-6",
  lyra: "px-4",
  mira: "px-6",
  luma: "px-6",
  sera: "px-8",
  rhea: "px-6",
}

// Mirrors each style's own corner radius (the `radius.default` cva branch shared by
// button/badge/card etc.) so the swatch reads as that style's real shape, not a guess.
const STYLE_SHAPE: Record<string, string> = {
  vega: "rounded-sm",
  nova: "rounded-sm",
  maia: "rounded-4xl",
  lyra: "rounded-none",
  mira: "rounded-sm",
  luma: "rounded-4xl",
  sera: "rounded-none",
  rhea: "rounded-2xl",
}

const THEMES = [
  { id: "light", label: "Light", icon: SunIcon },
  { id: "dark", label: "Dark", icon: MoonIcon },
  { id: "system", label: "System", icon: MonitorIcon },
] as const

function swapBasePrefix(pathname: string, engine: string): string {
  const parts = pathname.split("/")
  if (parts[1] === "base" || parts[1] === "radix") {
    parts[1] = engine
  }
  return parts.join("/") || `/${engine}`
}

export function CustomizeSheet() {
  const router = useRouter()
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()

  const [styleName, setStyleName] = React.useState<string>(() => {
    if (typeof document === "undefined") return DEFAULT_STYLE
    const found = Array.from(document.documentElement.classList).find(
      (className) => className.startsWith("style-")
    )
    return found ? found.slice("style-".length) : DEFAULT_STYLE
  })

  function applyStyle(name: string) {
    setStyleName(name)
    const root = document.documentElement
    for (const className of Array.from(root.classList)) {
      if (className.startsWith("style-")) {
        root.classList.remove(className)
      }
    }
    root.classList.add(`style-${name}`)
  }

  return (
    <Sheet>
      <Tooltip>
        <TooltipTrigger asChild>
          <SheetTrigger asChild>
            <Button
              variant="default"
              size="lg"
              aria-label="Customize"
              className="fixed right-6 bottom-6 z-50 h-12 w-12 rounded-full p-0! shadow-lg shadow-foreground/20"
            >
              <SlidersHorizontalIcon className="size-5" />
            </Button>
          </SheetTrigger>
        </TooltipTrigger>
        <TooltipContent side="top">Customize</TooltipContent>
      </Tooltip>
      <SheetContent side="left" className="overflow-hidden">
        <SheetHeader>
          <SheetTitle>Customize</SheetTitle>
          <SheetDescription>
            Pick a style, engine, and theme for the showcase.
          </SheetDescription>
        </SheetHeader>

        <ScrollArea className="min-h-0 flex-1">
          <div
            className={cn(
              "flex flex-col gap-6 pb-6",
              STYLE_HEADER_PADDING_X[styleName] ?? "px-4"
            )}
          >
            <div className="flex flex-col gap-2">
              <h3 className="text-sm font-medium">Engine</h3>
              <div
                role="group"
                aria-label="UI engine"
                className="inline-flex w-max items-center rounded-lg border border-border/60 bg-muted/30 p-0.5"
              >
                {AVAILABLE_BASES.map((engine) => {
                  const active = pathname.startsWith(`/${engine}`)
                  return (
                    <button
                      key={engine}
                      type="button"
                      aria-pressed={active}
                      onClick={() =>
                        router.push(swapBasePrefix(pathname, engine))
                      }
                      className={cn(
                        "rounded-md px-3 py-1.5 text-sm font-medium transition-all outline-none focus-visible:ring-2 focus-visible:ring-ring active:scale-[0.98]",
                        active
                          ? "bg-background text-foreground shadow-sm"
                          : "text-muted-foreground hover:text-foreground"
                      )}
                    >
                      {ENGINE_LABELS[engine]}
                    </button>
                  )
                })}
              </div>
              <p className="text-xs text-muted-foreground">
                Switches the engine and keeps you on the same page.
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <h3 className="text-sm font-medium">Style</h3>
              <div
                role="radiogroup"
                aria-label="Style"
                className="flex flex-col gap-1.5"
              >
                {STYLES.map((style) => {
                  const active = styleName === style.name
                  return (
                    <button
                      key={style.name}
                      type="button"
                      role="radio"
                      aria-checked={active}
                      onClick={() => applyStyle(style.name)}
                      className={cn(
                        "group flex items-start gap-3 rounded-lg border px-3 py-2.5 text-left transition-all outline-none focus-visible:ring-2 focus-visible:ring-ring active:scale-[0.98]",
                        active
                          ? "border-foreground/25 bg-accent"
                          : "border-border/60 hover:border-foreground/20 hover:bg-muted/40"
                      )}
                    >
                      <span
                        aria-hidden="true"
                        className={cn(
                          "mt-0.5 flex size-5 shrink-0 items-center justify-center border-2",
                          STYLE_SHAPE[style.name] ?? "rounded-sm",
                          active
                            ? "border-foreground"
                            : "border-muted-foreground/40"
                        )}
                      />
                      <span className="flex flex-1 flex-col gap-0.5">
                        <span className="text-sm font-medium">
                          {style.title}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {style.description}
                        </span>
                      </span>
                      <span
                        className={cn(
                          "mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-full border",
                          active ? "border-foreground" : "border-border"
                        )}
                      >
                        {active && (
                          <span className="size-2 rounded-full bg-foreground" />
                        )}
                      </span>
                    </button>
                  )
                })}
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <h3 className="text-sm font-medium">Theme</h3>
              <div
                role="group"
                aria-label="Theme"
                className="inline-flex w-max items-center rounded-lg border border-border/60 bg-muted/30 p-0.5"
              >
                {THEMES.map(({ id, label, icon: Icon }) => {
                  const active = theme === id
                  return (
                    <button
                      key={id}
                      type="button"
                      aria-pressed={active}
                      onClick={() => setTheme(id)}
                      className={cn(
                        "inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium transition-all outline-none focus-visible:ring-2 focus-visible:ring-ring active:scale-[0.98]",
                        active
                          ? "bg-background text-foreground shadow-sm"
                          : "text-muted-foreground hover:text-foreground"
                      )}
                    >
                      <Icon className="size-3.5" />
                      {label}
                    </button>
                  )
                })}
              </div>
            </div>
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  )
}
