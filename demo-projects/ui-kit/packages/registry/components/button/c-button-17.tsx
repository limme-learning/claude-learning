import { Button } from "@ui-kit/ui/components/button"
import { ExternalLinkIcon } from "lucide-react"

export default function Pattern() {
  return (
    <Button variant="secondary">
      Open Project
      <ExternalLinkIcon aria-hidden="true" />
    </Button>
  )
}
