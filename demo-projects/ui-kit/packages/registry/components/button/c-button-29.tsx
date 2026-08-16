import { Button } from "@ui-kit/ui/components/button"
import { ArrowUpRightIcon } from "lucide-react"

export default function Pattern() {
  return (
    <Button variant="link" className="group/link-button">
      View Documentation
      <ArrowUpRightIcon
        aria-hidden="true"
        className="transition-transform group-hover/link-button:rotate-45"
      />
    </Button>
  )
}
