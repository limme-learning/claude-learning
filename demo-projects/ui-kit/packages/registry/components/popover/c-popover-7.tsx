import { Button } from "@ui-kit/ui/components/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@ui-kit/ui/components/popover"
import { SparklesIcon } from "lucide-react"

export default function Pattern() {
  return (
    <div className="flex min-h-[100px] items-center justify-center">
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" className="gap-2">
            <SparklesIcon />
            AI Assistant
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="w-80 gap-0 overflow-hidden p-0"
          align="center"
        >
          <div className="border-b border-primary/10 bg-primary/5 p-2">
            <div className="flex items-center gap-2 font-semibold text-primary">
              <SparklesIcon className="size-4" />
              <span>Smart Suggestions</span>
            </div>
          </div>
          <div className="space-y-3 p-2">
            <p className="leading-relaxed text-muted-foreground">
              Our AI analyzes your workflow to provide tailored recommendations.
              It helps you automate repetitive tasks and optimizes your design
              process in real-time.
            </p>
            <div className="grid grid-cols-2 items-center gap-2">
              <Button size="sm">Enable AI</Button>
              <Button size="sm" variant="outline">
                Learn more
              </Button>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  )
}
