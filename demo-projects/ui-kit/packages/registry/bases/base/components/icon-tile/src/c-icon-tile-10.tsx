import { IconTile } from "@ui-kit/ui/base-blocks/icon-tile"

import {
  Item,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@ui-kit/ui/base-components/item"
import { IconPlaceholder } from "@ui-kit/ui/components/icon-placeholder"

export default function Pattern() {
  return (
    <div className="flex w-full max-w-sm items-center justify-center">
      <Item variant="outline">
        <ItemMedia>
          <IconTile variant="elevated" size="sm" aria-hidden="true">
            <IconPlaceholder
              lucide="FileTextIcon"
              tabler="IconFileText"
              hugeicons="File01Icon"
              phosphor="FileTextIcon"
              remixicon="RiFileTextLine"
            />
          </IconTile>
        </ItemMedia>
        <ItemContent>
          <ItemTitle>Quarterly report</ItemTitle>
          <ItemDescription>Updated 2 hours ago by Anna</ItemDescription>
        </ItemContent>
      </Item>
    </div>
  )
}
