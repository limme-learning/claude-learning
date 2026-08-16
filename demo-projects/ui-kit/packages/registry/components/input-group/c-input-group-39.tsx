"use client"

import { useState } from "react"

import { Checkbox } from "@ui-kit/ui/components/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@ui-kit/ui/components/dropdown-menu"
import { Field } from "@ui-kit/ui/components/field"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@ui-kit/ui/components/input-group"
import { Label } from "@ui-kit/ui/components/label"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@ui-kit/ui/components/popover"
import {
  ListFilterIcon,
  MoreHorizontalIcon,
  SearchIcon,
  XIcon,
} from "lucide-react"

const statuses = ["Active", "Lead", "Prospect"] as const

const statusCounts: Record<(typeof statuses)[number], number> = {
  Active: 12,
  Lead: 7,
  Prospect: 5,
}

export default function Pattern() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedStatuses, setSelectedStatuses] = useState<
    (typeof statuses)[number][]
  >([])

  return (
    <Field className="max-w-sm">
      <InputGroup>
        <InputGroupAddon align="inline-start">
          <SearchIcon aria-hidden="true" />
        </InputGroupAddon>

        <InputGroupInput
          placeholder="Search contacts..."
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.target.value)}
        />

        <InputGroupAddon align="inline-end" className="gap-1">
          {searchQuery.length > 0 ? (
            <InputGroupButton
              aria-label="Clear search"
              size="icon-xs"
              variant="ghost"
              onClick={() => setSearchQuery("")}
            >
              <XIcon aria-hidden="true" />
            </InputGroupButton>
          ) : null}

          <Popover>
            <PopoverTrigger asChild>
              <InputGroupButton
                variant="ghost"
                size="xs"
                className="gap-1.5"
                aria-label="Filter contacts"
              >
                <ListFilterIcon className="size-3.5" aria-hidden="true" />
                {selectedStatuses.length > 0 ? (
                  <span className="tabular-nums">
                    {selectedStatuses.length}
                  </span>
                ) : (
                  "Status"
                )}
              </InputGroupButton>
            </PopoverTrigger>
            <PopoverContent align="end" className="w-44 p-3">
              <div className="flex flex-col gap-2">
                {statuses.map((status) => (
                  <div key={status} className="flex items-center gap-2.5">
                    <Checkbox
                      id={`contact-status-${status}`}
                      checked={selectedStatuses.includes(status)}
                      onCheckedChange={() =>
                        setSelectedStatuses((previous) =>
                          previous.includes(status)
                            ? previous.filter((item) => item !== status)
                            : [...previous, status]
                        )
                      }
                    />
                    <Label
                      htmlFor={`contact-status-${status}`}
                      className="flex grow items-center justify-between gap-1.5 font-normal"
                    >
                      {status}
                      <span className="text-xs text-muted-foreground">
                        {statusCounts[status]}
                      </span>
                    </Label>
                  </div>
                ))}
              </div>
            </PopoverContent>
          </Popover>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <InputGroupButton
                variant="ghost"
                size="icon-xs"
                aria-label="More actions"
              >
                <MoreHorizontalIcon aria-hidden="true" />
              </InputGroupButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-36">
              <DropdownMenuGroup>
                <DropdownMenuItem>Bulk email</DropdownMenuItem>
                <DropdownMenuItem>Export CSV</DropdownMenuItem>
                <DropdownMenuItem>Add contact</DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </InputGroupAddon>
      </InputGroup>
    </Field>
  )
}
