import { Button } from "@/components/ui/button"
import {
  NavigationMenu,
  NavigationMenuList,
} from "@/components/ui/navigation-menu"

const navItems = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Imóveis",
    href: "/imoveis",
  },
  {
    label: "Blog",
    href: "/blog",
  },
]

const NavMenu = () => {
  return (
    <nav>
      <NavigationMenu>
        <NavigationMenuList></NavigationMenuList>
      </NavigationMenu>
      <ul className="lg:flex lg:items-center lg:gap-4">
        {navItems.map((item) => (
          <li
            key={item.label}
            className="border-b-wilson-blue-light mb-2 border-b pb-2 lg:m-0 lg:border-b-0 lg:pb-0"
          >
            <Button
              variant="link"
              className="text-wilson-golden hover:text-wilson-golden/80 text-lg font-semibold transition-colors duration-300"
            >
              {item.label}
            </Button>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default NavMenu
