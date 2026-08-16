"use client"

import { useState } from "react"

import { Calendar } from "@ui-kit/ui/base-components/calendar"
import { Card, CardContent } from "@ui-kit/ui/base-components/card"

export default function Pattern() {
  const [date, setDate] = useState<Date | undefined>(new Date())

  return (
    <Card className="p-0">
      <CardContent className="p-0">
        <Calendar
          mode="single"
          numberOfMonths={2}
          onSelect={setDate}
          selected={date}
        />
      </CardContent>
    </Card>
  )
}
