"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useTransition } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Search, Shield, UserCheck, Users } from "lucide-react"
import { roleUsers } from "@/constants/maps-enums"

type RoleKeys = keyof typeof roleUsers | "ALL"

const FilterSearch = () => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [isPending, startTransition] = useTransition()

  // Pega os valores atuais da URL ou define o padrão
  const currentQuery = searchParams.get("q") ?? ""
  const currentRole = (searchParams.get("role") ?? "ALL") as RoleKeys

  // Função única para atualizar a URL de forma performática
  const handleFilter = (key: "q" | "role", value: string) => {
    const params = new URLSearchParams(searchParams.toString())

    if (value && value !== "ALL") {
      params.set(key, value)
    } else {
      params.delete(key)
    }

    startTransition(() => {
      router.push(`${pathname}?${params.toString()}`)
    })
  }

  return (
    <section className="p-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-semibold">Filtros</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col gap-4 md:flex-row md:items-center">
            {/* Input de Busca por Nome/Email */}
            <div className="flex-1">
              <div className="relative">
                <Search className="text-muted-foreground absolute top-3 left-3 h-4 w-4" />
                <Input
                  placeholder="Buscar por nome ou email..."
                  className="pl-10"
                  defaultValue={currentQuery}
                  onChange={(e) => handleFilter("q", e.target.value)}
                />
              </div>
            </div>

            {/* Botões de Filtro por Role */}
            <div className="flex gap-2 overflow-auto py-1 [&::-webkit-scrollbar]:hidden">
              <Button
                size="sm"
                variant={currentRole === "ALL" ? "default" : "outline"}
                onClick={() => handleFilter("role", "ALL")}
                disabled={isPending}
              >
                Todos
              </Button>

              <Button
                size="sm"
                variant={currentRole === "ADMIN" ? "default" : "outline"}
                onClick={() => handleFilter("role", "ADMIN")}
                disabled={isPending}
              >
                <Shield className="mr-1 h-3.5 w-3.5" />
                {roleUsers.ADMIN}s
              </Button>

              <Button
                size="sm"
                variant={currentRole === "MODERATOR" ? "default" : "outline"}
                onClick={() => handleFilter("role", "MODERATOR")}
                disabled={isPending}
              >
                <UserCheck className="mr-1 h-3.5 w-3.5" />
                {roleUsers.MODERATOR}es
              </Button>

              <Button
                size="sm"
                variant={currentRole === "USER" ? "default" : "outline"}
                onClick={() => handleFilter("role", "USER")}
                disabled={isPending}
              >
                <Users className="mr-1 h-3.5 w-3.5" />
                {roleUsers.USER}os
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  )
}

export default FilterSearch
