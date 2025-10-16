import { Button } from "@/components/ui/button"
import Link from "next/link"

const BUTTONS_SEARCH = [
  {
    label: "Residencial",
    type: "outline",
    href: "/imoveis?category=residencial",
  },
  {
    label: "Comercial",
    type: "outline",
    href: "/imoveis?category=comercial",
  },
  {
    label: "Outros Tipos",
    type: "outline",
    href: "/imoveis?category=outros",
  },
]

const ButtonsSearch = () => {
  return (
    <div className="flex flex-wrap items-center justify-center gap-4">
      {BUTTONS_SEARCH.map(({ label, type, href }) => (
        <Link href={href} key={label} aria-label={`Filtrar por ${label}`}>
          <Button
            className="border border-blue-900 !bg-transparent text-blue-900"
            variant={type}
          >
            {label}
          </Button>
        </Link>
      ))}
    </div>
  )
}

export default ButtonsSearch
