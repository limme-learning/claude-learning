import { Toggle } from "@ui-kit/ui/components/toggle"
import {
  BoldIcon,
  ItalicIcon,
  StrikethroughIcon,
  UnderlineIcon,
} from "lucide-react"

export default function Pattern() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      <Toggle aria-label="Enabled default">
        <BoldIcon />
      </Toggle>
      <Toggle variant="outline" aria-label="Enabled outline">
        <ItalicIcon />
      </Toggle>
      <Toggle disabled aria-label="Disabled default">
        <UnderlineIcon />
      </Toggle>
      <Toggle variant="outline" disabled aria-label="Disabled outline">
        <StrikethroughIcon />
      </Toggle>
    </div>
  )
}
