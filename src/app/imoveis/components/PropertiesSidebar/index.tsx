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

const PropertiesSidebar = () => {
  const [isOpen, setIsOpen] = useState(true)
  const [type, setType] = useState<string | undefined>(undefined)

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
              <AnimatedContent>
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
                      onValueChange={(v) => setType(v)}
                      value={type ?? undefined}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="CASA">Casa</SelectItem>
                        <SelectItem value="APARTAMENTO">Apartamento</SelectItem>
                        <SelectItem value="CASA_SOBRADO">Sobrado</SelectItem>
                        <SelectItem value="CHACARA">Chácara</SelectItem>
                        <SelectItem value="SALA_COMERCIAL">
                          Comercial
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    {/* Hidden input para enviar o valor do Select no GET */}
                    <input type="hidden" name="type" value={type ?? ""} />
                  </div>

                  {/* Localização */}
                  <div className="space-y-1">
                    <Label>Cidade</Label>
                    <Input name="city" placeholder="Ex: São Paulo" />
                  </div>

                  <div className="space-y-1">
                    <Label>Bairro</Label>
                    <Input name="neighborhood" placeholder="Ex: Centro" />
                  </div>

                  {/* Preço */}
                  <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-1">
                      <Label>Preço mín.</Label>
                      <Input type="number" name="priceMin" />
                    </div>
                    <div className="space-y-1">
                      <Label>Preço máx.</Label>
                      <Input type="number" name="priceMax" />
                    </div>
                  </div>

                  {/* Quartos / Banheiros / Vagas */}
                  <div className="grid grid-cols-3 gap-2">
                    <div className="space-y-1">
                      <Label>Quartos</Label>
                      <Input type="number" name="bedrooms" />
                    </div>
                    <div className="space-y-1">
                      <Label>Banheiros</Label>
                      <Input type="number" name="bathrooms" />
                    </div>
                    <div className="space-y-1">
                      <Label>Vagas</Label>
                      <Input type="number" name="parking" />
                    </div>
                  </div>

                  {/* Área */}
                  <div className="space-y-1">
                    <Label>Área útil (m²)</Label>
                    <Input type="number" name="area" />
                  </div>
                </form>
              </AnimatedContent>
            )}
          </AnimatePresence>
        </SidebarContent>
        <SidebarFooter>
          {/* Botões */}
          <Button
            type="submit"
            form="filtersForm"
            className="bg-gradient-wilson-blue w-full"
          >
            Aplicar
          </Button>
          <Button type="button" variant="destructive" className="w-full">
            Limpar
          </Button>
        </SidebarFooter>
      </div>
    </Sidebar>
  )
}

export default PropertiesSidebar
