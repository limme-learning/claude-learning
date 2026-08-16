import {
  ButtonGroup,
  ButtonGroupText,
} from "@ui-kit/ui/components/button-group"
import { Field } from "@ui-kit/ui/components/field"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@ui-kit/ui/components/input-group"
import { InfoIcon } from "lucide-react"

export default function Pattern() {
  return (
    <Field className="max-w-xs">
      <ButtonGroup>
        <ButtonGroupText>https://</ButtonGroupText>
        <InputGroup>
          <InputGroupInput placeholder="example" />
          <InputGroupAddon align="inline-end">
            <InfoIcon className="size-4 text-muted-foreground" />
          </InputGroupAddon>
        </InputGroup>
        <ButtonGroupText>.com</ButtonGroupText>
      </ButtonGroup>
    </Field>
  )
}
