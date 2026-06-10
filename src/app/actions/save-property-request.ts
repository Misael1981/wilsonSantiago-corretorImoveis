"use server"

import { db } from "@/lib/prisma"
import { PropertyRequestFormValues } from "@/schemas/property-schema"

export async function savePropertyRequest(formData: PropertyRequestFormValues) {
  try {
    const newRequest = await db.propertyRequest.create({
      data: {
        name: formData.name,
        phone: formData.phone,
        type: formData.type,
        neighborhood: formData.neighborhood || null,
        city: formData.city,
        minPrice: formData.minPrice ? Number(formData.minPrice) : null,
        maxPrice: formData.maxPrice ? Number(formData.maxPrice) : null,
        description: formData.description || null,
      },
    })

    return { success: true, data: newRequest }
  } catch (error) {
    console.error("Erro crítico na Server Action:", error)
    return {
      success: false,
      error: "Erro interno ao salvar no banco de dados Neon.",
    }
  }
}
