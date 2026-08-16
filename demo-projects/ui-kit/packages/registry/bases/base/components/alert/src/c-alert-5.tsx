import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@ui-kit/ui/base-blocks/alert"

import { IconPlaceholder } from "@ui-kit/ui/components/icon-placeholder"

export default function Pattern() {
  return (
    <Alert variant="info">
      <IconPlaceholder
        lucide="CircleAlertIcon"
        tabler="IconAlertCircle"
        hugeicons="AlertCircleIcon"
        phosphor="WarningCircleIcon"
        remixicon="RiErrorWarningLine"
      />
      <AlertTitle>Info! Something important</AlertTitle>
      <AlertDescription>
        This is an important message. Please read it carefully.
      </AlertDescription>
    </Alert>
  )
}
