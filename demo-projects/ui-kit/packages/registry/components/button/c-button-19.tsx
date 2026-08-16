import { Button } from "@ui-kit/ui/components/button"
import { Settings2Icon } from "lucide-react"

export default function Pattern() {
  return (
    <Button variant="outline">
      Options
      <Settings2Icon aria-hidden="true" />
    </Button>
  )
}
