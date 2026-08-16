import { Field } from "@ui-kit/ui/components/field"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from "@ui-kit/ui/components/input-group"
import { InfoIcon } from "lucide-react"

export default function Pattern() {
  return (
    <Field className="w-full max-w-xs">
      <InputGroup className="h-auto">
        <InputGroupInput placeholder="First name" />
        <InputGroupAddon align="block-start">
          <InputGroupText className="font-medium">User Profile</InputGroupText>
          <InfoIcon className="ml-auto" />
        </InputGroupAddon>
      </InputGroup>
    </Field>
  )
}
