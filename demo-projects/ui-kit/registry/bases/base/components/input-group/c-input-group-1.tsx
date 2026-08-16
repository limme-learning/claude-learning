import { Field } from "@ui-kit/ui/base-components/field"
import {
  InputGroup,
  InputGroupInput,
} from "@ui-kit/ui/base-components/input-group"

export default function Pattern() {
  return (
    <Field className="max-w-xs">
      <InputGroup>
        <InputGroupInput placeholder="Search..." />
      </InputGroup>
    </Field>
  )
}
