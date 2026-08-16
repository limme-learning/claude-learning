import { Button } from "@ui-kit/ui/components/button"
import { ButtonGroup } from "@ui-kit/ui/components/button-group"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@ui-kit/ui/components/dropdown-menu"
import { Input } from "@ui-kit/ui/components/input"
import { ChevronDownIcon, ListFilterIcon, XIcon } from "lucide-react"

export default function Pattern() {
  return (
    <ButtonGroup className="max-w-xs">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" aria-label="Filter">
            <ListFilterIcon aria-hidden="true" />
            Filter
            <ChevronDownIcon aria-hidden="true" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-40">
          <DropdownMenuItem>All Records</DropdownMenuItem>
          <DropdownMenuItem>Recent</DropdownMenuItem>
          <DropdownMenuItem>Archived</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <Input placeholder="Filter records..." />
      <Button variant="outline" size="icon">
        <XIcon aria-hidden="true" />
      </Button>
    </ButtonGroup>
  )
}
