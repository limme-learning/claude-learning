"use client"

import { useState } from "react"

import { Button } from "@ui-kit/ui/components/button"
import { ButtonGroup } from "@ui-kit/ui/components/button-group"
import { MinusIcon, TrendingDownIcon, TrendingUpIcon } from "lucide-react"

const stances = [
  {
    id: "buy",
    label: "Buy",
    icon: <TrendingUpIcon aria-hidden="true" />,
  },
  {
    id: "hold",
    label: "Hold",
    icon: <MinusIcon aria-hidden="true" />,
  },
  {
    id: "sell",
    label: "Sell",
    icon: <TrendingDownIcon aria-hidden="true" />,
  },
]

export default function Pattern() {
  const [active, setActive] = useState<string | null>(null)

  return (
    <ButtonGroup>
      {stances.map((stance) => (
        <Button
          key={stance.id}
          variant={active === stance.id ? "default" : "outline"}
          onClick={() => setActive(active === stance.id ? null : stance.id)}
        >
          {stance.icon}
          {stance.label}
        </Button>
      ))}
    </ButtonGroup>
  )
}
