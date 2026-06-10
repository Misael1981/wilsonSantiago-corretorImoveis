"use client"

import { Button } from "@/components/ui/button"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { useRouter, useSearchParams } from "next/navigation"

type SearchPropertiesProps = {
  view: string | undefined
}

const SearchProperties = ({ view = "available" }: SearchPropertiesProps) => {
  const router = useRouter()
  const searchParams = useSearchParams()

  const pushView = (next: string) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set("view", next)
    // Quando mudar de aba, reseta a paginação para a página 1 não dar bug de lista vazia
    params.set("page", "1")
    router.push(`/admin/imoveis?${params.toString()}`)
  }

  // Helper para não repetir código de estilo nos botões
  const buttonStyle = (currentView: string) =>
    view === currentView ? "bg-gradient-wilson-golden text-wilson-blue" : ""

  return (
    <section className="w-full p-4">
      <ScrollArea className="w-full">
        <div className="flex gap-4 lg:justify-center">
          <Button
            className={buttonStyle("available")}
            variant={view === "available" ? "default" : "outline"}
            onClick={() => pushView("available")}
          >
            Imóveis Disponíveis
          </Button>

          <Button
            className={buttonStyle("featured")}
            variant={view === "featured" ? "default" : "outline"}
            onClick={() => pushView("featured")}
          >
            Imóveis em Destaque
          </Button>

          <Button
            className={buttonStyle("video_featured")}
            variant={view === "video_featured" ? "default" : "outline"}
            onClick={() => pushView("video_featured")}
          >
            Imóveis com Vídeo em Destaque
          </Button>

          <Button
            className={buttonStyle("listing")}
            variant={view === "listing" ? "default" : "outline"}
            onClick={() => pushView("listing")}
          >
            Pedidos de Cadastros
          </Button>

          <Button
            className={buttonStyle("requests")}
            variant={view === "requests" ? "default" : "outline"}
            onClick={() => pushView("requests")}
          >
            Imóveis Encomendados
          </Button>
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </section>
  )
}

export default SearchProperties
