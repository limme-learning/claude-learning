"use client"

import { useState } from "react"

import { Toggle } from "@ui-kit/ui/components/toggle"
import { BookmarkIcon, HeartIcon, Repeat2Icon, Share2Icon } from "lucide-react"

export default function Pattern() {
  const [liked, setLiked] = useState(false)
  const [retweeted, setRetweeted] = useState(false)
  const [shared, setShared] = useState(false)
  const [bookmarked, setBookmarked] = useState(false)

  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      <Toggle
        variant="outline"
        aria-label="Like"
        pressed={liked}
        onPressedChange={setLiked}
      >
        <HeartIcon />
        {liked ? 13 : 12}
      </Toggle>
      <Toggle
        variant="outline"
        aria-label="Retweet"
        pressed={retweeted}
        onPressedChange={setRetweeted}
      >
        <Repeat2Icon />
        {retweeted ? 6 : 5}
      </Toggle>
      <Toggle
        variant="outline"
        aria-label="Share"
        pressed={shared}
        onPressedChange={setShared}
      >
        <Share2Icon />
        {shared ? 4 : 3}
      </Toggle>
      <Toggle
        variant="outline"
        aria-label="Bookmark"
        pressed={bookmarked}
        onPressedChange={setBookmarked}
      >
        <BookmarkIcon />
        {bookmarked ? 9 : 8}
      </Toggle>
    </div>
  )
}
