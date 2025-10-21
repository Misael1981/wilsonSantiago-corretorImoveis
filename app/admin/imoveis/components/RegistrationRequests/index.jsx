"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Edit, MoreHorizontal, Trash2 } from "lucide-react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

const RegistrationRequests = ({ listings }) => {
  // Estados
  const [editingList, setEditingList] = useState(null)
  const [statusToUpdate, setStatusToUpdate] = useState("PENDING")
  const [editDialogOpen, setEditDialogOpen] = useState(false)
  const [editingReq, setEditingReq] = useState(null)
  const [loading, setLoading] = useState(false)

  const STATUS_LABELS = {
    PENDING: "Pendente",
    REVIEWED: "Em Análise",
    APPROVED: "Aprovado",
    REJECTED: "Rejeitado",
  }

  const badgeClassForStatus = (status) => {
    switch (status) {
      case "PENDING":
        return "bg-yellow-500 text-yellow-900"
      case "REVIEWED":
        return "bg-blue-500 text-blue-900"
      case "APPROVED":
        return "bg-green-500 text-green-900"
      case "REJECTED":
        return "bg-red-500 text-red-900"
      default:
        return "bg-gray-500 text-gray-900"
    }
  }

  const TYPE_LABELS = {
    HOUSE: "Casa",
    APARTMENT: "Apartamento",
    FARM: "Chácara",
    LAND: "Terreno",
    COMMERCIAL: "Comercial",
    STORE: "Loja",
    OTHER: "Outro",
  }

  const formatDate = (date) =>
    new Date(date).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    })

  const formatBRL = (val) =>
    typeof val === "number"
      ? new Intl.NumberFormat("pt-BR", {
          style: "currency",
          currency: "BRL",
        }).format(val)
      : null

  const formatPriceRange = (minPrice, maxPrice) => {
    const min = formatBRL(minPrice)
    const max = formatBRL(maxPrice)
    if (min && max) return `${min} – ${max}`
    if (min) return `${min} +`
    if (max) return `até ${max}`
    return "Não informado"
  }

  const handleEdit = (list) => {
    setEditingList(list)
    setStatusToUpdate(list?.status ?? "PENDING")
    setEditDialogOpen(true)
  }

  const submitStatusUpdate = async () => {
    if (!editingList) return
    setLoading(true)
    try {
      const res = await fetch(`/api/listings/${editingList.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: statusToUpdate }),
      })
      let data = null
      try {
        data = await res.json()
      } catch {}
      if (!res.ok) {
        const message =
          data?.error ||
          (res.status === 401 ? "Não autorizado" : "Falha ao atualizar status")
        throw new Error(message)
      }
      toast.success("Status atualizado com sucesso!")
      setEditDialogOpen(false)
      setEditingList(null)
      router.refresh()
    } catch (err) {
      toast.error(err.message || "Erro ao atualizar status")
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (list) => {
    const ok = window.confirm(
      "Tem certeza que deseja excluir esta solicitação?",
    )
    if (!ok) return
    setLoading(true)
    try {
      const res = await fetch(`/api/listings/${list.id}`, { method: "DELETE" })
      let data = null
      try {
        data = await res.json()
      } catch {}
      if (!res.ok) {
        const message =
          data?.error ||
          (res.status === 401
            ? "Não autorizado"
            : "Falha ao excluir solicitação")
        throw new Error(message)
      }
      toast.success("Solicitação excluída com sucesso!")
      router.refresh()
    } catch (err) {
      toast.error(err.message || "Erro ao excluir solicitação")
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="p-4">
      <div className="mb-4 pl-4">
        <h2 className="text-2xl font-semibold">
          Solicitações de Cadastro de Imóveis para Venda
        </h2>
        <span className="text-muted-foreground text-sm">
          Total: {listings?.length ?? 0}
        </span>
      </div>

      <div className="flex flex-wrap justify-center gap-4 lg:justify-start">
        {listings.map((list) => (
          <Card key={list.id} className="w-[400px] max-w-[95%]">
            <CardContent>
              <div>
                {/* CTA */}
                <div className="mb-4 flex justify-end">
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
                        onClick={() => handleEdit(list)}
                      >
                        <Edit className="mr-2 h-4 w-4" />
                        Editar Status
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="text-destructive cursor-pointer"
                        onClick={() => handleDelete(list)}
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Excluir
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                {/* Cabeçalho */}
                <div>
                  <div className="mb-4 flex items-center justify-between">
                    <div>
                      <h4 className="text-lg font-semibold">
                        {list.name || "—"}
                      </h4>
                      <p className="text-muted-foreground text-sm">
                        {list.createdAt ? formatDate(list.createdAt) : "—"}
                      </p>
                    </div>
                    <Badge className={badgeClassForStatus(list.status)}>
                      {STATUS_LABELS[list.status] || list.status || "—"}
                    </Badge>
                  </div>
                </div>
                {/* Detalhes */}
                <ul>
                  <li>
                    <p className="text-muted-foreground text-sm">
                      <span className="font-medium">Título:</span>{" "}
                      {list.title || "—"}
                    </p>
                  </li>
                  <li>
                    <p className="text-muted-foreground text-sm">
                      <span className="font-medium">Telefone:</span>{" "}
                      {list.phone || "—"}
                    </p>
                  </li>
                  <li>
                    <p className="text-muted-foreground text-sm">
                      <span className="font-medium">Tipo:</span>{" "}
                      {TYPE_LABELS[list.type] || list.type || "—"}
                    </p>
                  </li>
                  <li>
                    <p className="text-muted-foreground text-sm">
                      <span className="font-medium">Cidade:</span>{" "}
                      {list.city || "—"}
                    </p>
                  </li>
                  <li>
                    <p className="text-muted-foreground text-sm">
                      <span className="font-medium">Valor pretendido:</span>{" "}
                      {formatBRL(list.price) || "—"}
                    </p>
                  </li>
                  <li>
                    <p className="text-muted-foreground text-sm">
                      <span className="font-medium">Descrição:</span>{" "}
                      {list.description || "—"}
                    </p>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      {/* Diálogo para editar somente o status */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar status da solicitação</DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <div className="text-sm">
              {editingList?.name} — {editingList?.city}
            </div>
            <Select value={statusToUpdate} onValueChange={setStatusToUpdate}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Selecione um status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="PENDING">Pendente</SelectItem>
                <SelectItem value="REVIEWED">Em Análise</SelectItem>
                <SelectItem value="APPROVED">Aprovado</SelectItem>
                <SelectItem value="REJECTED">Rejeitado</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <DialogFooter>
            <Button
              variant="ghost"
              onClick={() => setEditDialogOpen(false)}
              disabled={loading}
            >
              Cancelar
            </Button>
            <Button
              onClick={submitStatusUpdate}
              disabled={loading || !statusToUpdate}
            >
              {loading ? "Salvando..." : "Salvar"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </section>
  )
}

export default RegistrationRequests
