import { Field } from "@ui-kit/ui/components/field"
import {
  InputGroup,
  InputGroupInput,
} from "@ui-kit/ui/components/input-group"

export default function Pattern() {
  return (
    <Field className="max-w-xs" data-disabled="true">
      <InputGroup>
        <InputGroupInput placeholder="Disabled field" disabled />
      </InputGroup>
    </Field>
  )
}
