import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@ui-kit/ui/components/alert-dialog"
import { Button } from "@ui-kit/ui/components/button"
import { Checkbox } from "@ui-kit/ui/components/checkbox"
import { Label } from "@ui-kit/ui/components/label"
import { CheckIcon } from "lucide-react"

export default function Pattern() {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline">Task Status</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <div className="flex items-center gap-3 py-1">
          <div className="flex size-10 items-center justify-center rounded-full bg-emerald-50 text-emerald-500 dark:bg-emerald-950 dark:text-emerald-300">
            <CheckIcon className="size-5" />
          </div>
          <div className="flex flex-col justify-center gap-1">
            <AlertDialogTitle className="text-sm font-semibold">
              Task successful
            </AlertDialogTitle>
            <AlertDialogDescription className="text-sm text-muted-foreground">
              Your task has been completed successfully.
            </AlertDialogDescription>
          </div>
        </div>
        <AlertDialogFooter className="items-center gap-4 sm:justify-between">
          <div className="flex items-center gap-2">
            <Checkbox id="show-again" />
            <Label
              htmlFor="show-again"
              className="font-normal text-muted-foreground"
            >
              Don&apos;t show again
            </Label>
          </div>
          <div className="flex items-center gap-2">
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction>Confirm</AlertDialogAction>
          </div>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
