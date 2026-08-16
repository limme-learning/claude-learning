import { Field } from "@ui-kit/ui/components/field"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from "@ui-kit/ui/components/input-group"
import { IconPlaceholder } from "@ui-kit/ui/components/icon-placeholder"

export default function Pattern() {
  return (
    <Field className="w-full max-w-xs">
      <InputGroup className="h-auto">
        <InputGroupInput placeholder="First name" />
        <InputGroupAddon align="block-start">
          <InputGroupText className="font-medium">User Profile</InputGroupText>
          <IconPlaceholder
            lucide="InfoIcon"
            tabler="IconInfoCircle"
            hugeicons="InformationCircleIcon"
            phosphor="InfoIcon"
            remixicon="RiInformationLine"
            className="ml-auto"
          />
        </InputGroupAddon>
      </InputGroup>
    </Field>
  )
}
