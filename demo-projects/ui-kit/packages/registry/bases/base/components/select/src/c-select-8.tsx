import {
  Field,
  FieldDescription,
  FieldLabel,
} from "@ui-kit/ui/base-components/field"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@ui-kit/ui/base-components/select"

const items = [
  { label: "Select a fruit", value: null },
  { label: "Apple", value: "apple" },
  { label: "Banana", value: "banana" },
  { label: "Blueberry", value: "blueberry" },
  { label: "Grapes", value: "grapes" },
  { label: "Pineapple", value: "pineapple" },
]

export default function Pattern() {
  return (
    <Field className="max-w-xs">
      <FieldLabel htmlFor="select-fruit">Favorite Fruit</FieldLabel>
      <Select items={items}>
        <SelectTrigger id="select-fruit">
          <SelectValue />
        </SelectTrigger>
        <SelectContent alignItemWithTrigger={false}>
          <SelectGroup>
            {items.map((item) => (
              <SelectItem key={item.value} value={item.value}>
                {item.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      <FieldDescription>
        Choose your favorite fruit from the list.
      </FieldDescription>
    </Field>
  )
}
