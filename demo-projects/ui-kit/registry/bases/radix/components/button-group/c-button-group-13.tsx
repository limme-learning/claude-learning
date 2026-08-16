import { Button } from "@ui-kit/ui/components/button"
import { ButtonGroup } from "@ui-kit/ui/components/button-group"
import { IconPlaceholder } from "@ui-kit/ui/components/icon-placeholder"

export default function Pattern() {
  return (
    <ButtonGroup orientation="vertical">
      <Button variant="outline" size="icon" aria-label="Add">
        <IconPlaceholder
          lucide="PlusIcon"
          tabler="IconPlus"
          hugeicons="PlusSignIcon"
          phosphor="PlusIcon"
          remixicon="RiAddLine"
          aria-hidden="true"
        />
      </Button>
      <Button variant="outline" size="icon" aria-label="Subtract">
        <IconPlaceholder
          lucide="MinusIcon"
          tabler="IconMinus"
          hugeicons="MinusSignIcon"
          phosphor="MinusIcon"
          remixicon="RiSubtractLine"
          aria-hidden="true"
        />
      </Button>
    </ButtonGroup>
  )
}
