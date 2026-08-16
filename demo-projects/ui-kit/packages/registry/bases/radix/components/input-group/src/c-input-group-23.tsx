import { Field } from "@ui-kit/ui/components/field"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@ui-kit/ui/components/input-group"
import { Kbd, KbdGroup } from "@ui-kit/ui/components/kbd"
import { IconPlaceholder } from "@ui-kit/ui/components/icon-placeholder"

export default function Pattern() {
  return (
    <Field className="max-w-xs">
      <InputGroup>
        <InputGroupAddon>
          <IconPlaceholder
            lucide="SparklesIcon"
            tabler="IconSparkles"
            hugeicons="SparklesIcon"
            phosphor="SparkleIcon"
            remixicon="RiSparklingLine"
            className="text-emerald-500"
          />
        </InputGroupAddon>
        <InputGroupInput placeholder="Ask AI to generate..." />
        <InputGroupAddon align="inline-end">
          <KbdGroup>
            <Kbd>
              <IconPlaceholder
                lucide="CommandIcon"
                tabler="IconCommand"
                hugeicons="CommandIcon"
                phosphor="CommandIcon"
                remixicon="RiCommandLine"
                className="size-3"
              />
            </Kbd>
            <Kbd>Enter</Kbd>
          </KbdGroup>
        </InputGroupAddon>
      </InputGroup>
    </Field>
  )
}
