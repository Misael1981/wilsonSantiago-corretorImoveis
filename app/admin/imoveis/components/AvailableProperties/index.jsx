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
      const res = await fetch(`/api/imoveis/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: data.title,
          type: data.type,
          status: data.status,
          price: data.price,
          address: data.address,
          number: data.number,
          complement: data.complement,
          neighborhood: data.neighborhood,
          city: data.city,
          state: data.state,
          zipCode: data.zipCode,
          bedrooms: data.bedrooms,
          bathrooms: data.bathrooms,
          garageSpaces: data.garageSpaces,
          area: data.area,
          imageUrls: data.imageUrls || [],
          featured: !!data.featured,
        }),
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
                <CardContent className="flex items-center justify-between p-4">
                  <div>
                    <div className="font-medium">{p.title}</div>
                    <div className="text-muted-foreground text-sm">
                      {p.type} •{" "}
                      <Badge className="bg-green-500 text-xs font-medium text-white">
                        {p.status}
                      </Badge>{" "}
                      • {p.city}
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
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
