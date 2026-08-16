import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@ui-kit/ui/blocks/alert"

import { IconPlaceholder } from "@ui-kit/ui/components/icon-placeholder"

export default function Pattern() {
  return (
    <Alert variant="warning">
      <IconPlaceholder
        lucide="AlertTriangleIcon"
        tabler="IconAlertTriangle"
        hugeicons="Alert02Icon"
        phosphor="WarningIcon"
        remixicon="RiAlertLine"
      />
      <AlertTitle>Warning! Something is wrong</AlertTitle>
      <AlertDescription>
        Please check your settings. If the problem persists, contact support.
      </AlertDescription>
    </Alert>
  )
}
