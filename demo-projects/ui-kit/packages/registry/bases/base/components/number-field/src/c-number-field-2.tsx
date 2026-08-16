import {
  NumberField,
  NumberFieldDecrement,
  NumberFieldGroup,
  NumberFieldIncrement,
  NumberFieldInput,
  NumberFieldScrubArea,
} from "@ui-kit/ui/base-blocks/number-field"

export default function Pattern() {
  return (
    <div className="w-full max-w-48">
      <NumberField defaultValue={5} min={0} max={100} size="sm">
        <NumberFieldScrubArea label="Small" />
        <NumberFieldGroup>
          <NumberFieldDecrement />
          <NumberFieldInput />
          <NumberFieldIncrement />
        </NumberFieldGroup>
      </NumberField>
    </div>
  )
}
