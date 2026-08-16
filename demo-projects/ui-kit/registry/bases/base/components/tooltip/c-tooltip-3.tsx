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
          render={
            <Button variant="ghost" size="icon" aria-label="More information" />
          }
        >
          <IconPlaceholder
            lucide="InfoIcon"
            tabler="IconInfoCircle"
            hugeicons="InformationCircleIcon"
            phosphor="InfoIcon"
            remixicon="RiInformationLine"
          />
        </TooltipTrigger>
        <TooltipContent>
          <p className="text-center text-sm">
            Additional information and help context.
          </p>
        </TooltipContent>
      </Tooltip>
    </div>
  )
}
