"use client"

import { useState } from "react"

import { Toggle } from "@ui-kit/ui/components/toggle"
import { BookmarkCheckIcon, BookmarkIcon } from "lucide-react"

export default function Pattern() {
  const [pressed, setPressed] = useState(false)

  return (
    <div className="flex items-center justify-center">
      <Toggle
        variant="outline"
        aria-label="Toggle bookmark"
        pressed={pressed}
        onPressedChange={setPressed}
      >
        {pressed ? (
          <BookmarkCheckIcon className="fill-current" />
        ) : (
          <BookmarkIcon />
        )}
        {pressed ? "Bookmarked" : "Bookmark"}
      </Toggle>
    </div>
  )
}
