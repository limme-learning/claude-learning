"use client"

import { DialogContent, DialogTitle } from "@ui-kit/ui/components/dialog"

import { CodeBlock } from "./code-block"
import { InstallCommand } from "./install-command"

export function InspectDialog({
  title,
  name,
  source,
  html,
  defaultEngine,
}: Readonly<{
  title: string
  name: string
  source: string
  html: string
  defaultEngine: "base" | "radix"
}>) {
  return (
    <DialogContent className="flex max-h-[85vh] flex-col gap-4 overflow-hidden sm:max-w-2xl">
      <DialogTitle className="sr-only">{title}</DialogTitle>

      <div className="flex flex-col gap-2">
        <h3 className="text-sm font-medium">Installation</h3>
        <InstallCommand name={name} defaultEngine={defaultEngine} />
      </div>

      <div className="flex min-h-0 flex-1 flex-col gap-2">
        <h3 className="text-sm font-medium">Code</h3>
        <CodeBlock className="flex-1" code={source} html={html} copy />
      </div>
    </DialogContent>
  )
}
