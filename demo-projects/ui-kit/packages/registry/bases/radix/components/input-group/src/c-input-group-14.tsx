import { Field } from "@ui-kit/ui/components/field"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@ui-kit/ui/components/input-group"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@ui-kit/ui/components/tooltip"
import { IconPlaceholder } from "@ui-kit/ui/components/icon-placeholder"

export default function Pattern() {
  return (
    <Field className="w-full max-w-xs">
      <InputGroup>
        <InputGroupInput type="number" defaultValue="5000" />
        <InputGroupAddon align="inline-end">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <InputGroupButton variant="ghost" size="icon-xs">
                  <IconPlaceholder
                    lucide="InfoIcon"
                    tabler="IconInfoCircle"
                    hugeicons="InformationCircleIcon"
                    phosphor="InfoIcon"
                    remixicon="RiInformationLine"
                  />
                </InputGroupButton>
              </TooltipTrigger>
              <TooltipContent>Monthly request limit</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </InputGroupAddon>
      </InputGroup>
    </Field>
  )
}
