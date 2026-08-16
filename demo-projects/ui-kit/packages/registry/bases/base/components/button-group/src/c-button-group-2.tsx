import { Button } from "@ui-kit/ui/base-components/button"
import { ButtonGroup } from "@ui-kit/ui/base-components/button-group"
import { Input } from "@ui-kit/ui/base-components/input"

export default function Pattern() {
  return (
    <ButtonGroup>
      <Button variant="outline">Button</Button>
      <Input placeholder="Type something here..." />
    </ButtonGroup>
  )
}
