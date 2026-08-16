import {
  ToggleGroup,
  ToggleGroupItem,
} from "@ui-kit/ui/components/toggle-group"

export default function Pattern() {
  return (
    <div className="flex items-center justify-center">
      <ToggleGroup
        type="single"
        defaultValue="monthly"
        variant="outline"
        size="lg"
      >
        <ToggleGroupItem value="monthly">Monthly</ToggleGroupItem>
        <ToggleGroupItem value="yearly" className="gap-2">
          Yearly
          <span className="rounded-full bg-primary px-2 py-0.5 text-xs font-medium text-primary-foreground">
            Save 20%
          </span>
        </ToggleGroupItem>
      </ToggleGroup>
    </div>
  )
}
