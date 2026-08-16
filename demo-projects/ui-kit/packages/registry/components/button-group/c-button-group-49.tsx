"use client"

import { useState } from "react"

import { cn } from "@ui-kit/ui/lib/utils"
import { Button } from "@ui-kit/ui/components/button"
import { ButtonGroup } from "@ui-kit/ui/components/button-group"
import {
  BarChart2Icon,
  CircleHelpIcon,
  LayoutDashboardIcon,
  SettingsIcon,
} from "lucide-react"

const navItems = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: <LayoutDashboardIcon aria-hidden="true" />,
  },
  {
    id: "analytics",
    label: "Analytics",
    icon: <BarChart2Icon aria-hidden="true" />,
  },
  {
    id: "settings",
    label: "Settings",
    icon: <SettingsIcon aria-hidden="true" />,
  },
  {
    id: "help",
    label: "Help",
    icon: <CircleHelpIcon aria-hidden="true" />,
  },
]

export default function Pattern() {
  const [active, setActive] = useState("dashboard")

  return (
    <ButtonGroup orientation="vertical">
      {navItems.map((item) => (
        <Button
          key={item.id}
          variant="outline"
          className={cn("justify-start", active === item.id ? "bg-muted" : "")}
          onClick={() => setActive(item.id)}
        >
          {item.icon}
          {item.label}
        </Button>
      ))}
    </ButtonGroup>
  )
}
