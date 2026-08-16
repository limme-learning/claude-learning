import { Field, FieldLabel } from "@ui-kit/ui/components/field"
import { Switch } from "@ui-kit/ui/components/switch"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@ui-kit/ui/components/tooltip"
import { HelpCircleIcon } from "lucide-react"

export default function Pattern() {
  return (
    <div className="flex items-center justify-center">
      <Field orientation="horizontal">
        <Switch id="sw-tooltip" />
        <div className="flex items-center gap-1.5">
          <FieldLabel htmlFor="sw-tooltip">
            Two-factor authentication
          </FieldLabel>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger className="text-muted-foreground">
                <HelpCircleIcon aria-hidden="true" className="size-3.5" />
              </TooltipTrigger>
              <TooltipContent side="right">
                Adds an extra layer of security by requiring a verification code
                on login.
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </Field>
    </div>
  )
}
