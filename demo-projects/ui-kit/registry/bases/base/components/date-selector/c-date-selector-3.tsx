"use client"

import { useEffect, useState } from "react"
import {
  DateSelector,
  formatDateValue,
  type DateSelectorValue,
} from "@ui-kit/ui/base-blocks/date-selector"

import { Button } from "@ui-kit/ui/base-components/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@ui-kit/ui/base-components/dialog"
import { IconPlaceholder } from "@ui-kit/ui/components/icon-placeholder"

export default function Pattern() {
  const [value, setValue] = useState<DateSelectorValue | undefined>()
  const [open, setOpen] = useState(false)
  const [internalValue, setInternalValue] = useState<
    DateSelectorValue | undefined
  >(value)

  const formattedValue = value ? formatDateValue(value) : ""
  const displayText = formattedValue || "Select a date"

  useEffect(() => {
    if (open) {
      setInternalValue(value)
    }
  }, [open, value])

  const handleApply = () => {
    if (internalValue) {
      setValue(internalValue)
    }
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <Button variant="outline" className="w-56 justify-start">
            <IconPlaceholder
              lucide="CalendarIcon"
              tabler="IconCalendarEvent"
              hugeicons="Calendar04Icon"
              phosphor="CalendarBlankIcon"
              remixicon="RiCalendarLine"
            />
            {displayText}
          </Button>
        }
      />
      <DialogContent className="sm:max-w-lg" showCloseButton={false}>
        <DialogHeader>
          <DialogTitle>Select Due Date</DialogTitle>
        </DialogHeader>

        <DateSelector
          value={internalValue}
          onChange={setInternalValue}
          showInput={true}
        />

        <DialogFooter>
          <DialogClose render={<Button variant="outline">Cancel</Button>} />
          <Button onClick={handleApply}>Apply</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
