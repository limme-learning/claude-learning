import { IconTile } from "@ui-kit/ui/base-blocks/icon-tile"

import { IconPlaceholder } from "@ui-kit/ui/components/icon-placeholder"

// The `soft` variant derives every fill and border from currentColor, so one
// text color class retints the whole tile. An empty class keeps the primary
// default. Each tone uses its own base color as text (not the `-foreground`
// token, which is near-white and meant for text on a solid fill, not a
// light tint) so it stays readable in light mode; dark mode brightens it.
const tones = [
  "",
  "text-info dark:text-info",
  "text-success dark:text-success",
  "text-warning dark:text-warning",
  "text-destructive dark:text-destructive",
]

export default function Pattern() {
  return (
    <div className="flex items-center justify-center gap-4">
      {tones.map((tone) => (
        <IconTile
          key={tone || "primary"}
          variant="soft"
          className={tone}
          aria-hidden="true"
        >
          <IconPlaceholder
            lucide="StarIcon"
            tabler="IconStar"
            hugeicons="StarIcon"
            phosphor="StarIcon"
            remixicon="RiStarLine"
          />
        </IconTile>
      ))}
    </div>
  )
}
