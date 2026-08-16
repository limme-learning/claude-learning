import { Button } from "@ui-kit/ui/components/button"
import {
  ButtonGroup,
  ButtonGroupText,
} from "@ui-kit/ui/components/button-group"
import { StarIcon } from "lucide-react"

export default function Pattern() {
  return (
    <ButtonGroup>
      <Button
        size="sm"
        variant="default"
        aria-label="Following 2.4k"
        className="border-primary"
      >
        <StarIcon />
        Star
      </Button>
      <ButtonGroupText className="border-primary">2.4k</ButtonGroupText>
    </ButtonGroup>
  )
}
