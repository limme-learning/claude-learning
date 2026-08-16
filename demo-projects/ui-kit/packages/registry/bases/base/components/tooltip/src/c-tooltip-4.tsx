import { Button } from "@ui-kit/ui/base-components/button"
import { Kbd } from "@ui-kit/ui/base-components/kbd"
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
          render={<Button variant="outline" size="icon-sm" aria-label="Save" />}
        >
          <IconPlaceholder
            lucide="SaveIcon"
            tabler="IconDeviceFloppy"
            hugeicons="FloppyDiskIcon"
            phosphor="FloppyDiskIcon"
            remixicon="RiSaveLine"
          />
        </TooltipTrigger>
        <TooltipContent className="pr-1.5">
          <div className="flex items-center gap-2 text-sm">
            Save Changes <Kbd>S</Kbd>
          </div>
        </TooltipContent>
      </Tooltip>
    </div>
  )
}
