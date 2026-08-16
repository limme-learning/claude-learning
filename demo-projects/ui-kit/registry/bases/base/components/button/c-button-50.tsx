import { Button } from "@ui-kit/ui/base-components/button"
import { IconPlaceholder } from "@ui-kit/ui/components/icon-placeholder"

export default function Pattern() {
  return (
    <Button
      variant="link"
      className="group/back-button"
      render={<a href="#" />}
      nativeButton={false}
    >
      <IconPlaceholder
        lucide="ChevronLeftIcon"
        tabler="IconChevronLeft"
        hugeicons="ArrowLeft01Icon"
        phosphor="CaretLeftIcon"
        remixicon="RiArrowLeftSLine"
        data-icon="inline-start"
        aria-hidden="true"
        className="transition-transform duration-200 group-hover/back-button:-translate-x-1"
      />
      Go back
    </Button>
  )
}
