import { Button } from "@ui-kit/ui/components/button"
import { ButtonGroup } from "@ui-kit/ui/components/button-group"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@ui-kit/ui/components/dropdown-menu"
import {
  FileTextIcon,
  MoreHorizontalIcon,
  PlusIcon,
  ShoppingCartIcon,
  UserPlusIcon,
} from "lucide-react"

const icons = {
  plus: <PlusIcon aria-hidden="true" />,
  more: <MoreHorizontalIcon aria-hidden="true" />,
  userPlus: <UserPlusIcon aria-hidden="true" />,
  cart: <ShoppingCartIcon aria-hidden="true" />,
  fileText: <FileTextIcon aria-hidden="true" />,
}

export default function Pattern() {
  return (
    <ButtonGroup>
      <Button variant="outline" size="sm" aria-label="More options">
        {icons.plus}
        New
      </Button>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button size="icon-sm" variant="outline" aria-label="More options">
            {icons.more}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-40">
          <DropdownMenuGroup>
            <DropdownMenuLabel>Create</DropdownMenuLabel>
            <DropdownMenuItem>
              {icons.userPlus}
              New Customer
            </DropdownMenuItem>
            <DropdownMenuItem>
              {icons.cart}
              New Order
            </DropdownMenuItem>
            <DropdownMenuItem>
              {icons.fileText}
              New Invoice
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </ButtonGroup>
  )
}
