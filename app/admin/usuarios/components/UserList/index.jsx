"use client"

import { useState, useEffect } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { format } from "date-fns"
import {
  Edit,
  Mail,
  MoreHorizontal,
  Phone,
  Shield,
  ShieldOff,
  Trash2,
  UserCheck,
} from "lucide-react"
import DialogEdition from "../DialogEdition"
import { toast } from "sonner"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

function getUserInitials(name) {
  if (!name) return "US"
  const parts = name.trim().split(" ").filter(Boolean)
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase()
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
}

const UserList = ({ users }) => {
  const [selectedUser, setSelectedUser] = useState(null)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)

  const handleSubmitUser = async (payload) => {
    try {
      const res = await fetch(`/api/users/${payload.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: payload.name,
          phone: payload.phone,
          role: payload.role,
          isActive: payload.isActive,
        }),
      })
      if (!res.ok) {
        const text = await res.text()
        throw new Error(text || "Falha ao atualizar usuário")
      }
      toast.success("Usuário atualizado com sucesso!")
      setIsEditDialogOpen(false)
    } catch (err) {
      toast.error(err.message || "Erro ao salvar usuário")
    }
  }

  const openEditDialog = (user) => {
    setSelectedUser(user)
    setIsEditDialogOpen(true)
  }

  const [rows, setRows] = useState(users)
  useEffect(() => {
    setRows(users)
  }, [users])

  const openDeleteDialog = (user) => {
    setSelectedUser(user)
    setIsDeleteDialogOpen(true)
  }

  const handleConfirmDelete = async () => {
    if (!selectedUser?.id) return
    try {
      const res = await fetch(`/api/users/${selectedUser.id}`, {
        method: "DELETE",
      })
      if (!res.ok) {
        const text = await res.text()
        throw new Error(text || "Falha ao excluir usuário")
      }
      setRows((prev) => prev.filter((u) => u.id !== selectedUser.id))
      toast.success("Usuário excluído com sucesso!")
      setIsDeleteDialogOpen(false)
      setSelectedUser(null)
    } catch (err) {
      toast.error(err.message || "Erro ao excluir usuário")
    }
  }

  const toggleAdmin = async (user) => {
    try {
      const nextRole = user.role === "ADMIN" ? "USER" : "ADMIN"
      const res = await fetch(`/api/users/${user.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role: nextRole }),
      })
      if (!res.ok) {
        const text = await res.text()
        throw new Error(text || "Falha ao atualizar papel do usuário")
      }
      toast.success(
        nextRole === "ADMIN"
          ? "Usuário promovido a ADMIN"
          : "Usuário rebaixado para USER",
      )
      // Opcional: refletir sem reload (se quiser, mantenha uma cópia local do array)
      // setRows((prev) => prev.map(u => u.id === user.id ? { ...u, role: nextRole } : u))
    } catch (err) {
      toast.error(err.message || "Erro ao alterar papel")
    }
  }

  return (
    <section className="p-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-semibold">
            Lista de Usuários
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                {/* Cabeçalho da tabela */}
                <TableRow>
                  <TableHead>Usuário</TableHead>
                  <TableHead>Contato</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Cadastro</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {Array.isArray(rows) && rows.length > 0 ? (
                  rows.map((user) => (
                    <TableRow key={user.id}>
                      {/* Coluna Usuário nome e foto */}
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-9 w-9">
                            <AvatarImage
                              src={user.image || ""}
                              alt={user.name || ""}
                            />
                            <AvatarFallback>
                              {getUserInitials(user.name)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">
                              {user.name || "Usuário sem nome"}
                            </div>
                          </div>
                        </div>
                      </TableCell>

                      {/* Coluna Contato email e telefone */}
                      <TableCell>
                        <div className="space-y-1">
                          {user.email && (
                            <div className="flex items-center gap-1 text-sm">
                              <Mail className="h-3 w-3" />
                              {user.email}
                            </div>
                          )}
                          {/* phone não está no select atual; manter futuro */}
                          {user.phone && (
                            <div className="flex items-center gap-1 text-sm">
                              <Phone className="h-3 w-3" />
                              {user.phone}
                            </div>
                          )}
                        </div>
                      </TableCell>

                      {/* Coluna Status */}
                      <TableCell>
                        <div className="flex gap-1">
                          <Badge
                            className={
                              user.role === "ADMIN"
                                ? "bg-green-400 text-white"
                                : "bg-secondary text-secondary-foreground"
                            }
                          >
                            <Shield className="mr-1 h-3 w-3" />
                            {user.role}
                          </Badge>
                        </div>
                      </TableCell>

                      {/* Coluna Cadastro  data */}
                      <TableCell className="text-muted-foreground text-sm">
                        {user.createdAt
                          ? format(new Date(user.createdAt), "dd/MM/yyyy")
                          : "-"}
                      </TableCell>

                      {/* Coluna Ações */}
                      <TableCell className="text-right">
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
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem
                              onClick={() => openEditDialog(user)}
                              className="cursor-pointer"
                            >
                              <Edit className="mr-2 h-4 w-4" />
                              Editar
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => toggleAdmin(user)}
                              className="cursor-pointer"
                            >
                              {user.role === "ADMIN" ? (
                                <>
                                  <ShieldOff className="mr-2 h-4 w-4" />
                                  Remover Admin
                                </>
                              ) : (
                                <>
                                  <Shield className="mr-2 h-4 w-4" />
                                  Tornar Admin
                                </>
                              )}
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => openDeleteDialog(user)}
                              className="text-destructive"
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              Excluir
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={5}
                      className="text-muted-foreground text-center text-sm"
                    >
                      Nenhum usuário encontrado.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          {/* Dialog de confirmação de exclusão */}
          <Dialog
            open={isDeleteDialogOpen}
            onOpenChange={setIsDeleteDialogOpen}
          >
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Excluir usuário</DialogTitle>
                <DialogDescription>
                  Essa ação não pode ser desfeita.
                </DialogDescription>
              </DialogHeader>
              <div className="text-sm">
                Tem certeza que deseja excluir{" "}
                <strong>
                  {selectedUser?.name || selectedUser?.email || "este usuário"}
                </strong>
                ?
              </div>
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setIsDeleteDialogOpen(false)}
                >
                  Cancelar
                </Button>
                <Button variant="destructive" onClick={handleConfirmDelete}>
                  Excluir
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* Dialog de edição já existente */}
          <DialogEdition
            open={isEditDialogOpen}
            onOpenChange={setIsEditDialogOpen}
            user={selectedUser}
            onSubmit={handleSubmitUser}
          />
        </CardContent>
      </Card>
    </section>
  )
}

export default UserList
