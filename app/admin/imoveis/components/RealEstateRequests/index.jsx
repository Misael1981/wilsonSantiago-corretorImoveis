"use client"

import { Badge } from "@/components/ui/badge"
// Cabeçalho de imports do componente RealEstateRequests
import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu"

import { MoreHorizontal, Edit, Trash2 } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select"
import { toast } from "sonner"

function RealEstateRequests({ propertyRequests }) {
  const TYPE_LABELS = {
    HOUSE: "Casa",
    APARTMENT: "Apartamento",
    FARM: "Chácara",
    LAND: "Terreno",
    COMMERCIAL: "Comercial",
    STORE: "Loja",
    OTHER: "Outro",
  }

  const STATUS_LABELS = {
    PENDING: "Pendente",
    CONTACTED: "Em negociação",
    COMPLETED: "Concluído",
    CANCELLED: "Cancelado",
  }

  const badgeClassForStatus = (status) => {
    switch (status) {
      case "PENDING":
        return "bg-yellow-100 text-yellow-700"
      case "CONTACTED":
        return "bg-blue-100 text-blue-700"
      case "COMPLETED":
        return "bg-green-100 text-green-700"
      case "CANCELLED":
        return "bg-red-100 text-red-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

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

  const formatDate = (date) =>
    new Date(date).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    })

  const normalizePhone = (phone) => (phone || "").replace(/\D/g, "")
  const phoneHref = (phone) => {
    const digits = normalizePhone(phone)
    return digits ? `tel:${digits}` : undefined
  }

  const [editDialogOpen, setEditDialogOpen] = useState(false)
  const [editingReq, setEditingReq] = useState(null)
  const [statusToUpdate, setStatusToUpdate] = useState("")
  const [loading, setLoading] = useState(false)

  const handleEdit = (req) => {
    setEditingReq(req)
    setStatusToUpdate(req?.status ?? "PENDING")
    setEditDialogOpen(true)
  }

  const submitStatusUpdate = async () => {
    if (!editingReq?.id || !statusToUpdate) return
    setLoading(true)
    try {
      const res = await fetch(`/api/property-requests/${editingReq.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: statusToUpdate }),
      })

      if (!res.ok) {
        let msg = "Falha ao atualizar status"
        try {
          const data = await res.json()
          msg = data?.error || msg
        } catch {
          // Sem corpo JSON, mantém msg padrão
        }
        if (res.status === 401) {
          msg = "Não autorizado. Faça login como ADMIN."
        }
        throw new Error(msg)
      }

      // Opcionalmente ler o corpo para confirmar e usar na UI
      await res.json().catch(() => null)

      toast.success("Status atualizado com sucesso!")
      // Atualiza localmente (sem refetch)
      if (Array.isArray(propertyRequests)) {
        const idx = propertyRequests.findIndex((r) => r.id === editingReq.id)
        if (idx !== -1) {
          propertyRequests[idx].status = statusToUpdate
        }
      }
      setEditDialogOpen(false)
      setEditingReq(null)
    } catch (e) {
      toast.error(e.message || "Erro desconhecido")
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (req) => {
    if (!req?.id) return
    const confirm = window.confirm(
      "Tem certeza que deseja excluir esta solicitação?",
    )
    if (!confirm) return
    setLoading(true)
    try {
      const res = await fetch(`/api/property-requests/${req.id}`, {
        method: "DELETE",
      })

      if (!res.ok) {
        let msg = "Falha ao excluir solicitação"
        try {
          const data = await res.json()
          msg = data?.error || msg
        } catch {}
        if (res.status === 401) {
          msg = "Não autorizado. Faça login como ADMIN."
        }
        throw new Error(msg)
      }

      toast.success("Solicitação excluída!")
      if (Array.isArray(propertyRequests)) {
        const idx = propertyRequests.findIndex((r) => r.id === req.id)
        if (idx !== -1) {
          propertyRequests.splice(idx, 1)
        }
      }
    } catch (e) {
      toast.error(e.message || "Erro desconhecido")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-4 p-4">
      <div className="pl-4">
        <h3 className="text-2xl font-semibold">Solicitações de Imóvel</h3>
        <span className="text-muted-foreground text-sm">
          Total: {propertyRequests?.length ?? 0}
        </span>
      </div>

      <div className="flex flex-wrap justify-center gap-4 lg:justify-start">
        {propertyRequests?.map((req) => (
          <Card key={req.id} className="w-[400px] max-w-[95%]">
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
                        onClick={() => handleEdit(req)}
                      >
                        <Edit className="mr-2 h-4 w-4" />
                        Editar Status
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="text-destructive cursor-pointer"
                        onClick={() => handleDelete(req)}
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Excluir
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                {/* Cabeçalho */}
                <div className="mb-4 flex items-center justify-between">
                  <div>
                    <h4 className="text-lg font-semibold">{req.name || "—"}</h4>
                    <p className="text-muted-foreground text-sm">
                      {req.createdAt ? formatDate(req.createdAt) : "—"}
                    </p>
                  </div>
                  <Badge className={badgeClassForStatus(req.status)}>
                    {STATUS_LABELS[req.status] || req.status || "—"}
                  </Badge>
                </div>
                <ul>
                  <li>
                    <p className="text-muted-foreground text-sm">
                      <span className="font-medium">Telefone:</span>{" "}
                      {req.phone || "—"}
                    </p>
                  </li>
                  <li>
                    <p className="text-muted-foreground text-sm">
                      <span className="font-medium">Tipo:</span>{" "}
                      {TYPE_LABELS[req.type] || req.type || "—"}
                    </p>
                  </li>
                  <li>
                    <p className="text-muted-foreground text-sm">
                      <span className="font-medium">Cidade:</span>{" "}
                      {req.city || "—"}
                    </p>
                  </li>
                  <li>
                    <p className="text-muted-foreground text-sm">
                      <span className="font-medium">Bairro:</span>{" "}
                      {req.neighborhood || "—"}
                    </p>
                  </li>
                  <li>
                    <p className="text-muted-foreground text-sm">
                      <span className="font-medium">Faixa de preço:</span>{" "}
                      {formatPriceRange(req.minPrice, req.maxPrice)}
                    </p>
                  </li>
                  <li>
                    <p className="text-muted-foreground text-sm">
                      <span className="font-medium">Descrição:</span>{" "}
                      {req.description || "—"}
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
              {editingReq?.name} — {editingReq?.city}{" "}
              {editingReq?.neighborhood ? `(${editingReq.neighborhood})` : ""}
            </div>
            <Select value={statusToUpdate} onValueChange={setStatusToUpdate}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Selecione um status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="PENDING">Pendente</SelectItem>
                <SelectItem value="CONTACTED">Contactado</SelectItem>
                <SelectItem value="COMPLETED">Concluído</SelectItem>
                <SelectItem value="CANCELLED">Cancelado</SelectItem>
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
    </div>
  )
}

export default RealEstateRequests
