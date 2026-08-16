import { Button } from "@ui-kit/ui/components/button"
import { HelpCircleIcon } from "lucide-react"

export default function Pattern() {
  return (
    <Button variant="link">
      <HelpCircleIcon aria-hidden="true" />
      Help Center
    </Button>
  )
}
