"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Edit, MoreHorizontal, Trash2 } from "lucide-react"
import DialogCreate from "../DialogCreate"
import CodRefBadge from "@/components/CodRefBadge"

const AvailableProperties = ({ properties }) => {
  const router = useRouter()
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [editingProperty, setEditingProperty] = useState(null)

  const openEdit = (p) => {
    setEditingProperty(p)
    setIsEditOpen(true)
  }

  const handleUpdateProperty = async (data) => {
    try {
      const id = editingProperty?.id
      if (!id) {
        toast.error("ID do imóvel não encontrado.")
        return
      }

      // Envia só o que mudou
      const normalize = (k, v) => {
        const numeric = ["price", "area", "bedrooms", "bathrooms", "garageSpaces"]
        if (numeric.includes(k)) {
          return typeof v === "number" ? v : v == null ? null : Number(v)
        }
        if (typeof v === "string") {
          const trimmed = v.trim()
          // Evita apagar campos existentes com string vazia
          return trimmed === "" ? undefined : trimmed
        }
        return v
      }

      const allowed = [
        "title",
        "type",
        "status",
        "price",
        "address",
        "number",
        "complement",
        "neighborhood",
        "city",
        "state",
        "zipCode",
        "bedrooms",
        "bathrooms",
        "garageSpaces",
        "area",
        "imageUrls",
        "featured",
        "description",
      ]

      const updatePayload = {}
      for (const key of allowed) {
        const next = normalize(key, data[key])
        const prev = normalize(key, editingProperty[key])
        if (typeof next !== "undefined" && JSON.stringify(next) !== JSON.stringify(prev)) {
          updatePayload[key] = next
        }
      }

      if (Object.keys(updatePayload).length === 0) {
        toast.info("Nenhuma alteração detectada.")
        return
      }

      const res = await fetch(`/api/imoveis/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatePayload),
      })
      if (!res.ok) {
        const msg = await res.text()
        toast.error(msg || "Falha ao atualizar imóvel")
        return
      }
      toast.success("Imóvel atualizado com sucesso!")
      setIsEditOpen(false)
      setEditingProperty(null)
      router.refresh()
    } catch (err) {
      console.error(err)
      toast.error("Erro ao atualizar imóvel.")
    }
  }

  const deleteProperty = async (p) => {
    const ok = window.confirm(`Excluir "${p.title}"? Esta ação é irreversível.`)
    if (!ok) return
    try {
      const res = await fetch(`/api/imoveis/${p.id}`, { method: "DELETE" })
      if (!res.ok) {
        const msg = await res.text()
        toast.error(msg || "Falha ao excluir imóvel")
        return
      }
      toast.success("Imóvel excluído!")
      router.refresh()
    } catch (err) {
      console.error(err)
      toast.error("Erro ao excluir imóvel.")
    }
  }

  return (
    <div className="rounded-md border">
      {properties.length === 0 ? (
        <div className="text-muted-foreground p-4 text-sm">
          Nenhum imóvel encontrado.
        </div>
      ) : (
        <ul className="space-y-4">
          {properties.map((p) => (
            <li key={p.id} className="p-4">
              <Card className="w-full">
                <CardContent className="flex flex-wrap gap-8 p-4 sm:justify-between">
                  <div className="flex w-full justify-between gap-8 sm:w-fit">
                    <div>
                      <div className="font-medium">{p.title}</div>
                      <div className="text-muted-foreground text-sm">
                        {p.type} •{" "}
                        <Badge
                          className={`${badgeClassForStatus(p.status)} text-xs font-medium`}
                        >
                          {STATUS_LABELS[p.status] ?? p.status}
                        </Badge>{" "}
                        • {p.city}
                      </div>
                    </div>
                    <CodRefBadge codRef={p.codRef} />
                  </div>
                  <div className="flex w-full items-center justify-between gap-4 sm:w-fit">
                    <div className="text-right">
                      <div className="font-semibold">
                        {typeof p.price === "number"
                          ? p.price.toLocaleString("pt-BR", {
                              style: "currency",
                              currency: "BRL",
                            })
                          : "-"}
                      </div>
                      <div className="text-muted-foreground text-xs">
                        {new Date(p.createdAt).toLocaleDateString("pt-BR")}
                      </div>
                    </div>
                    <div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            className="border-accent border"
                            variant="ghost"
                            size="sm"
                          >
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuItem
                            className="cursor-pointer"
                            onClick={() => openEdit(p)}
                          >
                            <Edit className="mr-2 h-4 w-4" />
                            Editar
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="text-destructive cursor-pointer"
                            onClick={() => deleteProperty(p)}
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Excluir
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </li>
          ))}
        </ul>
      )}
      {isEditOpen && editingProperty && (
        <DialogCreate
          open={isEditOpen}
          onOpenChange={setIsEditOpen}
          onSubmit={handleUpdateProperty}
          initialData={editingProperty}
          dialogTitle="Editar Imóvel"
          submitText="Salvar alterações"
        />
      )}
    </div>
  )
}

export default AvailableProperties

// Map de rótulos PT-BR para exibição
const STATUS_LABELS = {
  ACTIVE: "Ativo",
  PENDING: "Pendente",
  SOLD: "Vendido",
  SPECIAL_CONDITION: "Condição especial",
  INACTIVE: "Inativo",
  RESERVED: "Reservado",
}

const TYPE_LABELS = {
  CASA: "Casa",
  APARTAMENTO: "Apartamento",
  TERRENO: "Terreno",
  LOJA: "Loja",
  CHACARA: "Chácara",
  SITIO: "Sítio",
  GALPAO: "Galpão",
  SALA_COMERCIAL: "Sala comercial",
}

const badgeClassForStatus = (s) => {
  switch (s) {
    case "ACTIVE":
      return "bg-green-500 text-white"
    case "PENDING":
      return "bg-yellow-500 text-white"
    case "SOLD":
      return "bg-gray-500 text-white"
    case "SPECIAL_CONDITION":
      return "bg-purple-600 text-white"
    case "INACTIVE":
      return "bg-slate-400 text-white"
    case "RESERVED":
      return "bg-blue-500 text-white"
    default:
      return "bg-secondary"
  }
}
