"use client"

import React, { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function InputsSearch() {
  const router = useRouter()
  const [type, setType] = useState<string | null>(null)
  const [city, setCity] = useState("")

  const handleSearch = () => {
    const params = new URLSearchParams()
    if (type) params.set("type", type)
    if (city.trim()) params.set("city", city.trim())

    const query = params.toString()
    router.push(`/imoveis${query ? `?${query}` : ""}`)
  }

  return (
    <div className="space-y-4 lg:flex lg:items-end lg:justify-center lg:space-y-0">
      <div className="w-full px-4 lg:max-w-62">
        <h3 className="text-wilson-blue mb-2 text-lg font-semibold">
          Tipo de imóvel
        </h3>
        <Select
          onValueChange={(value) => setType(value)}
          value={type ?? undefined}
        >
          <SelectTrigger className="w-full border border-blue-900 focus:border-blue-900 focus:ring-2 focus:ring-blue-200">
            <SelectValue placeholder="Tipos de Imóveis" />
          </SelectTrigger>
          <SelectContent className="">
            <SelectGroup>
              <SelectLabel>Residencial</SelectLabel>
              <SelectItem value="APARTAMENTO">Apartamento</SelectItem>
              <SelectItem value="CASA">Casa</SelectItem>
              <SelectItem value="APARTAMENTO_COBERTURA">Cobertura</SelectItem>
              <SelectItem value="CASA_SOBRADO">Sobrado</SelectItem>
            </SelectGroup>
            <SelectGroup>
              <SelectLabel>Comercial</SelectLabel>
              <SelectItem value="SALA_COMERCIAL">Consultório</SelectItem>
              <SelectItem value="GALPAO">Galpão/Depósito/Armazem</SelectItem>
              <SelectItem value="SALA_COMERCIAL_GERAL">
                Imóvel Comercial
              </SelectItem>
              <SelectItem value="LOJA">Ponto Comercial/Box/Loja</SelectItem>
            </SelectGroup>
            <SelectGroup>
              <SelectLabel>Outros tipos</SelectLabel>
              <SelectItem value="TERRENO">Lotes/Terrenos</SelectItem>
              <SelectItem value="TERRENO_FAZENDA">Fazenda</SelectItem>
              <SelectItem value="SITIO">Sítios</SelectItem>
              <SelectItem value="CHACARA">Chácaras</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div className="w-full px-4 lg:max-w-62">
        <h3 className="text-wilson-blue mb-2 text-lg font-semibold">
          Onde você deseja buscar?
        </h3>
        <Input
          className="border border-blue-900"
          placeholder="Digite a cidade que está procurando o imóvel..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
      </div>
      <div className="w-full px-4 lg:max-w-62">
        <Button
          onClick={handleSearch}
          className="bg-gradient-wilson-blue text-wilson-golden w-full"
        >
          Buscar
        </Button>
      </div>
    </div>
  )
}
