import { Button } from "@ui-kit/ui/components/button"
import { Toggle } from "@ui-kit/ui/components/toggle"
import { BoldIcon } from "lucide-react"

export default function Pattern() {
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <div className="flex items-center gap-2">
        <Button size="sm" variant="outline">
          Button
        </Button>
        <Toggle variant="outline" size="sm" aria-label="Small toggle">
          Toggle
        </Toggle>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="outline" size="icon">
          <BoldIcon />
        </Button>
        <Toggle variant="outline" aria-label="Toggle bold icon">
          <BoldIcon />
        </Toggle>
      </div>
    </div>
  )
}
