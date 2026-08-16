import { toast } from "sonner"

import { Button } from "@ui-kit/ui/components/button"
import { ExternalLinkIcon } from "lucide-react"

export default function Pattern() {
  const showStatusToast = () => {
    toast.custom(() => (
      <div className="flex w-[356px] flex-col gap-2 rounded-md border border-border bg-popover p-4 text-popover-foreground shadow-lg">
        <div className="flex items-center gap-2">
          <span className="flex size-2 rounded-full bg-green-500" />
          <p className="text-sm font-medium">Deployment Successful</p>
        </div>
        <div className="space-y-1 text-xs text-muted-foreground">
          <div className="flex items-center justify-between">
            <span>Environment</span>
            <span className="font-medium text-foreground">Production</span>
          </div>
          <div className="flex items-center justify-between">
            <span>Duration</span>
            <span className="font-medium text-foreground">42s</span>
          </div>
          <div className="flex items-center justify-between">
            <span>Commit</span>
            <span className="font-mono font-medium text-foreground">
              a1b2c3d
            </span>
          </div>
        </div>
        <div className="mt-1 flex gap-2">
          <Button
            size="xs"
            variant="outline"
            className="flex-1"
            onClick={() => toast.dismiss()}
          >
            <ExternalLinkIcon className="size-3" aria-hidden="true" />
            View Logs
          </Button>
          <Button size="xs" className="flex-1" onClick={() => toast.dismiss()}>
            Open Site
          </Button>
        </div>
      </div>
    ))
  }

  return (
    <div className="flex items-center justify-center">
      <Button onClick={showStatusToast} variant="outline" className="w-fit">
        Deployment Toast
      </Button>
    </div>
  )
}
