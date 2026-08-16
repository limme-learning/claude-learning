import { Button } from "@ui-kit/ui/base-components/button"
import {
  ButtonGroup,
  ButtonGroupText,
} from "@ui-kit/ui/base-components/button-group"
import { IconPlaceholder } from "@ui-kit/ui/components/icon-placeholder"

export default function Pattern() {
  return (
    <ButtonGroup>
      <Button size="sm" className="border-primary">
        <IconPlaceholder
          lucide="Share2Icon"
          tabler="IconShare"
          hugeicons="Share08Icon"
          phosphor="ShareNetworkIcon"
          remixicon="RiStackshareLine"
          className="..."
        />
        Share
      </Button>
      <ButtonGroupText className="text-muted-foreground bg-transparent px-2">
        128 Shares
      </ButtonGroupText>
    </ButtonGroup>
  )
}
