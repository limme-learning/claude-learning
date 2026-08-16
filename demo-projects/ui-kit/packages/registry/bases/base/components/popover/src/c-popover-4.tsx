import { Button } from "@ui-kit/ui/base-components/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@ui-kit/ui/base-components/popover"

export default function Pattern() {
  return (
    <div className="flex items-center justify-center gap-2">
      <Popover>
        <PopoverTrigger render={<Button variant="outline" size="sm" />}>
          Start
        </PopoverTrigger>
        <PopoverContent align="start" className="w-auto">
          <p>Aligned to start</p>
        </PopoverContent>
      </Popover>
      <Popover>
        <PopoverTrigger render={<Button variant="outline" size="sm" />}>
          Center
        </PopoverTrigger>
        <PopoverContent align="center" className="w-auto">
          <p>Aligned to center</p>
        </PopoverContent>
      </Popover>
      <Popover>
        <PopoverTrigger render={<Button variant="outline" size="sm" />}>
          End
        </PopoverTrigger>
        <PopoverContent align="end" className="w-auto">
          <p>Aligned to end</p>
        </PopoverContent>
      </Popover>
    </div>
  )
}
