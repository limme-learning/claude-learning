import { Button } from "@ui-kit/ui/base-components/button"
import { ButtonGroup } from "@ui-kit/ui/base-components/button-group"
import { IconPlaceholder } from "@ui-kit/ui/components/icon-placeholder"

export default function Pattern() {
  return (
    <ButtonGroup>
      <Button variant="outline" size="sm">
        <IconPlaceholder
          lucide="ArrowLeftIcon"
          tabler="IconArrowLeft"
          hugeicons="ArrowLeft02Icon"
          phosphor="ArrowLeftIcon"
          remixicon="RiArrowLeftLine"
          aria-hidden="true"
        />
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
        <IconPlaceholder
          lucide="ArrowRightIcon"
          tabler="IconArrowRight"
          hugeicons="ArrowRight02Icon"
          phosphor="ArrowRightIcon"
          remixicon="RiArrowRightLine"
          aria-hidden="true"
        />
      </Button>
    </ButtonGroup>
  )
}
