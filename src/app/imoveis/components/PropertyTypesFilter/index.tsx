"use client"

import { Button } from "@/components/ui/button"
import { TYPES_lABELS } from "@/constants/maps-enums"
import { useRouter, useSearchParams } from "next/navigation"

const PropertyTypesFilter = () => {
  const router = useRouter()
  const searchParams = useSearchParams()

  // Pega o tipo atual da URL, se não tiver nenhum, o padrão é "ALL"
  const currentType = searchParams.get("type") || "ALL"

  const handleFilterChange = (typeValue: string) => {
    const params = new URLSearchParams(searchParams.toString())

    if (typeValue === "ALL") {
      params.delete("type") // Limpa a URL se for pra buscar todos
    } else {
      params.set("type", typeValue)
    }

    // Sempre que mudar o filtro, reinicia para a página 1 para não dar bug de página fantasma
    params.set("page", "1")

    router.push(`/imoveis?${params.toString()}`, { scroll: false })
  }
  return (
    <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
      {Object.entries(TYPES_lABELS).map(([value, label]) => {
        const isActive = currentType === value

        return (
          <Button
            key={value}
            onClick={() => handleFilterChange(value)}
            // Classe dinâmica: se estiver ativo, ganha a cor de destaque do Wilson!
            className={`transition-all ${
              isActive
                ? "bg-wilson-blue font-bold text-white shadow-md"
                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
            }`}
          >
            {label}
          </Button>
        )
      })}
    </div>
  )
}

export default PropertyTypesFilter
