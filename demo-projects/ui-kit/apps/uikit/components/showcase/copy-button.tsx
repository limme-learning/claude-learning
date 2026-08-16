"use client"

import * as React from "react"
import { CheckIcon, CopyIcon } from "lucide-react"

import { Button } from "@ui-kit/ui/components/button"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@ui-kit/ui/components/tooltip"
import { cn } from "@ui-kit/ui/lib/utils"

export function CopyButton({
  value,
  className,
}: Readonly<{
  value: string
  className?: string
}>) {
  const [copied, setCopied] = React.useState(false)

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          type="button"
          variant="ghost"
          size="icon-sm"
          className={cn("bg-background/80 backdrop-blur-sm", className)}
          aria-label={copied ? "Copied" : "Copy to clipboard"}
          onClick={async () => {
            await navigator.clipboard.writeText(value)
            setCopied(true)
            window.setTimeout(() => setCopied(false), 1500)
          }}
        >
          {copied ? (
            <CheckIcon className="size-3.5" />
          ) : (
            <CopyIcon className="size-3.5" />
          )}
        </Button>
      </TooltipTrigger>
      <TooltipContent>{copied ? "Copied!" : "Copy code"}</TooltipContent>
    </Tooltip>
  )
}
