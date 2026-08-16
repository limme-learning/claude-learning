"use client"

import { ScrollArea as ScrollAreaPrimitive } from "@base-ui/react/scroll-area"

import { cn } from "@ui-kit/ui/lib/utils"

import { CopyButton } from "./copy-button"

export function CodeBlock({
  code,
  html,
  className,
  copy,
  copyClassName,
}: Readonly<{
  code?: string
  html?: string
  className?: string
  copy?: boolean
  copyClassName?: string
}>) {
  return (
    <div className={cn("relative flex min-h-0 flex-col", className)}>
      {copy && (
        <CopyButton
          value={code ?? ""}
          className={cn("absolute top-2 right-2 z-10", copyClassName)}
        />
      )}
      <ScrollAreaPrimitive.Root className="cn-scroll-area relative flex min-h-0 flex-1 flex-col overflow-hidden rounded-lg border border-border/60 bg-muted/50">
        <ScrollAreaPrimitive.Viewport className="cn-scroll-area-viewport min-h-0 flex-1 rounded-[inherit] outline-none">
          {html ? (
            <div
              className="min-h-full w-max min-w-full"
              dangerouslySetInnerHTML={{ __html: html }}
            />
          ) : (
            <pre className="min-h-full w-max min-w-full p-4 pr-12 font-mono text-xs leading-relaxed whitespace-pre">
              {code}
            </pre>
          )}
        </ScrollAreaPrimitive.Viewport>
        <ScrollAreaPrimitive.Scrollbar
          data-orientation="vertical"
          orientation="vertical"
          className="cn-scroll-area-scrollbar flex touch-none p-px transition-colors select-none"
        >
          <ScrollAreaPrimitive.Thumb className="cn-scroll-area-thumb relative flex-1 bg-border" />
        </ScrollAreaPrimitive.Scrollbar>
        <ScrollAreaPrimitive.Scrollbar
          data-orientation="horizontal"
          orientation="horizontal"
          className="cn-scroll-area-scrollbar flex touch-none p-px transition-colors select-none"
        >
          <ScrollAreaPrimitive.Thumb className="cn-scroll-area-thumb relative flex-1 bg-border" />
        </ScrollAreaPrimitive.Scrollbar>
        <ScrollAreaPrimitive.Corner />
      </ScrollAreaPrimitive.Root>
    </div>
  )
}
