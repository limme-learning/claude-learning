import {
  ToggleGroup,
  ToggleGroupItem,
} from "@ui-kit/ui/components/toggle-group"
import { MonitorIcon, MoonIcon, SunIcon } from "lucide-react"

export default function Pattern() {
  return (
    <div className="flex items-center justify-center">
      <ToggleGroup type="single" defaultValue="light" variant="outline">
        <ToggleGroupItem value="light" aria-label="Light theme">
          <SunIcon />
          Light
        </ToggleGroupItem>
        <ToggleGroupItem value="dark" aria-label="Dark theme">
          <MoonIcon />
          Dark
        </ToggleGroupItem>
        <ToggleGroupItem value="system" aria-label="System theme">
          <MonitorIcon />
          System
        </ToggleGroupItem>
      </ToggleGroup>
    </div>
  )
}
