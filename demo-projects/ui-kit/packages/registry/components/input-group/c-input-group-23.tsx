import { Field } from "@ui-kit/ui/components/field"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@ui-kit/ui/components/input-group"
import { Kbd, KbdGroup } from "@ui-kit/ui/components/kbd"
import { CommandIcon, SparklesIcon } from "lucide-react"

export default function Pattern() {
  return (
    <Field className="max-w-xs">
      <InputGroup>
        <InputGroupAddon>
          <SparklesIcon className="text-emerald-500" />
        </InputGroupAddon>
        <InputGroupInput placeholder="Ask AI to generate..." />
        <InputGroupAddon align="inline-end">
          <KbdGroup>
            <Kbd>
              <CommandIcon className="size-3" />
            </Kbd>
            <Kbd>Enter</Kbd>
          </KbdGroup>
        </InputGroupAddon>
      </InputGroup>
    </Field>
  )
}
