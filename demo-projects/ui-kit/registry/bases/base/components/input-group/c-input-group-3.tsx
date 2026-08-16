import { Field } from "@ui-kit/ui/base-components/field"
import {
  InputGroup,
  InputGroupInput,
} from "@ui-kit/ui/base-components/input-group"

export default function Pattern() {
  return (
    <Field className="max-w-xs" data-invalid="true">
      <InputGroup>
        <InputGroupInput placeholder="Invalid field" aria-invalid="true" />
      </InputGroup>
    </Field>
  )
}
