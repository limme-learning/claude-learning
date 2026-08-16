"use client"

import { useState } from "react"
import type { WeekNumberProps } from "react-day-picker"

import { Calendar } from "@ui-kit/ui/components/calendar"
import { Card, CardContent } from "@ui-kit/ui/components/card"

export default function Pattern() {
  const [date, setDate] = useState<Date | undefined>(new Date())

  return (
    <Card className="p-0">
      <CardContent className="p-0">
        <Calendar
          components={{
            WeekNumber: ({ week, ...props }: WeekNumberProps) => {
              return (
                <th {...props}>
                  <span className="inline-flex size-8 items-center justify-center text-sm font-normal text-muted-foreground">
                    {week.weekNumber}
                  </span>
                </th>
              )
            },
          }}
          fixedWeeks
          mode="single"
          onSelect={setDate}
          selected={date}
          showWeekNumber
        />
      </CardContent>
    </Card>
  )
}
