import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@ui-kit/ui/components/breadcrumb"
import { Button } from "@ui-kit/ui/components/button"
import {
  ChevronRightIcon,
  HouseIcon,
  LayoutGridIcon,
  SettingsIcon,
} from "lucide-react"

export default function Pattern() {
  return (
    <Breadcrumb>
      <BreadcrumbList className="sm:gap-1">
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Button variant="ghost" size="sm">
              <HouseIcon />
              Home
            </Button>
          </BreadcrumbLink>
        </BreadcrumbItem>

        <BreadcrumbSeparator>
          <ChevronRightIcon />
        </BreadcrumbSeparator>

        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Button variant="ghost" size="sm">
              <LayoutGridIcon />
              Workspace
            </Button>
          </BreadcrumbLink>
        </BreadcrumbItem>

        <BreadcrumbSeparator>
          <ChevronRightIcon />
        </BreadcrumbSeparator>

        <BreadcrumbItem>
          <BreadcrumbPage>
            <Button variant="secondary" size="sm">
              <SettingsIcon />
              Settings
            </Button>
          </BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  )
}
