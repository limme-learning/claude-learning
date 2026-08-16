import { Button } from "@ui-kit/ui/components/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@ui-kit/ui/components/popover"
import { ExternalLinkIcon } from "lucide-react"

export default function Pattern() {
  return (
    <div className="flex min-h-[100px] items-center justify-center">
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" size="sm">
            Preview Media
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="w-[320px] gap-0 overflow-hidden p-0"
          align="end"
        >
          <div className="aspect-video w-full overflow-hidden bg-muted">
            <img
              src="https://picsum.photos/1000/800?grayscale&random=10"
              alt="Website Template Preview"
              width={320}
              height={180}
              className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
            />
          </div>
          <div className="space-y-3 p-2">
            <div className="space-y-1 pt-1">
              <h4 className="text-sm leading-none font-semibold">
                Portfolio Pro
              </h4>
              <p className="text-xs text-muted-foreground">
                Premium photography template with dark mode.
              </p>
            </div>
            <div className="grid grid-cols-2 items-center gap-2">
              <Button size="sm" className="flex-1">
                Install Template
              </Button>
              <Button
                size="sm"
                variant="outline"
                aria-label="View demo in new tab"
              >
                Learn more
                <ExternalLinkIcon />
              </Button>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  )
}
