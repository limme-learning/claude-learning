"use client"

import { ReactElement, useState } from "react"

import { Card, CardContent } from "@ui-kit/ui/components/card"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@ui-kit/ui/components/collapsible"
import { Item, ItemMedia, ItemTitle } from "@ui-kit/ui/components/item"
import {
  BellIcon,
  ChartBarIcon,
  ChevronRightIcon,
  CreditCardIcon,
  FileTextIcon,
  LayoutDashboardIcon,
  MessageSquareIcon,
  SettingsIcon,
  ShieldIcon,
  UserIcon,
} from "lucide-react"

type NavItem = {
  id: string
  name: string
  icon: ReactElement
  items?: NavItem[]
}

const navItems: NavItem[] = [
  {
    id: "dashboard",
    name: "Dashboard",
    icon: <LayoutDashboardIcon />,
    items: [
      {
        id: "analytics",
        name: "Analytics",
        icon: <ChartBarIcon />,
        items: [
          {
            id: "real-time",
            name: "Real-time",
            icon: <FileTextIcon aria-hidden="true" />,
          },
          {
            id: "historical",
            name: "Historical",
            icon: <FileTextIcon aria-hidden="true" />,
          },
        ],
      },
      {
        id: "reports",
        name: "Reports",
        icon: <MessageSquareIcon aria-hidden="true" />,
      },
    ],
  },
  {
    id: "team",
    name: "Team",
    icon: <UserIcon aria-hidden="true" />,
    items: [
      {
        id: "members",
        name: "Members",
        icon: <UserIcon aria-hidden="true" />,
      },
      {
        id: "permissions",
        name: "Permissions",
        icon: <ShieldIcon aria-hidden="true" />,
      },
    ],
  },
  {
    id: "billing",
    name: "Billing",
    icon: <CreditCardIcon aria-hidden="true" />,
  },
  {
    id: "settings",
    name: "Settings",
    icon: <SettingsIcon aria-hidden="true" />,
  },
  {
    id: "notifications",
    name: "Notifications",
    icon: <BellIcon aria-hidden="true" />,
  },
]

function NavMenuItem({
  item,
  level = 0,
  selectedId,
  onSelect,
}: {
  item: NavItem
  level?: number
  selectedId: string | null
  onSelect: (id: string) => void
}) {
  const isFolder = !!item.items && item.items.length > 0
  const isSelected = selectedId === item.id

  if (isFolder) {
    return (
      <Collapsible className="group/collapsible">
        <CollapsibleTrigger asChild>
          <Item
            size="xs"
            className="group/item cursor-pointer py-1.25 hover:bg-accent data-[state=open]:bg-accent"
            style={{ paddingLeft: `${level * 12 + 8}px` }}
          >
            <ItemMedia variant="icon">
              <div className="size-3.5 text-muted-foreground group-hover/item:text-foreground">
                {item.icon}
              </div>
            </ItemMedia>
            <ItemTitle className="data-[state=open]/collapsible:font-semibold text-sm">
              {item.name}
            </ItemTitle>
            <ChevronRightIcon
              aria-hidden="true"
              className="ml-auto size-4 text-muted-foreground transition-transform in-data-[state=open]:rotate-90"
            />
          </Item>
        </CollapsibleTrigger>
        <CollapsibleContent className="overflow-hidden pt-0.5 data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down">
          <div className="flex flex-col gap-0.5">
            {item.items?.map((child) => (
              <NavMenuItem
                key={child.id}
                item={child}
                level={level + 1}
                selectedId={selectedId}
                onSelect={onSelect}
              />
            ))}
          </div>
        </CollapsibleContent>
      </Collapsible>
    )
  }

  return (
    <Item
      size="xs"
      className="group/item cursor-pointer py-1.25 hover:bg-accent data-[active=true]:bg-accent data-[active=true]:text-foreground"
      data-active={isSelected}
      style={{ paddingLeft: `${level * 12 + 8}px` }}
      onClick={() => onSelect(item.id)}
    >
      <ItemMedia variant="icon">
        <div className="size-3.5 text-muted-foreground group-hover/item:text-foreground group-data-[active=true]/item:text-foreground">
          {item.icon}
        </div>
      </ItemMedia>
      <ItemTitle className="text-sm">{item.name}</ItemTitle>
    </Item>
  )
}

export default function Pattern() {
  const [selectedId, setSelectedId] = useState<string | null>("real-time")

  return (
    <div className="min-h-64 w-full max-w-56">
      <Card className="p-0">
        <CardContent className="p-1">
          <div className="gap-0/5 flex flex-col">
            {navItems.map((item) => (
              <NavMenuItem
                key={item.id}
                item={item}
                selectedId={selectedId}
                onSelect={setSelectedId}
              />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
