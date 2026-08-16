"use client"

import { useState } from "react"

import { Button } from "@ui-kit/ui/components/button"
import { ChevronDownIcon, ChevronUpIcon } from "lucide-react"

export default function Pattern() {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <Button variant="ghost" onClick={() => setIsExpanded(!isExpanded)}>
      {isExpanded ? "Show less" : "Show more"}
      {isExpanded ? (
        <ChevronUpIcon aria-hidden="true" />
      ) : (
        <ChevronDownIcon aria-hidden="true" />
      )}
    </Button>
  )
}
