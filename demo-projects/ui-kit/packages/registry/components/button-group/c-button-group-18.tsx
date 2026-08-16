import { Button } from "@ui-kit/ui/components/button"
import {
  ButtonGroup,
  ButtonGroupSeparator,
} from "@ui-kit/ui/components/button-group"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@ui-kit/ui/components/dropdown-menu"
import { ChevronDownIcon, PlayIcon } from "lucide-react"

export default function Pattern() {
  return (
    <ButtonGroup className="**:data-[slot=button]:border-r-0">
      <Button>
        <PlayIcon aria-hidden="true" className="fill-current" />
        <span>Execute</span>
      </Button>
      <ButtonGroupSeparator className="bg-primary/72" />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            size="icon"
            className="rounded-l-none border-l border-primary-foreground/20"
          >
            <ChevronDownIcon aria-hidden="true" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-40">
          <DropdownMenuItem>Commit & Push</DropdownMenuItem>
          <DropdownMenuItem>Commit & Sync</DropdownMenuItem>
          <DropdownMenuItem>Amend Last Commit</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </ButtonGroup>
  )
}
