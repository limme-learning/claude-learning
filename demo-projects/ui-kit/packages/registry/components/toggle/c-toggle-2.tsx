import { Toggle } from "@ui-kit/ui/components/toggle"
import { BoldIcon, ItalicIcon } from "lucide-react"

export default function Pattern() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      <Toggle variant="outline" aria-label="Toggle italic">
        <ItalicIcon />
        Italic
      </Toggle>
      <Toggle variant="outline" aria-label="Toggle bold">
        <BoldIcon />
        Bold
      </Toggle>
    </div>
  )
}
