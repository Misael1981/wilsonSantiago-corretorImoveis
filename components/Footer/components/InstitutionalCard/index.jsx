import { Bookmark, FileText, PlusCircle, Shield } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const links = [
  {
    icon: Shield,
    title: "Política de Privacidade",
    description: "Saiba como utilizamos seus dados",
    href: "/politica-de-privacidade",
  },
  {
    icon: FileText,
    title: "Cadastre seu Imóvel",
    description: "Cadastre seu imóvel no portal pioneira da região",
    href: "/cadastrar-imovel",
  },
  {
    icon: Bookmark,
    title: "Encomende seu Imóvel",
    description:
      "Encomende seu imóvel e tenha receba informações no conforto da sua casa",
    href: "/",
  },
]

const InstitutionalCard = () => {
  return (
    <div className="w-full space-y-2 lg:max-w-[400px]">
      <Image
        src="/icons/logo-horizontal.svg"
        alt="Logo Wilson Corretor Imóveis"
        width={200}
        height={200}
      />
      <p className="text-sm font-semibold text-white/60">
        Transformando sonhos em Realidade
      </p>
      <h3 className="text-wilson-golden mb-4 text-lg font-semibold">
        Institucional
      </h3>
      <ul>
        <li>
          {links.map(({ icon: IconComponent, title, description, href }) => (
            <Link
              key={title}
              href={href}
              className="group flex items-center gap-3 rounded-lg p-2 transition-all hover:bg-gray-50 dark:hover:bg-gray-800"
            >
              <div className="bg-wilson-golden text-wilson-blue flex h-8 w-8 items-center justify-center rounded-full group-hover:bg-amber-300">
                <IconComponent className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium group-hover:text-amber-300 dark:text-gray-100">
                  {title}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {description}
                </p>
              </div>
            </Link>
          ))}
        </li>
      </ul>
    </div>
  )
}

export default InstitutionalCard
