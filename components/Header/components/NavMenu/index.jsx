import { Button } from "@/components/ui/button"

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
      <ul>
        {navItems.map((item) => (
          <li
            key={item.label}
            className="hover:border-b-wilson-golden border-b-wilson-blue-light mb-2 border-b pb-2"
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
