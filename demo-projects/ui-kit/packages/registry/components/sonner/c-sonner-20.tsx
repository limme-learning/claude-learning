import { toast } from "sonner"

import { Button } from "@ui-kit/ui/components/button"
import { Separator } from "@ui-kit/ui/components/separator"
import { LinkIcon, SettingsIcon } from "lucide-react"

export default function Pattern() {
  const showToast = () => {
    toast.custom(() => (
      <div className="flex w-[356px] flex-col gap-3 rounded-md border border-border bg-popover p-4 text-popover-foreground shadow-lg">
        <div className="flex items-center gap-3">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-sm">
            <LinkIcon className="size-5" aria-hidden="true" />
          </div>
          <div className="flex flex-1 flex-col gap-0.5">
            <p className="text-sm font-semibold">Integration Connected</p>
            <p className="text-xs text-muted-foreground">workspace.slack.com</p>
          </div>
          <span className="flex items-center gap-1 text-xs text-green-600">
            <span className="size-1.5 rounded-full bg-green-500" />
            Active
          </span>
        </div>
        <Separator />
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>Syncing 3 channels</span>
          <span>Last sync: just now</span>
        </div>
        <div className="flex gap-2">
          <Button
            size="xs"
            variant="outline"
            className="flex-1"
            onClick={() => toast.dismiss()}
          >
            <SettingsIcon className="size-3" aria-hidden="true" />
            Configure
          </Button>
          <Button size="xs" className="flex-1" onClick={() => toast.dismiss()}>
            Open Dashboard
          </Button>
        </div>
      </div>
    ))
  }

  return (
    <div className="flex items-center justify-center">
      <Button onClick={showToast} variant="outline" className="w-fit">
        Integration Toast
      </Button>
    </div>
  )
}
