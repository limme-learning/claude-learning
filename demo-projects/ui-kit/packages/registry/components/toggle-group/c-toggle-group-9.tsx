import {
  ToggleGroup,
  ToggleGroupItem,
} from "@ui-kit/ui/components/toggle-group"
import { BluetoothIcon, MapPinIcon, PlaneIcon, WifiIcon } from "lucide-react"

export default function Pattern() {
  return (
    <div className="flex items-center justify-center">
      <ToggleGroup
        type="multiple"
        orientation="vertical"
        spacing={1}
        defaultValue={["wifi", "bluetooth"]}
      >
        <ToggleGroupItem value="wifi" aria-label="Wi-Fi" className="w-full">
          <WifiIcon />
          Wi-Fi
        </ToggleGroupItem>
        <ToggleGroupItem
          value="bluetooth"
          aria-label="Bluetooth"
          className="w-full"
        >
          <BluetoothIcon />
          Bluetooth
        </ToggleGroupItem>
        <ToggleGroupItem
          value="airplane"
          aria-label="Airplane Mode"
          className="w-full"
        >
          <PlaneIcon />
          Airplane Mode
        </ToggleGroupItem>
        <ToggleGroupItem
          value="location"
          aria-label="Location"
          className="w-full"
        >
          <MapPinIcon />
          Location
        </ToggleGroupItem>
      </ToggleGroup>
    </div>
  )
}
