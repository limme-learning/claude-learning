import { Button } from "@ui-kit/ui/components/button"
import { IconPlaceholder } from "@ui-kit/ui/components/icon-placeholder"

export default function Pattern() {
  return (
    <Button size="lg">
      Send Message
      <IconPlaceholder
        lucide="SendIcon"
        tabler="IconSend"
        hugeicons="SentIcon"
        phosphor="PaperPlaneTiltIcon"
        remixicon="RiSendInsLine"
        aria-hidden="true"
      />
    </Button>
  )
}
