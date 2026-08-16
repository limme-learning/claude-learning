import { Button } from "@ui-kit/ui/base-components/button"
import { ButtonGroup } from "@ui-kit/ui/base-components/button-group"
import { IconPlaceholder } from "@ui-kit/ui/components/icon-placeholder"

export default function Pattern() {
  return (
    <ButtonGroup>
      <Button variant="outline">
        <IconPlaceholder
          lucide="HeartIcon"
          tabler="IconHeart"
          hugeicons="FavouriteIcon"
          phosphor="HeartIcon"
          remixicon="RiHeartLine"
          aria-hidden="true"
        />
        Like
      </Button>
      <Button
        variant="outline"
        className="w-12"
        render={<span />}
        nativeButton={false}
      >
        1.2K
      </Button>
    </ButtonGroup>
  )
}
