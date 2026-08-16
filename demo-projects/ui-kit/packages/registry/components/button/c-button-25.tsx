import { Button } from "@ui-kit/ui/components/button"
import { BellIcon } from "lucide-react"

export default function Pattern() {
  return (
    <Button size="icon-sm" variant="ghost" aria-label="Notifications">
      <BellIcon aria-hidden="true" />
    </Button>
  )
}
