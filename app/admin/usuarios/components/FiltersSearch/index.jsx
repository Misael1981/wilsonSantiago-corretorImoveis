"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Search, Shield, UserCheck, UserX } from "lucide-react"
import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"

const FiltersSearch = ({ q = "", role, verified }) => {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [query, setQuery] = useState(q)
  useEffect(() => {
    setQuery(q || "")
  }, [q])

  const pushParams = (next) => {
    const params = new URLSearchParams(searchParams.toString())
    Object.entries(next).forEach(([key, value]) => {
      if (value === undefined || value === null || value === "") {
        params.delete(key)
      } else {
        params.set(key, String(value))
      }
    })
    router.push(`/admin/usuarios?${params.toString()}`)
  }

  const applySearch = () => pushParams({ q: query })
  const clearAll = () =>
    pushParams({ q: "", role: undefined, verified: undefined })
  const setAdmins = () => pushParams({ role: "ADMIN", verified: undefined })
  const setVerified = (flag) =>
    pushParams({ verified: flag ? "true" : "false", role: undefined })

  const isAdmins = role === "ADMIN"
  const isVerified = verified === "true"
  const isUnverified = verified === "false"

  return (
    <section className="p-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-semibold">Filtros</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col gap-4 md:flex-row md:items-center">
            <div className="flex-1">
              <div className="relative">
                <Search className="text-muted-foreground absolute top-3 left-3 h-4 w-4" />
                <Input
                  placeholder="Buscar por nome ou email"
                  className="pl-10"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") applySearch()
                  }}
                  onBlur={applySearch}
                />
              </div>
            </div>
            <div className="flex gap-2 overflow-auto [&::-webkit-scrollbar]:hidden">
              <Button
                size="sm"
                variant={
                  !isAdmins && !isVerified && !isUnverified && !q
                    ? "default"
                    : "outline"
                }
                onClick={clearAll}
              >
                Todos
              </Button>
              <Button
                size="sm"
                variant={isAdmins ? "default" : "outline"}
                onClick={setAdmins}
              >
                <Shield className="mr-1 h-3 w-3" />
                Admins
              </Button>
              <Button
                size="sm"
                variant={isVerified ? "default" : "outline"}
                onClick={() => setVerified(true)}
              >
                <UserCheck className="mr-1 h-3 w-3" />
                Verificados
              </Button>
              <Button
                size="sm"
                variant={isUnverified ? "default" : "outline"}
                onClick={() => setVerified(false)}
              >
                <UserX className="mr-1 h-3 w-3" />
                Não Verificados
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  )
}

export default FiltersSearch
