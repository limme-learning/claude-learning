"use client"

import { useState } from "react"

import { ButtonGroup } from "@ui-kit/ui/components/button-group"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@ui-kit/ui/components/select"
import { GlobeIcon, LayersIcon, TerminalIcon } from "lucide-react"

const environments = [
  {
    value: "production",
    label: "Production",
    icon: <GlobeIcon aria-hidden="true" className="size-3.5 opacity-60" />,
  },
  {
    value: "staging",
    label: "Staging",
    icon: <LayersIcon aria-hidden="true" className="size-3.5 opacity-60" />,
  },
  {
    value: "development",
    label: "Development",
    icon: <TerminalIcon aria-hidden="true" className="size-3.5 opacity-60" />,
  },
]

const timeRanges = [
  { value: "1h", label: "Last hour", category: "recent" },
  { value: "6h", label: "Last 6 hours", category: "recent" },
  { value: "12h", label: "Last 12 hours", category: "recent" },
  { value: "24h", label: "Last 24 hours", category: "recent" },
  { value: "3d", label: "Last 3 days", category: "plus" },
  { value: "7d", label: "Last 7 days", category: "plus" },
  { value: "14d", label: "Last 14 days", category: "plus" },
  { value: "30d", label: "Last 30 days", category: "plus" },
]

export default function Pattern() {
  const [env, setEnv] = useState<string>("development")
  const [range, setRange] = useState<string>("12h")

  return (
    <ButtonGroup>
      <Select value={env} onValueChange={setEnv}>
        <SelectTrigger className="w-40">
          <SelectValue placeholder="Select environment" />
        </SelectTrigger>
        <SelectContent position="popper" align="start">
          <SelectGroup>
            {environments.map((item) => (
              <SelectItem key={item.value} value={item.value}>
                <div className="flex items-center gap-2">
                  {item.icon}
                  <span>{item.label}</span>
                </div>
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>

      <Select value={range} onValueChange={setRange}>
        <SelectTrigger className="w-40">
          <SelectValue placeholder="Select range" />
        </SelectTrigger>
        <SelectContent position="popper">
          <SelectGroup>
            {timeRanges
              .filter((r) => r.category === "recent")
              .map((item) => (
                <SelectItem key={item.value} value={item.value}>
                  {item.label}
                </SelectItem>
              ))}
          </SelectGroup>
          <SelectSeparator />
          <SelectGroup>
            <SelectLabel>Observability Plus</SelectLabel>
            {timeRanges
              .filter((r) => r.category === "plus")
              .map((item) => (
                <SelectItem key={item.value} value={item.value}>
                  {item.label}
                </SelectItem>
              ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </ButtonGroup>
  )
}
