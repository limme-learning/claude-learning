"use client"

import { ReactElement } from "react"

import { Field } from "@ui-kit/ui/components/field"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@ui-kit/ui/components/select"
import {
  ActivityIcon,
  LayoutDashboardIcon,
  ScanIcon,
  SettingsIcon,
  ShieldIcon,
} from "lucide-react"

interface IconPlaceholderProps {
  lucide: string
  tabler: string
  hugeicons: string
  phosphor: string
  remixicon: string
  className?: string
}

interface Item {
  label: string
  value: string | null
  icon: ReactElement<IconPlaceholderProps>
}

const items: Item[] = [
  {
    label: "Select an option",
    value: null,
    icon: <ScanIcon className="size-4 text-muted-foreground" />,
  },
  {
    label: "Dashboard",
    value: "dashboard",
    icon: <LayoutDashboardIcon className="size-4 text-muted-foreground" />,
  },
  {
    label: "Activity",
    value: "activity",
    icon: <ActivityIcon className="size-4 text-muted-foreground" />,
  },
  {
    label: "Security",
    value: "security",
    icon: <ShieldIcon className="size-4 text-muted-foreground" />,
  },
  {
    label: "Settings",
    value: "settings",
    icon: <SettingsIcon className="size-4 text-muted-foreground" />,
  },
]

export default function Pattern() {
  return (
    <Field className="max-w-xs">
      <Select>
        <SelectTrigger className="w-[200px]">
          <SelectValue placeholder="Select an option" />
        </SelectTrigger>
        <SelectContent position="popper">
          <SelectGroup>
            {items.slice(1).map((item) => (
              <SelectItem key={item.value} value={item.value!}>
                {item.icon}
                {item.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </Field>
  )
}
