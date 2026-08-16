"use client"

import { useState } from "react"

import { Button } from "@ui-kit/ui/components/button"
import { ButtonGroup } from "@ui-kit/ui/components/button-group"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@ui-kit/ui/components/dropdown-menu"
import {
  CheckIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronsUpDownIcon,
} from "lucide-react"

const stages = ["Lead", "Qualified", "Proposal", "Negotiation", "Closed Won"]

const icons = {
  prev: <ChevronLeftIcon aria-hidden="true" />,
  next: <ChevronRightIcon aria-hidden="true" />,
  chevronsUpDown: (
    <ChevronsUpDownIcon
      aria-hidden="true"
      className="size-3.5 shrink-0 opacity-50"
    />
  ),
  check: (
    <CheckIcon aria-hidden="true" className="ml-auto size-3.5 text-primary" />
  ),
}

export default function Pattern() {
  const [stageIndex, setStageIndex] = useState(2)

  return (
    <ButtonGroup>
      <Button
        variant="outline"
        size="icon"
        aria-label="Previous stage"
        disabled={stageIndex === 0}
        onClick={() => setStageIndex((i) => i - 1)}
      >
        {icons.prev}
      </Button>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="min-w-36 justify-between">
            <span className="truncate">{stages[stageIndex]}</span>
            {icons.chevronsUpDown}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-44">
          <DropdownMenuGroup>
            <DropdownMenuLabel>Jump to stage</DropdownMenuLabel>
            {stages.map((stage, i) => (
              <DropdownMenuItem key={stage} onClick={() => setStageIndex(i)}>
                {stage}
                {i === stageIndex ? icons.check : null}
              </DropdownMenuItem>
            ))}
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      <Button
        variant="outline"
        size="icon"
        aria-label="Next stage"
        disabled={stageIndex === stages.length - 1}
        onClick={() => setStageIndex((i) => i + 1)}
      >
        {icons.next}
      </Button>
    </ButtonGroup>
  )
}
