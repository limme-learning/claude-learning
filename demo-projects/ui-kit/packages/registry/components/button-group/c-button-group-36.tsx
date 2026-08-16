import { cn } from "@ui-kit/ui/lib/utils"
import { Button } from "@ui-kit/ui/components/button"
import { ButtonGroup } from "@ui-kit/ui/components/button-group"
import { LayoutGridIcon, ListIcon, TableIcon } from "lucide-react"

export default function Pattern() {
  return (
    <ButtonGroup>
      <Button
        variant="outline"
        size="icon"
        className={cn("bg-muted")}
        aria-label="List view"
      >
        <ListIcon aria-hidden="true" />
      </Button>
      <Button variant="outline" size="icon" aria-label="Grid view">
        <LayoutGridIcon aria-hidden="true" />
      </Button>
      <Button variant="outline" size="icon" aria-label="Table view">
        <TableIcon aria-hidden="true" />
      </Button>
    </ButtonGroup>
  )
}
