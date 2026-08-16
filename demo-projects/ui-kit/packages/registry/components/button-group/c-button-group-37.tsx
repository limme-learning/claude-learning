"use client"

import { useState } from "react"

import { Button } from "@ui-kit/ui/components/button"
import {
  ButtonGroup,
  ButtonGroupText,
} from "@ui-kit/ui/components/button-group"
import { MinusIcon, PlusIcon } from "lucide-react"

export default function Pattern() {
  const [zoom, setZoom] = useState(100)

  const handleZoomIn = () => {
    setZoom((prev) => Math.min(prev + 10, 200))
  }

  const handleZoomOut = () => {
    setZoom((prev) => Math.max(prev - 10, 10))
  }

  return (
    <ButtonGroup>
      <Button
        variant="outline"
        size="icon"
        aria-label="Zoom out"
        onClick={handleZoomOut}
      >
        <MinusIcon aria-hidden="true" />
      </Button>
      <ButtonGroupText className="w-16 justify-center">{zoom}%</ButtonGroupText>
      <Button
        variant="outline"
        size="icon"
        aria-label="Zoom in"
        onClick={handleZoomIn}
      >
        <PlusIcon aria-hidden="true" />
      </Button>
    </ButtonGroup>
  )
}
