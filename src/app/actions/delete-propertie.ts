"use server"

import { db } from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export async function deletePropertie(propertieId: string) {
  try {
    await db.property.delete({
      where: {
        id: propertieId,
      },
    })

    revalidatePath("/admin/imoveis")

    return {
      success: true,
    }
  } catch (error) {
    console.error("Erro ao deletar imóvel:", error)
    throw new Error("Não foi possível deletar o imóvel")
  }
}
