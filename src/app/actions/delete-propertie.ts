"use server"

import { db } from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { deleteImagesFromCloudinary } from "@/lib/cloudinary"

export async function deletePropertie(propertieId: string) {
  try {
    const property = await db.property.findUnique({
      where: { id: propertieId },
      select: { imageUrls: true },
    })

    if (!property) {
      return { success: false, error: "Imóvel não encontrado." }
    }

    if (property.imageUrls && property.imageUrls.length > 0) {
      await deleteImagesFromCloudinary(property.imageUrls)
    }

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
