"use client"

import { useSession } from "next-auth/react"
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
  const { data } = useSession()
  const isAdmin = data?.user?.role === "ADMIN"

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
        {isAdmin && (
          <li className="border-wilson-golden border-b py-2 text-lg text-white">
            <Link href="/admin" className="text-white">
              Dashboard Administrativo
            </Link>
          </li>
        )}
      </ul>
    </nav>
  )
}

export default NavMenuMobile
