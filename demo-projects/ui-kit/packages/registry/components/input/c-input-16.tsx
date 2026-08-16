import {
  Field,
  FieldDescription,
  FieldLabel,
} from "@ui-kit/ui/components/field"
import { Input } from "@ui-kit/ui/components/input"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@ui-kit/ui/components/tooltip"
import { HelpCircleIcon } from "lucide-react"

export default function Pattern() {
  return (
    <Field className="max-w-xs">
      <div className="flex items-center gap-2">
        <FieldLabel htmlFor="username">Username</FieldLabel>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger className="inline-flex items-center">
              <HelpCircleIcon className="size-3.5 text-muted-foreground" />
            </TooltipTrigger>
            <TooltipContent>
              Your unique identifier on the platform.
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <Input id="username" placeholder="johndoe" />
      <FieldDescription>
        Your unique identifier on the platform.
      </FieldDescription>
    </Field>
  )
}
