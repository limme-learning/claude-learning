"use client"

import { useState } from "react"

import { cn } from "@ui-kit/ui/lib/utils"
import { Button } from "@ui-kit/ui/components/button"
import {
  ButtonGroup,
  ButtonGroupSeparator,
} from "@ui-kit/ui/components/button-group"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@ui-kit/ui/components/dropdown-menu"
import {
  ChevronDownIcon,
  DownloadIcon,
  FileJsonIcon,
  FileSpreadsheetIcon,
  FileTextIcon,
  LayoutGridIcon,
  ListFilterIcon,
  ListIcon,
} from "lucide-react"

const icons = {
  filter: <ListFilterIcon aria-hidden="true" />,
  download: <DownloadIcon aria-hidden="true" />,
  chevronDown: <ChevronDownIcon aria-hidden="true" />,
  grid: <LayoutGridIcon aria-hidden="true" />,
  list: <ListIcon aria-hidden="true" />,
  fileSpreadsheet: <FileSpreadsheetIcon aria-hidden="true" />,
  fileJson: <FileJsonIcon aria-hidden="true" />,
  filePdf: <FileTextIcon aria-hidden="true" />,
}

export default function Pattern() {
  const [view, setView] = useState<"grid" | "list">("grid")

  return (
    <ButtonGroup>
      <Button variant="outline">
        {icons.filter}
        Filter
      </Button>
      <ButtonGroupSeparator />
      <Button variant="outline">
        {icons.download}
        Export CSV
      </Button>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="shrink-0"
            aria-label="More export options"
          >
            {icons.chevronDown}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-40">
          <DropdownMenuGroup>
            <DropdownMenuItem>
              {icons.fileSpreadsheet}
              Export Excel
            </DropdownMenuItem>
            <DropdownMenuItem>
              {icons.fileJson}
              Export JSON
            </DropdownMenuItem>
            <DropdownMenuItem>
              {icons.filePdf}
              Export PDF
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
      <Button
        variant="outline"
        size="icon"
        aria-label="Grid view"
        className={cn(view === "grid" ? "bg-muted" : "")}
        onClick={() => setView("grid")}
      >
        {icons.grid}
      </Button>
      <Button
        variant="outline"
        size="icon"
        aria-label="List view"
        className={cn(view === "list" ? "bg-muted" : "")}
        onClick={() => setView("list")}
      >
        {icons.list}
      </Button>
    </ButtonGroup>
  )
}
