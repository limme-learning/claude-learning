import { Field } from "@ui-kit/ui/components/field"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from "@ui-kit/ui/components/input-group"
import { SearchIcon } from "lucide-react"

export default function Pattern() {
  return (
    <Field className="max-w-xs">
      <InputGroup>
        <InputGroupAddon>
          <SearchIcon className="size-4 text-muted-foreground" />
        </InputGroupAddon>
        <InputGroupInput placeholder="Search logs..." />
        <InputGroupAddon align="inline-end">
          <InputGroupText className="text-xs text-muted-foreground">
            12 results
          </InputGroupText>
        </InputGroupAddon>
      </InputGroup>
    </Field>
  )
}
