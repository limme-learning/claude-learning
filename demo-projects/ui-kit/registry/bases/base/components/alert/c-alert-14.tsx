import {
  Alert,
  AlertAction,
  AlertDescription,
  AlertTitle,
} from "@ui-kit/ui/base-blocks/alert"
import { Frame, FramePanel } from "@ui-kit/ui/base-blocks/frame"

import { Button } from "@ui-kit/ui/base-components/button"
import { IconPlaceholder } from "@ui-kit/ui/components/icon-placeholder"

export default function Pattern() {
  return (
    <div className="mx-auto mb-auto w-full max-w-lg">
      <Frame>
        <FramePanel className="overflow-hidden p-0!">
          <Alert className="border-0 shadow-none">
            <IconPlaceholder
              lucide="ShieldCheckIcon"
              tabler="IconShieldCheck"
              hugeicons="ShieldEnergyIcon"
              phosphor="ShieldCheckIcon"
              remixicon="RiShieldCheckLine"
              className="text-emerald-500"
            />
            <AlertTitle>Security Update</AlertTitle>
            <AlertAction>
              <Button variant="outline" size="xs">
                Dismiss
              </Button>
              <Button size="xs">Update</Button>
            </AlertAction>
            <AlertDescription>
              Update your password and enable 2FA to improve your account
              security.
            </AlertDescription>
          </Alert>
        </FramePanel>
      </Frame>
    </div>
  )
}
