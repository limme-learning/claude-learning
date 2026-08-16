import { Toggle } from "@ui-kit/ui/base-components/toggle"
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
          render={<Toggle variant="outline" aria-label="Pin to sidebar" />}
        >
          <IconPlaceholder
            lucide="PinIcon"
            tabler="IconPin"
            hugeicons="Pin02Icon"
            phosphor="PushPinIcon"
            remixicon="RiPushpinLine"
          />
        </TooltipTrigger>
        <TooltipContent>
          <p className="text-sm">Pin to sidebar</p>
        </TooltipContent>
      </Tooltip>
    </div>
  )
}
