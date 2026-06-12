import { Button } from "@/components/ui/button"
import Link from "next/link"

const actions = [
  {
    label: "+ Cadastrar novo imóvel",
    href: "/admin/imoveis/cadastrar/novo",
  },
  {
    label: "+ Escrever novo artigo",
    href: "/admin/posts/cadastrar/novo",
  },
  {
    label: "Solicitações de Anúncios",
    href: "/admin/imoveis",
  },
  {
    label: "Gerenciar Usuários",
    href: "/admin/usuarios",
  },
]

const QuickActions = () => {
  return (
    <section className="flex w-full justify-center p-4">
      <div>
        <h2 className="text-2xl font-bold">Ações Rápidas</h2>
        <div className="my-4 flex flex-wrap justify-center gap-4 lg:justify-center">
          {actions.map((action) => (
            <Button
              asChild
              key={action.label}
              className="text-wilson-blue bg-wilson-golden px-6 py-8 text-lg font-bold hover:bg-[#b8a076] focus:bg-[#b8a076] focus:ring-2 focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
            >
              <Link href={action.href}>{action.label}</Link>
            </Button>
          ))}
        </div>
      </div>
    </section>
  )
}

export default QuickActions
