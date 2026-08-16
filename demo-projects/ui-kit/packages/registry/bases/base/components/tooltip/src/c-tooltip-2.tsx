import { Button } from "@ui-kit/ui/base-components/button"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@ui-kit/ui/base-components/tooltip"

const sides = [
  "inline-start",
  "left",
  "top",
  "bottom",
  "right",
  "inline-end",
] as const

export default function Pattern() {
  return (
    <div className="grid max-w-xs grid-cols-3 gap-2">
      {sides.map((side) => (
        <Tooltip key={side}>
          <TooltipTrigger
            render={<Button variant="outline" className="w-full" />}
          >
            {side.replace("-", " ")[0].toUpperCase() +
              side.replace("-", " ").slice(1)}
          </TooltipTrigger>
          <TooltipContent side={side}>
            <p className="text-sm">Add to library</p>
          </TooltipContent>
        </Tooltip>
      ))}
    </div>
  )
}
