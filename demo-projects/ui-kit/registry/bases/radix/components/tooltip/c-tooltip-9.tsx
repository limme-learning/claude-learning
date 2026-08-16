import { Badge } from "@ui-kit/ui/blocks/badge"

import { Button } from "@ui-kit/ui/components/button"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@ui-kit/ui/components/tooltip"
import { IconPlaceholder } from "@ui-kit/ui/components/icon-placeholder"

export default function Pattern() {
  return (
    <div className="flex items-center justify-center">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="outline" size="icon" aria-label="Warning">
              <IconPlaceholder
                lucide="AlertTriangleIcon"
                tabler="IconAlertTriangle"
                hugeicons="Alert01Icon"
                phosphor="WarningIcon"
                remixicon="RiAlertLine"
              />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <div className="flex items-center gap-2 text-sm">
              <IconPlaceholder
                lucide="AlertTriangleIcon"
                tabler="IconAlertTriangle"
                hugeicons="Alert02Icon"
                phosphor="WarningIcon"
                remixicon="RiAlertLine"
                className="size-4 shrink-0"
              />
              This action cannot be undone
            </div>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  )
}
