import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@ui-kit/ui/base-components/alert-dialog"
import { Button } from "@ui-kit/ui/base-components/button"
import { IconPlaceholder } from "@ui-kit/ui/components/icon-placeholder"

export default function Pattern() {
  return (
    <AlertDialog>
      <AlertDialogTrigger
        render={<Button variant="outline">Default (Media)</Button>}
      />
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogMedia>
            <IconPlaceholder
              lucide="BluetoothIcon"
              tabler="IconBluetooth"
              hugeicons="BluetoothIcon"
              phosphor="BluetoothIcon"
              remixicon="RiBluetoothLine"
            />
          </AlertDialogMedia>
          <AlertDialogTitle>Pair with this device?</AlertDialogTitle>
          <AlertDialogDescription>
            This will allow the device to connect and share data with your
            current session.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction>Connect</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
