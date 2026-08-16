import { Field } from "@ui-kit/ui/base-components/field"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@ui-kit/ui/base-components/input-group"
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@ui-kit/ui/base-components/popover"
import { IconPlaceholder } from "@ui-kit/ui/components/icon-placeholder"

export default function Pattern() {
  return (
    <Field className="max-w-xs">
      <InputGroup className="gap-0">
        <InputGroupAddon>
          <Popover>
            <PopoverTrigger
              render={
                <InputGroupButton
                  variant="ghost"
                  size="icon-xs"
                  className="cursor-help"
                />
              }
            >
              <IconPlaceholder
                lucide="ShieldCheckIcon"
                tabler="IconShieldCheck"
                hugeicons="ShieldEnergyIcon"
                phosphor="ShieldCheckIcon"
                remixicon="RiShieldCheckLine"
                className="text-emerald-500"
              />
            </PopoverTrigger>
            <PopoverContent align="start" className="w-72">
              <PopoverHeader>
                <PopoverTitle>Secure Connection</PopoverTitle>
                <PopoverDescription>
                  Your data is encrypted end-to-end using industry-standard
                  protocols.
                </PopoverDescription>
              </PopoverHeader>
            </PopoverContent>
          </Popover>
        </InputGroupAddon>
        <InputGroupInput
          defaultValue="https://reui.com"
          className="pl-0.5!"
          readOnly
        />
      </InputGroup>
    </Field>
  )
}
