import { Button } from "@ui-kit/ui/components/button"
import { Kbd } from "@ui-kit/ui/components/kbd"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@ui-kit/ui/components/tooltip"
import { IconPlaceholder } from "@ui-kit/ui/components/icon-placeholder"

export default function Pattern() {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline" size="icon" aria-label="Search">
            <IconPlaceholder
              lucide="SearchIcon"
              tabler="IconSearch"
              hugeicons="Search01Icon"
              phosphor="MagnifyingGlassIcon"
              remixicon="RiSearchLine"
            />
          </Button>
        </TooltipTrigger>
        <TooltipContent className="flex items-center gap-3">
          Search
          <Kbd className="-mr-1">⌘K</Kbd>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
