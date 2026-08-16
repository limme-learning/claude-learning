import {
  Alert,
  AlertAction,
  AlertDescription,
  AlertTitle,
} from "@ui-kit/ui/blocks/alert"
import { Frame, FramePanel } from "@ui-kit/ui/blocks/frame"

import { Button } from "@ui-kit/ui/components/button"
import { IconPlaceholder } from "@ui-kit/ui/components/icon-placeholder"

export default function Pattern() {
  return (
    <div className="mx-auto mb-auto w-full max-w-lg">
      <Frame stacked>
        <FramePanel className="overflow-hidden p-0!">
          <Alert
            variant="success"
            className="border-0 bg-transparent shadow-none"
          >
            <IconPlaceholder
              lucide="DatabaseIcon"
              tabler="IconDatabase"
              hugeicons="Database02Icon"
              phosphor="DatabaseIcon"
              remixicon="RiDatabase2Line"
            />
            <AlertTitle>Database Connected</AlertTitle>
            <AlertDescription>
              All systems operational. Last sync: 2 minutes ago.
            </AlertDescription>
          </Alert>
        </FramePanel>
        <FramePanel className="overflow-hidden p-0!">
          <Alert
            variant="warning"
            className="border-0 bg-transparent shadow-none"
          >
            <IconPlaceholder
              lucide="GlobeIcon"
              tabler="IconWorld"
              hugeicons="Globe02Icon"
              phosphor="GlobeSimpleIcon"
              remixicon="RiGlobalLine"
            />
            <AlertTitle>API Latency Warning</AlertTitle>
            <AlertAction>
              <Button size="xs" variant="outline" className="h-7">
                <IconPlaceholder
                  lucide="RefreshCwIcon"
                  tabler="IconRefreshDot"
                  hugeicons="Refresh04Icon"
                  phosphor="ArrowsClockwiseIcon"
                  remixicon="RiRestartLine"
                  className="mr-1 size-3"
                />
                Retry
              </Button>
            </AlertAction>
            <AlertDescription>
              Increased latency detected in US-East regions. Our engineers are
              investigating.
            </AlertDescription>
          </Alert>
        </FramePanel>
      </Frame>
    </div>
  )
}
