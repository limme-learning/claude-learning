"use client"

import { useId, useState } from "react"
import { format } from "date-fns"
import { type DateRange } from "react-day-picker"

import { cn } from "@ui-kit/ui/lib/utils"
import { Button } from "@ui-kit/ui/components/button"
import { Calendar } from "@ui-kit/ui/components/calendar"
import { Card, CardContent } from "@ui-kit/ui/components/card"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@ui-kit/ui/components/popover"
import { CalendarIcon } from "lucide-react"

export default function Pattern() {
  const id = useId()
  const [date, setDate] = useState<DateRange | undefined>()

  return (
    <Popover>
      <PopoverTrigger>
        <Button
          className="group/pick-date w-60 justify-between"
          id={id}
          variant="outline"
        >
          <span className={cn("truncate", !date && "text-muted-foreground")}>
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y")} -{" "}
                  {format(date.to, "LLL dd, y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              "Pick a date range"
            )}
          </span>
          <CalendarIcon
            aria-hidden="true"
            className="shrink-0 text-muted-foreground/80 transition-colors group-hover:text-foreground"
          />
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start" className="w-auto p-0">
        <Card className="p-0">
          <CardContent className="p-0">
            <Calendar
              mode="range"
              selected={date}
              onSelect={setDate}
              numberOfMonths={2}
            />
          </CardContent>
        </Card>
      </PopoverContent>
    </Popover>
  )
}
