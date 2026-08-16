"use client"

import { useState } from "react"

import { cn } from "@ui-kit/ui/lib/utils"
import { Button } from "@ui-kit/ui/components/button"
import {
  ButtonGroup,
  ButtonGroupText,
} from "@ui-kit/ui/components/button-group"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@ui-kit/ui/components/tooltip"
import { Code2Icon, GlobeIcon, TestTube2Icon } from "lucide-react"

const environments = [
  {
    id: "development",
    label: "Dev",
    tooltip: "Local development environment",
    icon: <Code2Icon aria-hidden="true" />,
  },
  {
    id: "staging",
    label: "Staging",
    tooltip: "Pre-production mirror",
    icon: <TestTube2Icon aria-hidden="true" />,
  },
  {
    id: "production",
    label: "Production",
    tooltip: "Live environment — affects real users",
    icon: <GlobeIcon aria-hidden="true" />,
  },
]

export default function Pattern() {
  const [active, setActive] = useState("development")

  return (
    <ButtonGroup>
      <TooltipProvider>
        {environments.map((env) => (
          <Tooltip key={env.id}>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                className={cn(active === env.id ? "bg-muted" : "")}
                onClick={() => setActive(env.id)}
              >
                {env.icon}
                {env.label}
              </Button>
            </TooltipTrigger>
            <TooltipContent>{env.tooltip}</TooltipContent>
          </Tooltip>
        ))}
        {active === "production" ? (
          <ButtonGroupText className="bg-transparent">
            <div className="bg-success size-1.5 rounded-full" />
            <span>Live</span>
          </ButtonGroupText>
        ) : null}
      </TooltipProvider>
    </ButtonGroup>
  )
}
