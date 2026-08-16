import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@ui-kit/ui/base-blocks/alert"
import { Frame, FramePanel } from "@ui-kit/ui/base-blocks/frame"

import { IconPlaceholder } from "@ui-kit/ui/components/icon-placeholder"

export default function Pattern() {
  return (
    <div className="mx-auto mb-auto w-full max-w-lg">
      <Frame>
        <FramePanel className="overflow-hidden p-0!">
          <Alert className="border-0 shadow-none">
            <IconPlaceholder
              lucide="InfoIcon"
              tabler="IconInfoCircle"
              hugeicons="InformationCircleIcon"
              phosphor="InfoIcon"
              remixicon="RiInformationLine"
              className="text-destructive"
            />
            <AlertTitle>System Update</AlertTitle>
            <AlertDescription>
              A new system update is available. Please restart your application
              to apply the changes.
            </AlertDescription>
          </Alert>
        </FramePanel>
      </Frame>
    </div>
  )
}
