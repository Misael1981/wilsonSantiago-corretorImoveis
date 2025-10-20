"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"

const RealEstateFilters = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [q, setQ] = useState(searchParams.get("q") || "")

  useEffect(() => {
    setQ(searchParams.get("q") || "")
  }, [searchParams])

  const applySearch = () => {
    const params = new URLSearchParams(searchParams.toString())
    if (q?.trim()) params.set("q", q.trim())
    else params.delete("q")
    router.push(`/admin/imoveis?${params.toString()}`)
  }

  return (
    <section className="w-full p-4">
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
                  placeholder="Buscar título, cidade ou bairro"
                  className="pl-10"
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && applySearch()}
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Button onClick={applySearch}>Buscar</Button>
              <Button
                variant="outline"
                onClick={() => {
                  setQ("")
                  const params = new URLSearchParams(searchParams.toString())
                  params.delete("q")
                  router.push(`/admin/imoveis?${params.toString()}`)
                }}
              >
                Limpar
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  )
}

export default RealEstateFilters
