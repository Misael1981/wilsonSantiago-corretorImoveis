"use client"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select"
import { SearchIcon } from "lucide-react"
import { useState } from "react"

const PostsFilter = ({ total, page, perPage }) => {
  const router = useRouter()
  const searchParams = useSearchParams()

  const qParam = searchParams.get("q") || ""
  const publishedParam = searchParams.get("published") // "true" | "false" | null
  const perPageParam = searchParams.get("perPage") || "12"

  const [q, setQ] = useState(qParam)
  const [published, setPublished] = useState(publishedParam ?? "all")
  const [perPageLocal, setPerPageLocal] = useState(perPageParam)

  const updateParams = (updates) => {
    const sp = new URLSearchParams(searchParams.toString())
    Object.entries(updates).forEach(([key, val]) => {
      if (val == null || val === "" || val === "all") {
        sp.delete(key)
      } else {
        sp.set(key, String(val))
      }
    })
    // sempre reseta para primeira página quando muda filtro
    sp.set("page", "1")
    router.push(`?${sp.toString()}`)
  }

  const onSubmitSearch = (e) => {
    e.preventDefault()
    updateParams({ q })
  }

  const onChangePublished = (value) => {
    setPublished(value)
    updateParams({ published: value === "all" ? null : value })
  }

  const onChangePerPage = (value) => {
    setPerPageLocal(value)
    updateParams({ perPage: value })
  }

  const clearFilters = () => {
    setQ("")
    setPublished("all")
    setPerPageLocal("12")
    const sp = new URLSearchParams()
    sp.set("page", "1")
    router.push(`?${sp.toString()}`)
  }

  return (
    <section className="flex w-full flex-col gap-3 p-4 sm:flex-row sm:items-end sm:justify-between">
      <form onSubmit={onSubmitSearch} className="flex w-full items-end gap-2">
        <div className="flex-1">
          <label className="text-sm font-medium">Buscar</label>
          <Input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Título, resumo ou conteúdo"
          />
        </div>
        <Button type="submit" className="bg-gradient-wilson-blue text-white">
          <SearchIcon className="h-4 w-4" />
        </Button>
      </form>

      <div className="flex items-end gap-2">
        <div className="">
          <label className="text-sm font-medium">Publicado</label>
          <Select value={published} onValueChange={onChangePublished}>
            <SelectTrigger>
              <SelectValue placeholder="Todos" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              <SelectItem value="true">Publicados</SelectItem>
              <SelectItem value="false">Não publicados</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="">
          <label className="text-sm font-medium">Por página</label>
          <Select value={perPageLocal} onValueChange={onChangePerPage}>
            <SelectTrigger>
              <SelectValue placeholder="12" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="12">12</SelectItem>
              <SelectItem value="24">24</SelectItem>
              <SelectItem value="36">36</SelectItem>
              <SelectItem value="50">50</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button variant="outline" onClick={clearFilters} className="">
          Limpar
        </Button>
      </div>

      {typeof total === "number" && (
        <div className="text-muted-foreground text-sm">
          Total: {total} {perPage ? `(pág. ${page ?? 1})` : null}
        </div>
      )}
    </section>
  )
}

export default PostsFilter
