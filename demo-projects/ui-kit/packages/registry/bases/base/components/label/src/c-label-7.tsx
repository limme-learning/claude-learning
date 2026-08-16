import { Field } from "@ui-kit/ui/base-components/field"
import { Input } from "@ui-kit/ui/base-components/input"
import { Label } from "@ui-kit/ui/base-components/label"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@ui-kit/ui/base-components/tooltip"
import { IconPlaceholder } from "@ui-kit/ui/components/icon-placeholder"

export default function Pattern() {
  return (
    <Field className="w-full max-w-xs">
      <Label htmlFor="label-tooltip" className="gap-1">
        API Key
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger className="inline-flex items-center">
              <span className="text-muted-foreground inline-flex cursor-help">
                <IconPlaceholder
                  lucide="InfoIcon"
                  tabler="IconInfoCircle"
                  hugeicons="InformationCircleIcon"
                  phosphor="InfoIcon"
                  remixicon="RiInformationLine"
                  className="size-3.5"
                />
              </span>
            </TooltipTrigger>
            <TooltipContent>
              <p>Your API key can be found in the developer settings.</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </Label>
      <Input
        id="label-tooltip"
        placeholder="sk_live_..."
        className="font-mono"
      />
    </Field>
  )
}
