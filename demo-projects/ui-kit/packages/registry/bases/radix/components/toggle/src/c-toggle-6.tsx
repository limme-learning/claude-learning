import { Toggle } from "@ui-kit/ui/components/toggle"
import { IconPlaceholder } from "@ui-kit/ui/components/icon-placeholder"

export default function Pattern() {
  return (
    <div className="flex items-center justify-center">
      <Toggle variant="outline" aria-label="Toggle bookmark">
        <IconPlaceholder
          lucide="BookmarkIcon"
          tabler="IconBookmark"
          hugeicons="Bookmark02Icon"
          phosphor="BookmarkSimpleIcon"
          remixicon="RiBookmarkLine"
          className="group-data-[state=on]/toggle:fill-accent-foreground"
        />
        Bookmark
      </Toggle>
    </div>
  )
}
