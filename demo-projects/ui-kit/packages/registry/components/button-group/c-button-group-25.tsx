"use client"

import { useState } from "react"

import { cn } from "@ui-kit/ui/lib/utils"
import { Button } from "@ui-kit/ui/components/button"
import { ButtonGroup } from "@ui-kit/ui/components/button-group"

export default function Pattern() {
  const [rating, setRating] = useState<number | null>(null)

  return (
    <div className="space-y-3">
      <p className="text-sm font-medium">How likely are you to recommend us?</p>
      <ButtonGroup>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
          <Button
            key={n}
            variant="outline"
            size="icon-sm"
            onClick={() => setRating(n)}
            className={cn(
              rating === n &&
                "border-primary bg-primary text-primary-foreground hover:border-primary hover:bg-primary hover:text-primary-foreground"
            )}
          >
            {n}
          </Button>
        ))}
      </ButtonGroup>
      <div className="flex justify-between text-xs text-muted-foreground">
        <span>Not likely</span>
        <span>Very likely</span>
      </div>
    </div>
  )
}
