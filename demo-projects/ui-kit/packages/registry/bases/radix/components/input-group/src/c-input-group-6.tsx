import { Field } from "@ui-kit/ui/components/field"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@ui-kit/ui/components/input-group"
import { IconPlaceholder } from "@ui-kit/ui/components/icon-placeholder"

export default function Pattern() {
  return (
    <Field className="max-w-xs">
      <InputGroup>
        <InputGroupAddon>
          <IconPlaceholder
            lucide="MicIcon"
            tabler="IconMicrophone"
            hugeicons="Mic02Icon"
            phosphor="MicrophoneIcon"
            remixicon="RiMicLine"
          />
        </InputGroupAddon>
        <InputGroupInput placeholder="Listening..." />
        <InputGroupAddon align="inline-end">
          <IconPlaceholder
            lucide="RadioIcon"
            tabler="IconBroadcast"
            hugeicons="LiveStreaming02Icon"
            phosphor="BroadcastIcon"
            remixicon="RiRfidLine"
            className="text-destructive animate-pulse"
          />
        </InputGroupAddon>
      </InputGroup>
    </Field>
  )
}
