import {
  ToggleGroup,
  ToggleGroupItem,
} from "@ui-kit/ui/components/toggle-group"
import {
  AlignCenterIcon,
  AlignLeftIcon,
  AlignRightIcon,
  MenuIcon,
} from "lucide-react"

export default function Pattern() {
  return (
    <div className="flex items-center justify-center">
      <ToggleGroup type="single" defaultValue="left" spacing={1}>
        <ToggleGroupItem value="left" aria-label="Align left">
          <AlignLeftIcon />
        </ToggleGroupItem>
        <ToggleGroupItem value="center" aria-label="Align center">
          <AlignCenterIcon />
        </ToggleGroupItem>
        <ToggleGroupItem value="right" aria-label="Align right">
          <AlignRightIcon />
        </ToggleGroupItem>
        <ToggleGroupItem value="justify" aria-label="Justify">
          <MenuIcon />
        </ToggleGroupItem>
      </ToggleGroup>
    </div>
  )
}
