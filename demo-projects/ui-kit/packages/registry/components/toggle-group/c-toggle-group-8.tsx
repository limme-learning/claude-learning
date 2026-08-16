import {
  ToggleGroup,
  ToggleGroupItem,
} from "@ui-kit/ui/components/toggle-group"
import { Columns2Icon, LayoutGridIcon, ListIcon } from "lucide-react"

export default function Pattern() {
  return (
    <div className="flex items-center justify-center">
      <ToggleGroup type="single" defaultValue="list" variant="outline">
        <ToggleGroupItem value="list" aria-label="List view">
          <ListIcon />
        </ToggleGroupItem>
        <ToggleGroupItem value="grid" aria-label="Grid view">
          <LayoutGridIcon />
        </ToggleGroupItem>
        <ToggleGroupItem value="kanban" aria-label="Kanban view">
          <Columns2Icon />
        </ToggleGroupItem>
      </ToggleGroup>
    </div>
  )
}
