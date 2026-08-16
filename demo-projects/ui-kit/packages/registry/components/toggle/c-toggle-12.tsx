import { Toggle } from "@ui-kit/ui/components/toggle"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@ui-kit/ui/components/tooltip"
import { PinIcon } from "lucide-react"

export default function Pattern() {
  return (
    <div className="flex items-center justify-center">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Toggle variant="outline" aria-label="Pin to sidebar">
              <PinIcon />
            </Toggle>
          </TooltipTrigger>
          <TooltipContent>
            <p className="text-sm">Pin to sidebar</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  )
}
