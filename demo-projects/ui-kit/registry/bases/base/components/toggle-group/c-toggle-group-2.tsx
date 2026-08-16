import {
  ToggleGroup,
  ToggleGroupItem,
} from "@ui-kit/ui/base-components/toggle-group"

export default function Pattern() {
  return (
    <div className="flex items-center justify-center">
      <ToggleGroup variant="outline" defaultValue={["all"]}>
        <ToggleGroupItem value="all" aria-label="Toggle all">
          All
        </ToggleGroupItem>
        <ToggleGroupItem value="missed" aria-label="Toggle missed">
          Missed
        </ToggleGroupItem>
      </ToggleGroup>
    </div>
  )
}
