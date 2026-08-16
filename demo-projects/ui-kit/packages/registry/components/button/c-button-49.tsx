import { Button } from "@ui-kit/ui/components/button"
import { ChevronLeftIcon } from "lucide-react"

export default function Pattern() {
  return (
    <Button variant="link" asChild>
      <a href="#">
        <ChevronLeftIcon data-icon="inline-start" aria-hidden="true" />
        Go back
      </a>
    </Button>
  )
}
