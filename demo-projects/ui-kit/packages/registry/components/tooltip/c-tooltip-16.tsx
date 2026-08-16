import { Button } from "@ui-kit/ui/components/button"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@ui-kit/ui/components/tooltip"
import { BellIcon } from "lucide-react"

export default function Pattern() {
  return (
    <div className="flex items-center justify-center">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="icon" aria-label="Notifications">
              <div className="relative">
                <BellIcon />
                <span className="absolute -top-1 -right-1 block size-2 rounded-full bg-destructive" />
              </div>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <div className="flex flex-col gap-1.5">
              <p className="text-sm font-medium">3 new notifications</p>
              <a
                href="#"
                className="text-xs font-medium underline underline-offset-2"
              >
                View all &rarr;
              </a>
            </div>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  )
}
