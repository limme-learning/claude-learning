import { Badge } from "@ui-kit/ui/base-blocks/badge"

import { Button } from "@ui-kit/ui/base-components/button"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@ui-kit/ui/base-components/tooltip"
import { IconPlaceholder } from "@ui-kit/ui/components/icon-placeholder"

export default function Pattern() {
  return (
    <div className="flex items-center justify-center">
      <Tooltip>
        <TooltipTrigger
          render={<Button variant="outline" size="icon" aria-label="Warning" />}
        >
          <IconPlaceholder
            lucide="AlertTriangleIcon"
            tabler="IconAlertTriangle"
            hugeicons="Alert01Icon"
            phosphor="WarningIcon"
            remixicon="RiAlertLine"
          />
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
    </div>
  )
}
