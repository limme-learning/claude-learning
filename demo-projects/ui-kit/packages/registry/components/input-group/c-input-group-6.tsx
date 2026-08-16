import { Field } from "@ui-kit/ui/components/field"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@ui-kit/ui/components/input-group"
import { MicIcon, RadioIcon } from "lucide-react"

export default function Pattern() {
  return (
    <Field className="max-w-xs">
      <InputGroup>
        <InputGroupAddon>
          <MicIcon />
        </InputGroupAddon>
        <InputGroupInput placeholder="Listening..." />
        <InputGroupAddon align="inline-end">
          <RadioIcon className="animate-pulse text-destructive" />
        </InputGroupAddon>
      </InputGroup>
    </Field>
  )
}
