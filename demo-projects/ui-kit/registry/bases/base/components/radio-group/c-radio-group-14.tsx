import { Field, FieldLabel } from "@ui-kit/ui/base-components/field"
import {
  RadioGroup,
  RadioGroupItem,
} from "@ui-kit/ui/base-components/radio-group"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@ui-kit/ui/base-components/tooltip"
import { IconPlaceholder } from "@ui-kit/ui/components/icon-placeholder"

export default function Pattern() {
  return (
    <RadioGroup defaultValue="public" className="w-full max-w-xs">
      <Field orientation="horizontal">
        <RadioGroupItem value="public" id="vis-public" />
        <div className="flex items-center gap-1.5">
          <FieldLabel htmlFor="vis-public">Public</FieldLabel>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger className="text-muted-foreground">
                <span>
                  <IconPlaceholder
                    lucide="HelpCircleIcon"
                    tabler="IconHelpCircle"
                    hugeicons="HelpCircleIcon"
                    phosphor="QuestionIcon"
                    remixicon="RiQuestionLine"
                    aria-hidden="true"
                    className="size-3.5"
                  />
                </span>
              </TooltipTrigger>
              <TooltipContent side="right">
                Anyone on the internet can see this.
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </Field>
      <Field orientation="horizontal">
        <RadioGroupItem value="private" id="vis-private" />
        <div className="flex items-center gap-1.5">
          <FieldLabel htmlFor="vis-private">Private</FieldLabel>
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
              Only you and collaborators can access this.
            </TooltipContent>
          </Tooltip>
        </div>
      </Field>
    </RadioGroup>
  )
}
