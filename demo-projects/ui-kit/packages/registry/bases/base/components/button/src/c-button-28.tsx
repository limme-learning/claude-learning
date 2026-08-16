import { Button } from "@ui-kit/ui/base-components/button"
import { IconPlaceholder } from "@ui-kit/ui/components/icon-placeholder"

export default function Pattern() {
  return (
    <Button variant="link">
      <IconPlaceholder
        lucide="HelpCircleIcon"
        tabler="IconHelpCircle"
        hugeicons="HelpCircleIcon"
        phosphor="QuestionIcon"
        remixicon="RiQuestionLine"
        aria-hidden="true"
      />
      Help Center
    </Button>
  )
}
