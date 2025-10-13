"use client"

import AnimatedContent from "@/components/AnimatedContent"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar"
import { AnimatePresence } from "framer-motion"
import Image from "next/image"
import { useState } from "react"
import { useRouter, usePathname } from "next/navigation"

const AppSidebar = () => {
  const [isOpen, setIsOpen] = useState(true)
  const [filters, setFilters] = useState({
    type: "",
    city: "",
    neighborhood: "",
    priceMin: "",
    priceMax: "",
    bedrooms: "",
    bathrooms: "",
    parking: "",
    area: "",
    status: "",
  })

  const handleChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
  }

  const handleClear = () => {
    setFilters({
      type: "",
      city: "",
      neighborhood: "",
      priceMin: "",
      priceMax: "",
      bedrooms: "",
      bathrooms: "",
      parking: "",
      area: "",
      status: "",
    })
    if (typeof window !== "undefined") {
      window.location.href = "/imoveis"
    }
  }

  // Removemos o handleApply baseado em useRouter e usamos formulário GET
  const router = useRouter()
  const pathname = usePathname()

  const handleApply = () => {
    // Monta a querystring com os filtros preenchidos
    const params = new URLSearchParams()
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== "" && value != null) {
        params.set(key, String(value))
      }
    })

    router.push(`${pathname}?${params.toString()}`, { scroll: false })
    setIsOpen(false)
  }

  return (
    <Sidebar>
      <div className="flex h-full min-h-0 flex-col p-1">
        <SidebarHeader className="bg-gradient-wilson-blue flex items-center justify-center rounded-2xl p-4">
          <Image
            src="/icons/logo-horizontal.svg"
            alt="logo"
            width={100}
            height={50}
          />
        </SidebarHeader>
        <SidebarContent className="min-h-0 flex-1 overflow-y-auto overscroll-contain p-2 pr-2">
          <AnimatePresence>
            {isOpen && (
              <AnimatedContent className="">
                <form
                  id="filtersForm"
                  action="/imoveis"
                  method="GET"
                  className="flex size-full flex-col justify-between gap-2"
                >
                  <h2 className="mb-4 text-center text-lg font-semibold">
                    Filtros
                  </h2>

                  {/* Tipo */}
                  <div className="space-y-1">
                    <Label>Tipo do imóvel</Label>
                    <Select
                      onValueChange={(v) => handleChange("type", v)}
                      value={filters.type}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="casa">Casa</SelectItem>
                        <SelectItem value="apartamento">Apartamento</SelectItem>
                        <SelectItem value="sobrado">Sobrado</SelectItem>
                        <SelectItem value="chacara">Chácara</SelectItem>
                        <SelectItem value="comercial">Comercial</SelectItem>
                      </SelectContent>
                    </Select>
                    {/* Hidden input para enviar o valor do Select no GET */}
                    <input
                      type="hidden"
                      name="type"
                      value={filters.type ?? ""}
                    />
                  </div>

                  {/* Localização */}
                  <div className="space-y-1">
                    <Label>Cidade</Label>
                    <Input
                      name="city"
                      value={filters.city}
                      onChange={(e) => handleChange("city", e.target.value)}
                      placeholder="Ex: São Paulo"
                    />
                  </div>

                  <div className="space-y-1">
                    <Label>Bairro</Label>
                    <Input
                      name="neighborhood"
                      value={filters.neighborhood}
                      onChange={(e) =>
                        handleChange("neighborhood", e.target.value)
                      }
                      placeholder="Ex: Centro"
                    />
                  </div>

                  {/* Preço */}
                  <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-1">
                      <Label>Preço mín.</Label>
                      <Input
                        type="number"
                        name="priceMin"
                        value={filters.priceMin}
                        onChange={(e) =>
                          handleChange("priceMin", e.target.value)
                        }
                      />
                    </div>
                    <div className="space-y-1">
                      <Label>Preço máx.</Label>
                      <Input
                        type="number"
                        name="priceMax"
                        value={filters.priceMax}
                        onChange={(e) =>
                          handleChange("priceMax", e.target.value)
                        }
                      />
                    </div>
                  </div>

                  {/* Quartos / Banheiros / Vagas */}
                  <div className="grid grid-cols-3 gap-2">
                    <div className="space-y-1">
                      <Label>Quartos</Label>
                      <Input
                        type="number"
                        name="bedrooms"
                        value={filters.bedrooms}
                        onChange={(e) =>
                          handleChange("bedrooms", e.target.value)
                        }
                      />
                    </div>
                    <div className="space-y-1">
                      <Label>Banheiros</Label>
                      <Input
                        type="number"
                        name="bathrooms"
                        value={filters.bathrooms}
                        onChange={(e) =>
                          handleChange("bathrooms", e.target.value)
                        }
                      />
                    </div>
                    <div className="space-y-1">
                      <Label>Vagas</Label>
                      <Input
                        type="number"
                        name="parking"
                        value={filters.parking}
                        onChange={(e) =>
                          handleChange("parking", e.target.value)
                        }
                      />
                    </div>
                  </div>

                  {/* Área */}
                  <div className="space-y-1">
                    <Label>Área útil (m²)</Label>
                    <Input
                      type="number"
                      name="area"
                      value={filters.area}
                      onChange={(e) => handleChange("area", e.target.value)}
                    />
                  </div>
                </form>
              </AnimatedContent>
            )}
          </AnimatePresence>
        </SidebarContent>
        <SidebarFooter>
          {/* Botões */}
          <div className="flex gap-2 pt-4">
            <Button
              type="submit"
              form="filtersForm"
              className="bg-gradient-wilson-blue flex-1"
            >
              Aplicar
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={handleClear}
              className="flex-1 bg-red-700 text-gray-300 hover:bg-red-800"
            >
              Limpar
            </Button>
          </div>
        </SidebarFooter>
      </div>
    </Sidebar>
  )
}

export default AppSidebar
