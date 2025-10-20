"use client"

import { Button } from "@/components/ui/button"
import { UserPlus } from "lucide-react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import DialogCreate from "../DialogCreate"

const SubTitleUsers = () => {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const router = useRouter()

  const openCreateDialog = () => {
    setIsCreateDialogOpen(true)
  }

  const handleCreateUser = async (form) => {
    try {
      const res = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          role: form.role,
          isActive: form.isActive,
          image: form.image,
        }),
      })
      if (!res.ok) {
        const text = await res.text()
        throw new Error(text || "Falha ao criar usuário")
      }
      toast.success("Usuário criado com sucesso!")
      setIsCreateDialogOpen(false)
      router.refresh()
    } catch (err) {
      toast.error(err.message || "Erro ao criar usuário")
    }
  }

  return (
    <section className="flex w-full flex-wrap items-center justify-between p-4">
      <div>
        <h2 className="text-2xl font-bold text-gray-800">Gerenciar Usuários</h2>
        <p className="text-gray-600">
          Gerencie usuários e permissões do sistema
        </p>
      </div>
      <div className="">
        <Button
          className="bg-gradient-wilson-blue px-6 py-4 text-lg text-white"
          onClick={openCreateDialog}
        >
          <UserPlus className="mr-2 h-6 w-6" />
          Novo Usuário
        </Button>
      </div>

      {/* Dialog de criação */}
      <DialogCreate
        open={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
        onSubmit={handleCreateUser}
      />
    </section>
  )
}

export default SubTitleUsers
