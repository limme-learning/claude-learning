import { Field, FieldLabel } from "@ui-kit/ui/base-components/field"
import {
  RadioGroup,
  RadioGroupItem,
} from "@ui-kit/ui/base-components/radio-group"

export default function Pattern() {
  return (
    <RadioGroup defaultValue="comfortable" className="w-fit">
      <Field orientation="horizontal">
        <RadioGroupItem value="default" id="disabled-r1" />
        <FieldLabel htmlFor="disabled-r1">Default</FieldLabel>
      </Field>
      <Field orientation="horizontal" data-disabled>
        <RadioGroupItem value="comfortable" disabled id="disabled-r2" />
        <FieldLabel htmlFor="disabled-r2">Comfortable</FieldLabel>
      </Field>
      <Field orientation="horizontal">
        <RadioGroupItem value="compact" id="disabled-r3" />
        <FieldLabel htmlFor="disabled-r3">Compact</FieldLabel>
      </Field>
    </RadioGroup>
  )
}
