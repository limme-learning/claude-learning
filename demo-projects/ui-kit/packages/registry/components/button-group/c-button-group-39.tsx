"use client"

import { Button } from "@ui-kit/ui/components/button"
import {
  ButtonGroup,
  ButtonGroupSeparator,
} from "@ui-kit/ui/components/button-group"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@ui-kit/ui/components/dropdown-menu"
import { ChevronDownIcon } from "lucide-react"

export default function Pattern() {
  return (
    <ButtonGroup className="**:data-[slot=button]:border-x-0">
      <Button variant="default">Save</Button>
      <ButtonGroupSeparator className="bg-primary-foreground/10" />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="default" size="icon" aria-label="More options">
            <ChevronDownIcon aria-hidden="true" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-40">
          <DropdownMenuItem>Save and publish</DropdownMenuItem>
          <DropdownMenuItem>Save as draft</DropdownMenuItem>
          <DropdownMenuItem>Save and exit</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </ButtonGroup>
  )
}
