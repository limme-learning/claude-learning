import { Toggle } from "@ui-kit/ui/components/toggle"
import { BookmarkIcon } from "lucide-react"

export default function Pattern() {
  return (
    <div className="flex items-center justify-center">
      <Toggle variant="outline" aria-label="Toggle bookmark">
        <BookmarkIcon className="group-data-[state=on]/toggle:fill-accent-foreground" />
        Bookmark
      </Toggle>
    </div>
  )
}
