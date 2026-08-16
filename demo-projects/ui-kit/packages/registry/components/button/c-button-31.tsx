import { Button } from "@ui-kit/ui/components/button"
import { SendIcon } from "lucide-react"

export default function Pattern() {
  return (
    <Button size="lg">
      Send Message
      <SendIcon aria-hidden="true" />
    </Button>
  )
}
