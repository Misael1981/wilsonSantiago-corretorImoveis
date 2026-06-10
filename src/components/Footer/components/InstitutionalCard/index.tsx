"use client"

import { Bookmark, FileText, Shield } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const links = [
  {
    icon: Shield, // Passamos a referência do componente
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
      "Encomende seu imóvel e receba informações no conforto da sua casa",
    href: "/encomende-seu-imovel",
  },
]

const InstitutionalCard = () => {
  return (
    <div className="w-full space-y-2 lg:max-w-100">
      {" "}
      {/* Ajustado max-w-100 para classe padrão do Tailwind */}
      <Image
        src="/icons/logo-horizontal.svg"
        alt="Logo Wilson Corretor Imóveis"
        width={200}
        height={50} // Ajustado de 200 para 50 para manter a proporção da logo horizontal sem distorcer
        className="h-auto"
      />
      <p className="text-sm font-semibold text-white/60">
        Transformando sonhos em Realidade
      </p>
      <h3 className="text-wilson-golden mt-4 mb-2 text-lg font-semibold">
        Institucional
      </h3>
      {/* 🟢 LISTA CORRIGIDA: Cada link agora vira uma <li> própria pro React não reclamar de semântica */}
      <ul className="space-y-2">
        {links.map((link) => {
          // 💡 O SEGREDO TÁ AQUI: Atribuímos o ícone a uma variável com letra MAIÚSCULA
          const IconComponent = link.icon

          return (
            <li key={link.title}>
              <Link
                href={link.href}
                className="group flex gap-3 rounded-lg p-2 transition-all hover:bg-gray-700/30"
              >
                {/* Container do ícone circular */}
                <div className="bg-wilson-golden text-wilson-blue flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-colors group-hover:bg-amber-300">
                  {/* 🟢 Renderizamos como uma tag JSX normal! */}
                  <IconComponent className="h-4 w-4" />
                </div>

                <div className="flex-1">
                  <p className="text-sm font-medium text-white/80 transition-colors group-hover:text-amber-300">
                    {link.title}
                  </p>
                  <p className="text-xs text-gray-400">{link.description}</p>
                </div>
              </Link>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default InstitutionalCard
