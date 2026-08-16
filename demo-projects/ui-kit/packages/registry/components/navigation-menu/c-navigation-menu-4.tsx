import { Button } from "@ui-kit/ui/components/button"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@ui-kit/ui/components/navigation-menu"
import {
  BuildingIcon,
  CircleDollarSignIcon,
  LayoutGridIcon,
  RadioIcon,
  SparklesIcon,
  UserIcon,
} from "lucide-react"

const industries = [
  {
    title: "Individuals",
    description: "Keep your finances organized.",
    href: "#",
    icon: <UserIcon />,
  },
  {
    title: "LLCs",
    description: "Benefit from tax write-offs.",
    href: "#",
    icon: <BuildingIcon />,
  },
  {
    title: "Freelancers",
    description: "For independent workers.",
    href: "#",
    icon: <CircleDollarSignIcon />,
  },
  {
    title: "Investors",
    description: "Make and grow your money.",
    href: "#",
    icon: <LayoutGridIcon />,
  },
  {
    title: "Small businesses",
    description: "We take care of your taxes.",
    href: "#",
    icon: <SparklesIcon />,
  },
  {
    title: "Crypto",
    description: "For tech enthusiasts.",
    href: "#",
    icon: <CircleDollarSignIcon />,
  },
  {
    title: "Big companies",
    description: "Run your finances easily.",
    href: "#",
    icon: <BuildingIcon />,
  },
  {
    title: "Investments",
    description: "Launch your ideas worldwide.",
    href: "#",
    icon: <RadioIcon />,
  },
]

export default function Pattern() {
  return (
    <div className="flex items-center justify-center">
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Industries</NavigationMenuTrigger>
            <NavigationMenuContent>
              <div className="w-[500px]">
                <ul className="grid grid-cols-2 gap-1">
                  {industries.map((item) => (
                    <li key={item.title}>
                      <NavigationMenuLink
                        asChild
                        className="flex items-start gap-2 p-3"
                      >
                        <a href="#">
                          {item.icon}
                          <div className="flex flex-col gap-0.5">
                            <div className="text-sm leading-none font-medium">
                              {item.title}
                            </div>
                            <p className="text-xs leading-snug text-muted-foreground">
                              {item.description}
                            </p>
                          </div>
                        </a>
                      </NavigationMenuLink>
                    </li>
                  ))}
                </ul>
                <div className="mt-2 px-1 pb-1">
                  <Button className="w-full" asChild>
                    <a href="#">Learn more</a>
                  </Button>
                </div>
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  )
}
