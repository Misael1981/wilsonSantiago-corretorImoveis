"use client"

import { Button } from "@/components/ui/button"
import { useRouter, useSearchParams } from "next/navigation"
import { useState } from "react"

function SearchTables({ view }) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const pushView = (next) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set("view", next)
    router.push(`/admin/imoveis?${params.toString()}`)
  }

  // Destaque persistente via URL
  const featuredOnly = searchParams.get("featured") === "true"

  const toggleFeatured = () => {
    const params = new URLSearchParams(searchParams.toString())
    if (featuredOnly) {
      params.delete("featured")
    } else {
      params.set("featured", "true")
    }
    router.push(`/admin/imoveis?${params.toString()}`)
  }

  return (
    <section className="w-full p-4">
      <div className="flex flex-wrap items-center justify-center gap-4">
        <Button
          className={
            view === "available"
              ? "bg-gradient-wilson-golden text-wilson-blue"
              : ""
          }
          variant={view === "available" ? "default" : "outline"}
          onClick={() => pushView("available")}
        >
          Imóveis Disponíveis
        </Button>
        <Button
          className={
            featuredOnly ? "bg-gradient-wilson-golden text-wilson-blue" : ""
          }
          variant={featuredOnly ? "default" : "outline"}
          onClick={toggleFeatured}
        >
          Imóveis em Destaque
        </Button>
        <Button
          className={
            view === "listing"
              ? "bg-gradient-wilson-golden text-wilson-blue"
              : ""
          }
          variant={view === "listing" ? "default" : "outline"}
          onClick={() => pushView("listing")}
        >
          Pedidos de Cadastros
        </Button>
        <Button
          className={
            view === "requests"
              ? "bg-gradient-wilson-golden text-wilson-blue"
              : ""
          }
          variant={view === "requests" ? "default" : "outline"}
          onClick={() => pushView("requests")}
        >
          Imóveis Encomendados
        </Button>
      </div>
    </section>
  )
}
export default SearchTables
