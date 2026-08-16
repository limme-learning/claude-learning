import { Checkbox } from "@ui-kit/ui/components/checkbox"
import { Field, FieldLabel } from "@ui-kit/ui/components/field"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@ui-kit/ui/components/tooltip"
import { IconPlaceholder } from "@ui-kit/ui/components/icon-placeholder"

export default function Pattern() {
  return (
    <Field orientation="horizontal" className="w-auto">
      <Checkbox id="tooltip-checkbox" />
      <div className="flex items-center gap-1.5">
        <FieldLabel htmlFor="tooltip-checkbox">
          Enable advanced analytics
        </FieldLabel>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger className="text-muted-foreground">
              <IconPlaceholder
                lucide="HelpCircleIcon"
                tabler="IconHelpCircle"
                hugeicons="HelpCircleIcon"
                phosphor="QuestionIcon"
                remixicon="RiQuestionLine"
                aria-hidden="true"
                className="size-3.5"
              />
            </TooltipTrigger>
            <TooltipContent side="right">
              Advanced analytics provides deeper insights into user behavior and
              system performance.
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </Field>
  )
}
