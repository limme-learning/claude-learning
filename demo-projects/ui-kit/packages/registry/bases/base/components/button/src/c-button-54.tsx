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
    <Tooltip>
      <TooltipTrigger
        render={
          <Button variant="outline" size="icon" aria-label="Search">
            <IconPlaceholder
              lucide="SearchIcon"
              tabler="IconSearch"
              hugeicons="Search01Icon"
              phosphor="MagnifyingGlassIcon"
              remixicon="RiSearchLine"
            />
          </Button>
        }
      />
      <TooltipContent className="flex items-center gap-3">
        Search
        <Kbd className="-mr-1">⌘K</Kbd>
      </TooltipContent>
    </Tooltip>
  )
}
