import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { useUser } from "@/hooks/useUser"
import Link from "next/link"

const navItems = [
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
]

const NavMenu = () => {
  const { user } = useUser()
  const isAdmin = user?.role === "ADMIN"

  return (
    <NavigationMenu viewport={false}>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="text-wilson-golden bg-transparent text-lg">
            Home
          </NavigationMenuTrigger>
          <NavigationMenuContent className="bg-wilson-blue border-wilson-blue z-50 border">
            <ul className="bg-wilson-blue grid gap-2 rounded-lg md:w-100 lg:w-125 lg:grid-cols-[.75fr_1fr]">
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <Link
                    className="from-muted/50 to-muted flex h-full w-full flex-col justify-end rounded-md bg-linear-to-b p-6 no-underline outline-none select-none focus:shadow-md"
                    href="/"
                  >
                    <div className="text-wilson-golden hover:text-bold mt-4 mb-2 text-lg font-medium">
                      Home Page
                    </div>
                    <p className="text-sm leading-tight text-white/80">
                      Acesso a página principal
                    </p>
                  </Link>
                </NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink asChild>
                  <a
                    href="#highlights"
                    title="Novidades e Lançamentos"
                    className="text-wilson-golden"
                  >
                    Novidades e Lançamentos
                  </a>
                </NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink asChild>
                  <a
                    href="#contact"
                    title="Contato"
                    className="text-wilson-golden"
                  >
                    Contato
                  </a>
                </NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink asChild>
                  <a
                    href="#adress"
                    title="Localização"
                    className="text-wilson-golden"
                  >
                    Localização
                  </a>
                </NavigationMenuLink>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        {navItems.map((item) => (
          <NavigationMenuItem key={item.id}>
            <NavigationMenuLink asChild className="text-wilson-golden text-lg">
              <Link href={item.href}>{item.label}</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        ))}
        <NavigationMenuItem>
          <NavigationMenuTrigger className="text-wilson-golden bg-wilson-blue text-lg">
            Institucional
          </NavigationMenuTrigger>
          <NavigationMenuContent className="border-wilson-golden bg-wilson-blue z-50 border p-0">
            <ul className="bg-wilson-blue grid w-50 gap-4 p-4">
              <li>
                <NavigationMenuLink asChild>
                  <Link
                    href="/encomende-seu-imovel"
                    className="text-wilson-golden"
                  >
                    Encomendar seu Imóvel
                  </Link>
                </NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink asChild>
                  <Link href="/cadastrar-imovel" className="text-wilson-golden">
                    Cadastre seu Imóvel
                  </Link>
                </NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink asChild>
                  <Link
                    href="/politica-de-privacidade"
                    className="text-wilson-golden"
                  >
                    Política de Privacidade
                  </Link>
                </NavigationMenuLink>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        {isAdmin && (
          <NavigationMenuItem>
            <NavigationMenuLink asChild className="truncate text-lg text-white">
              <Link href="/admin">Dashboard Administrativo</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        )}
      </NavigationMenuList>
    </NavigationMenu>
  )
}

export default NavMenu
