"use client"

import { useState } from "react"

import { cn } from "@ui-kit/ui/lib/utils"
import { Button } from "@ui-kit/ui/components/button"
import { ButtonGroup } from "@ui-kit/ui/components/button-group"
import {
  CalendarDaysIcon,
  CalendarIcon,
  ClockIcon,
  SparklesIcon,
} from "lucide-react"

const intervals = [
  {
    id: "1m",
    icon: <ClockIcon aria-hidden="true" />,
  },
  {
    id: "5m",
    icon: <ClockIcon aria-hidden="true" />,
  },
  {
    id: "1H",
    icon: <ClockIcon aria-hidden="true" />,
  },
  {
    id: "1D",
    icon: <CalendarIcon aria-hidden="true" />,
  },
  {
    id: "1W",
    icon: <CalendarDaysIcon aria-hidden="true" />,
  },
  {
    id: "Auto",
    icon: <SparklesIcon aria-hidden="true" />,
  },
]

export default function Pattern() {
  const [active, setActive] = useState("1H")

  return (
    <ButtonGroup>
      {intervals.map((interval) => (
        <Button
          key={interval.id}
          variant="outline"
          size="sm"
          className={cn(
            "h-7 gap-1.5 px-2.5 text-xs tabular-nums",
            active === interval.id ? "bg-muted" : ""
          )}
          onClick={() => setActive(interval.id)}
        >
          {interval.icon}
          {interval.id}
        </Button>
      ))}
    </ButtonGroup>
  )
}
