"use client"

import { useCopyToClipboard } from "@ui-kit/ui/hooks/use-copy-to-clipboard"
import { Button } from "@ui-kit/ui/components/button"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@ui-kit/ui/components/tooltip"
import { CheckIcon, CopyIcon } from "lucide-react"

export default function Pattern() {
  const { isCopied, copyToClipboard } = useCopyToClipboard({ timeout: 1500 })

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            size="icon"
            variant="outline"
            aria-label={isCopied ? "Copied" : "Copy"}
            onClick={() => copyToClipboard("https://reui.io")}
          >
            {isCopied ? (
              <CheckIcon aria-hidden="true" />
            ) : (
              <CopyIcon aria-hidden="true" />
            )}
          </Button>
        </TooltipTrigger>
        <TooltipContent>{isCopied ? "Copied" : "Copy link"}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
