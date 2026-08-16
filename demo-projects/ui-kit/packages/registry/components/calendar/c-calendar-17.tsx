"use client"

import { useState } from "react"

import {
  Calendar,
  CalendarDayButton,
} from "@ui-kit/ui/components/calendar"
import { cn } from "@ui-kit/ui/lib/utils"

function getPriceForDate(date: Date) {
  const seed =
    date.getFullYear() * 10000 + (date.getMonth() + 1) * 100 + date.getDate()

  const val = (seed * 9301 + 49297) % 233280

  return Math.floor(50 + (val / 233280) * 200)
}

export default function Pattern() {
  const [date, setDate] = useState<Date | undefined>(new Date())

  return (
    <Calendar
      mode="single"
      selected={date}
      onSelect={setDate}
      showOutsideDays={false}
      className="rounded-lg border [--cell-size:3.25rem]"
      components={{
        DayButton: ({ children, modifiers, day, ...props }) => {
          const price = getPriceForDate(day.date)
          const isGreen = price < 100

          return (
            <CalendarDayButton
              day={day}
              modifiers={modifiers}
              {...props}
              className="flex size-full flex-col items-center justify-center gap-0.5 py-1 text-xs"
            >
              <span className="leading-none font-medium">{children}</span>
              {!modifiers.outside && (
                <span
                  className={cn(
                    "text-[10px] leading-none font-normal",
                    modifiers.selected
                      ? "font-medium text-primary-foreground/90"
                      : isGreen
                        ? "font-medium text-emerald-500"
                        : "text-muted-foreground"
                  )}
                >
                  ${price}
                </span>
              )}
            </CalendarDayButton>
          )
        },
      }}
    />
  )
}
