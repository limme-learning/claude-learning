import { Button } from "@ui-kit/ui/base-components/button"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@ui-kit/ui/base-components/empty"
import { IconPlaceholder } from "@ui-kit/ui/components/icon-placeholder"

export default function Pattern() {
  return (
    <div className="flex items-center justify-center p-4">
      <Empty className="py-16">
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <IconPlaceholder
              lucide="BookmarkIcon"
              tabler="IconBookmark"
              hugeicons="Bookmark02Icon"
              phosphor="BookmarkSimpleIcon"
              remixicon="RiBookmarkLine"
            />
          </EmptyMedia>
          <EmptyTitle>No bookmarks</EmptyTitle>
          <EmptyDescription>
            Items you bookmark will be saved here for quick access.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <Button variant="outline" size="sm">
            Browse Items
          </Button>
        </EmptyContent>
      </Empty>
    </div>
  )
}
