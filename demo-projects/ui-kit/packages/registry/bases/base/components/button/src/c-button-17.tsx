import { Button } from "@ui-kit/ui/base-components/button"
import { IconPlaceholder } from "@ui-kit/ui/components/icon-placeholder"

export default function Pattern() {
  return (
    <Button variant="secondary">
      Open Project
      <IconPlaceholder
        lucide="ExternalLinkIcon"
        tabler="IconExternalLink"
        hugeicons="LinkSquare01Icon"
        phosphor="ArrowSquareOutIcon"
        remixicon="RiExternalLinkLine"
        aria-hidden="true"
      />
    </Button>
  )
}
