import { Button } from "@ui-kit/ui/components/button"
import { ButtonGroup } from "@ui-kit/ui/components/button-group"
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react"

export default function Pattern() {
  return (
    <ButtonGroup>
      <Button variant="outline" size="sm">
        <ArrowLeftIcon aria-hidden="true" />
        Previous
      </Button>
      <Button variant="outline" size="sm">
        1
      </Button>
      <Button variant="outline" size="sm">
        2
      </Button>
      <Button variant="outline" size="sm">
        3
      </Button>
      <Button variant="outline" size="sm">
        Next
        <ArrowRightIcon aria-hidden="true" />
      </Button>
    </ButtonGroup>
  )
}
