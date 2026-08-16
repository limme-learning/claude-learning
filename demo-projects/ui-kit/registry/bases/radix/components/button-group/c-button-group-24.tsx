import { Button } from "@ui-kit/ui/components/button"
import { ButtonGroup } from "@ui-kit/ui/components/button-group"
import { IconPlaceholder } from "@ui-kit/ui/components/icon-placeholder"

export default function Pattern() {
  return (
    <ButtonGroup>
      <Button variant="outline" size="icon" aria-label="Grid view">
        <IconPlaceholder
          lucide="LayoutGridIcon"
          tabler="IconLayoutGrid"
          hugeicons="GridViewIcon"
          phosphor="SquaresFourIcon"
          remixicon="RiGalleryView2"
          aria-hidden="true"
        />
      </Button>
      <Button variant="outline" size="icon" aria-label="List view">
        <IconPlaceholder
          lucide="ListIcon"
          tabler="IconList"
          hugeicons="Menu01Icon"
          phosphor="ListIcon"
          remixicon="RiListUnordered"
          aria-hidden="true"
        />
      </Button>
      <Button variant="outline" size="icon" aria-label="Table view">
        <IconPlaceholder
          lucide="TableIcon"
          tabler="IconTable"
          hugeicons="GridTableIcon"
          phosphor="GridNineIcon"
          remixicon="RiTable2"
          aria-hidden="true"
        />
      </Button>
    </ButtonGroup>
  )
}
