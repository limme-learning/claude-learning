import { Button } from "@ui-kit/ui/components/button"
import {
  ButtonGroup,
  ButtonGroupText,
} from "@ui-kit/ui/components/button-group"
import { IconPlaceholder } from "@ui-kit/ui/components/icon-placeholder"

export default function Pattern() {
  return (
    <ButtonGroup>
      <Button
        size="sm"
        variant="default"
        aria-label="Following 2.4k"
        className="border-primary"
      >
        <IconPlaceholder
          lucide="StarIcon"
          tabler="IconStar"
          hugeicons="StarIcon"
          phosphor="StarIcon"
          remixicon="RiStarLine"
        />
        Star
      </Button>
      <ButtonGroupText className="border-primary">2.4k</ButtonGroupText>
    </ButtonGroup>
  )
}
