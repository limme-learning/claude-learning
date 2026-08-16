import { Button } from "@ui-kit/ui/components/button"
import { ButtonGroup } from "@ui-kit/ui/components/button-group"
import {
  FlipHorizontalIcon,
  FlipVerticalIcon,
  RotateCwIcon,
} from "lucide-react"

export default function Pattern() {
  return (
    <ButtonGroup>
      <Button variant="outline" size="icon">
        <FlipHorizontalIcon aria-hidden="true" />
      </Button>
      <Button variant="outline" size="icon">
        <FlipVerticalIcon aria-hidden="true" />
      </Button>
      <Button variant="outline" size="icon">
        <RotateCwIcon aria-hidden="true" />
      </Button>
    </ButtonGroup>
  )
}
