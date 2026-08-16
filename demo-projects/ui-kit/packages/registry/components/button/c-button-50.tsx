import { Button } from "@ui-kit/ui/components/button"
import { ChevronLeftIcon } from "lucide-react"

export default function Pattern() {
  return (
    <Button variant="link" className="group/back-button" asChild>
      <a href="#">
        <ChevronLeftIcon
          data-icon="inline-start"
          aria-hidden="true"
          className="transition-transform duration-200 group-hover/back-button:-translate-x-1"
        />
        Go back
      </a>
    </Button>
  )
}
