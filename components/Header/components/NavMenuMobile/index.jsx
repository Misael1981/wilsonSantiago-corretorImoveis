import Link from "next/link"

const navItems = [
  {
    id: "home",
    label: "Home",
    href: "/",
  },
  {
    id: "imoveis",
    label: "Imóveis",
    href: "/imoveis",
  },
  {
    id: "blog",
    label: "Blog",
    href: "/blog",
  },
  {
    id: "sobre",
    label: "Sobre",
    href: "/sobre",
  },
]

const NavMenuMobile = () => {
  return (
    <nav>
      <ul>
        {navItems.map((item) => (
          <li
            key={item.id}
            className="text-wilson-golden border-wilson-golden border-b py-2 text-lg"
          >
            <Link href={item.href} className="text-wilson-golden">
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default NavMenuMobile
