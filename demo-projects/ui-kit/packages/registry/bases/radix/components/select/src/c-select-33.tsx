import { Field } from "@ui-kit/ui/components/field"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@ui-kit/ui/components/select"

const sizes = [
  { label: "Select a size", value: null },
  { label: "Small", value: "sm" },
  { label: "Medium", value: "md" },
  { label: "Large", value: "lg" },
  { label: "Extra Large", value: "xl" },
]

export default function Pattern() {
  return (
    <Field className="max-w-xs">
      <Select>
        <SelectTrigger size="sm">
          <SelectValue placeholder="Select a size" />
        </SelectTrigger>
        <SelectContent position="popper">
          <SelectGroup>
            {sizes.map((size) => (
              <SelectItem key={size.value} value={size.value as string}>
                {size.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </Field>
  )
}
