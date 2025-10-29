import { Button } from "@/components/ui/button"
import Link from "next/link"

const actions = [
  {
    label: "+ Cadastrar novo imóvel",
    href: "/admin/imoveis",
  },
  {
    label: "+ Escrever novo artigo",
    href: "/admin/artigos",
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
        <div className="my-4 flex flex-wrap justify-center gap-4 lg:justify-start">
          {actions.map((action) => (
            <Button
              asChild
              key={action.label}
              className="text-wilson-blue bg-wilson-golden px-6 py-8 text-2xl font-bold hover:bg-amber-500"
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
