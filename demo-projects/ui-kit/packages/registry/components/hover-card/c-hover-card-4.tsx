import { Button } from "@ui-kit/ui/components/button"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@ui-kit/ui/components/hover-card"
import { ZapIcon } from "lucide-react"

export default function Pattern() {
  return (
    <div className="flex min-h-[100px] items-center justify-center">
      <HoverCard openDelay={100} closeDelay={100}>
        <HoverCardTrigger asChild>
          <Button variant="outline">Instant Deployment</Button>
        </HoverCardTrigger>
        <HoverCardContent className="w-80 p-3">
          <div className="flex gap-2">
            <ZapIcon
              aria-hidden="true"
              className="mt-0.5 size-4 shrink-0 text-amber-500"
            />
            <div className="space-y-1">
              <p className="font-medium">Zero Latency Edge</p>
              <p className="leading-relaxed text-muted-foreground">
                Deploy your applications across our global edge network in
                seconds.
              </p>
            </div>
          </div>
        </HoverCardContent>
      </HoverCard>
    </div>
  )
}
