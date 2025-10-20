"use client"

import { Button } from "@/components/ui/button"
import { useRouter, useSearchParams } from "next/navigation"

const SearchTables = ({ view }) => {
  const router = useRouter()
  const searchParams = useSearchParams()

  const setView = (next) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set("view", next)
    router.push(`/admin/imoveis?${params.toString()}`)
  }

  return (
    <section className="w-full p-4">
      <div className="flex flex-wrap items-center justify-center gap-4">
        <Button variant={view === "available" ? "default" : "outline"} onClick={() => setView("available")}>
          Imóveis Disponíveis
        </Button>
        <Button variant={view === "listing" ? "default" : "outline"} onClick={() => setView("listing")}>
          Pedidos de Cadastros
        </Button>
        <Button variant={view === "requests" ? "default" : "outline"} onClick={() => setView("requests")}>
          Imóveis Encomendados
        </Button>
      </div>
    </section>
  )
}
export default SearchTables
