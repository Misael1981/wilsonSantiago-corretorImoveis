"use server"

import { db } from "@/lib/prisma"
import { ListingRequestFormValues } from "@/schemas/property-schema"

export async function saveListingRequest(formData: ListingRequestFormValues) {
  try {
    const newRequest = await db.listingRequest.create({
      data: {
        title: formData.title,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        type: formData.type,
        city: formData.city,
        description: formData.description,
        price: formData.price,
        area: formData.area,
        imageUrls: formData.imageUrls,
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
