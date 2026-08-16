import { Field, FieldLabel } from "@ui-kit/ui/components/field"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@ui-kit/ui/components/input-group"
import { SearchIcon } from "lucide-react"

export default function Pattern() {
  return (
    <Field className="max-w-xs">
      <FieldLabel htmlFor="search-input">Search Components</FieldLabel>
      <InputGroup>
        <InputGroupAddon>
          <SearchIcon className="text-muted-foreground" />
        </InputGroupAddon>
        <InputGroupInput id="search-input" placeholder="Search..." />
      </InputGroup>
    </Field>
  )
}
