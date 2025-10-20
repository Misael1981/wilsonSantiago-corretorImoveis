"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { useState } from "react"
import { Textarea } from "@/components/ui/textarea"

const DialogCreate = ({ open, onOpenChange, onSubmit }) => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    role: "USER",
    isActive: true,
    image: "",
  })

  const handleSave = () => {
    if (!form.name?.trim()) return
    onSubmit(form)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Criar Novo Usuário</DialogTitle>
          <DialogDescription>
            Preencha os dados do novo usuário
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <Label htmlFor="create-name">Nome *</Label>
              <Input
                id="create-name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Nome completo"
              />
            </div>
            <div>
              <Label htmlFor="create-email">Email</Label>
              <Input
                id="create-email"
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="email@exemplo.com"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <Label htmlFor="create-phone">Telefone</Label>
              <Input
                id="create-phone"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                placeholder="+55 (11) 99999-9999"
              />
            </div>
            <div className="flex items-center space-x-2 pt-6">
              <Switch
                id="create-isAdmin"
                checked={form.role === "ADMIN"}
                onCheckedChange={(checked) =>
                  setForm({ ...form, role: checked ? "ADMIN" : "USER" })
                }
              />
              <Label htmlFor="create-isAdmin">Administrador</Label>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <Label htmlFor="create-image">Imagem (URL)</Label>
              <Input
                id="create-image"
                value={form.image}
                onChange={(e) => setForm({ ...form, image: e.target.value })}
                placeholder="https://exemplo.com/avatar.jpg"
              />
            </div>
            <div className="flex items-center space-x-2 pt-6">
              <Switch
                id="create-isActive"
                checked={form.isActive}
                onCheckedChange={(checked) =>
                  setForm({ ...form, isActive: checked })
                }
              />
              <Label htmlFor="create-isActive">Ativo</Label>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button onClick={handleSave}>Criar Usuário</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
export default DialogCreate
