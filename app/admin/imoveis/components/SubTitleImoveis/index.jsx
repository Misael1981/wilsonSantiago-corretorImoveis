"use client"
import { Button } from "@/components/ui/button"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import DialogCreate from "../DialogCreate"

const SubTitleImoveis = () => {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const router = useRouter()

  const openCreateDialog = () => setIsCreateDialogOpen(true)

  const handleCreateProperty = async (form) => {
    try {
      const res = await fetch("/api/imoveis", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: form.title,
          description: form.description,
          type: form.type,
          status: form.status,
          price: form.price,
          address: form.address,
          number: form.number,
          complement: form.complement,
          neighborhood: form.neighborhood,
          city: form.city,
          state: form.state,
          zipCode: form.zipCode,
          bedrooms: form.bedrooms,
          bathrooms: form.bathrooms,
          garageSpaces: form.garageSpaces,
          area: form.area,
          imageUrls: form.imageUrls,
          featured: form.featured,
        }),
      })
      if (!res.ok) {
        const text = await res.text()
        throw new Error(text || "Falha ao criar imóvel")
      }
      toast.success("Imóvel criado com sucesso!")
      setIsCreateDialogOpen(false)
      router.refresh()
    } catch (err) {
      toast.error(err.message || "Erro ao criar imóvel")
    }
  }

  return (
    <section className="flex w-full flex-wrap items-center justify-between p-4">
      <div>
        <h2 className="text-2xl font-bold text-gray-800">Gerenciar Imóveis</h2>
        <p className="text-gray-600">
          Gerencie imóveis, cadastre imóveis e encomendas de imóveis
        </p>
      </div>
      <div className="">
        <Button
          className="bg-gradient-wilson-blue px-6 py-4 text-lg text-white"
          onClick={openCreateDialog}
        >
          + Novo Imóvel
        </Button>
      </div>

      <DialogCreate
        open={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
        onSubmit={handleCreateProperty}
      />
    </section>
  )
}

export default SubTitleImoveis
