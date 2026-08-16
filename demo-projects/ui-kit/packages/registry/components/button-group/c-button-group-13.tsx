import { Button } from "@ui-kit/ui/components/button"
import { ButtonGroup } from "@ui-kit/ui/components/button-group"
import { MinusIcon, PlusIcon } from "lucide-react"

export default function Pattern() {
  return (
    <ButtonGroup orientation="vertical">
      <Button variant="outline" size="icon" aria-label="Add">
        <PlusIcon aria-hidden="true" />
      </Button>
      <Button variant="outline" size="icon" aria-label="Subtract">
        <MinusIcon aria-hidden="true" />
      </Button>
    </ButtonGroup>
  )
}
