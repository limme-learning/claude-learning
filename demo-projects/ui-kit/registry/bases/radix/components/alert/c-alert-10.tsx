import {
  Alert,
  AlertAction,
  AlertTitle,
} from "@ui-kit/ui/blocks/alert"

import { Button } from "@ui-kit/ui/components/button"
import { IconPlaceholder } from "@ui-kit/ui/components/icon-placeholder"

export default function Pattern() {
  return (
    <Alert>
      <IconPlaceholder
        lucide="ShieldCheckIcon"
        tabler="IconShieldCheck"
        hugeicons="ShieldEnergyIcon"
        phosphor="ShieldCheckIcon"
        remixicon="RiShieldCheckLine"
      />
      <AlertTitle>Update your password and enable 2FA.</AlertTitle>
      <AlertAction>
        <Button variant="outline" size="xs">
          Dismiss
        </Button>
        <Button size="xs">Update</Button>
      </AlertAction>
    </Alert>
  )
}
