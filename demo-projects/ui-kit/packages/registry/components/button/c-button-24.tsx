import { Button } from "@ui-kit/ui/components/button"
import { XIcon } from "lucide-react"

export default function Pattern() {
  return (
    <Button size="icon-xs" variant="outline" aria-label="Close">
      <XIcon aria-hidden="true" />
    </Button>
  )
}
