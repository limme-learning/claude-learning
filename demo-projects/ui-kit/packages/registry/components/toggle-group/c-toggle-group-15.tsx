import {
  ToggleGroup,
  ToggleGroupItem,
} from "@ui-kit/ui/components/toggle-group"
import { ArrowDownIcon, ArrowUpIcon } from "lucide-react"

export default function Pattern() {
  return (
    <div className="flex items-center justify-center">
      <ToggleGroup type="single" defaultValue="asc" variant="outline" size="sm">
        <ToggleGroupItem value="asc" aria-label="Sort ascending">
          <ArrowUpIcon />
          Ascending
        </ToggleGroupItem>
        <ToggleGroupItem value="desc" aria-label="Sort descending">
          <ArrowDownIcon />
          Descending
        </ToggleGroupItem>
      </ToggleGroup>
    </div>
  )
}
