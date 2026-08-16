import { Button } from "@ui-kit/ui/components/button"
import { CircleAlertIcon } from "lucide-react"

export default function Pattern() {
  return (
    <Button variant="destructive">
      Confirm Removal
      <CircleAlertIcon aria-hidden="true" />
    </Button>
  )
}
