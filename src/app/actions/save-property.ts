"use server"

import { db } from "@/lib/prisma"
import { PropertyFormValues, propertySchema } from "@/schemas/property-schema"
import { extractYoutubeId } from "@/helpers/extract-youtubeId"
import { Prisma } from "@/generated/prisma"
import { auth } from "@/lib/auth"

export async function savePropertyAction(
  formData: PropertyFormValues,
  propertyId?: string | null,
) {
  const validatedFields = propertySchema.safeParse(formData)

  const session = await auth()

  if (!session?.user?.id) {
    return {
      success: false,
      error: "Mano, você precisa estar logado para cadastrar imóveis!",
    }
  }

  const currentUserId = session?.user?.id

  if (!validatedFields.success) {
    return {
      success: false,
      error: "Dados inválidos no formulário.",
      details: validatedFields.error.flatten().fieldErrors,
    }
  }

  const data = validatedFields.data
  const youtubeId = extractYoutubeId(data.youtubeUrl)

  try {
    if (propertyId) {
      // ==========================================
      // MODO EDIÇÃO
      // ==========================================
      const existing = await db.property.findUnique({
        where: { id: propertyId },
        select: { id: true },
      })

      if (!existing) {
        return {
          success: false,
          error: `Imóvel com ID "${propertyId}" não encontrado para edição.`,
        }
      }

      const updateData: Prisma.PropertyUpdateInput = {
        title: data.title,
        slug: data.slug,
        description: data.description,
        price: Number(data.price),
        area: data.area ? Number(data.area) : null,
        bedrooms: Number(data.bedrooms),
        bathrooms: Number(data.bathrooms),
        garageSpaces: Number(data.garageSpaces || 0),
        featured: data.featured,
        type: data.type,
        status: data.status,
        address: data.street,
        number: data.number,
        complement: data.complement,
        neighborhood: data.neighborhood,
        city: data.city,
        state: data.state,
        imageUrls: data.imageUrls,
        youtubeUrl: data.youtubeUrl,
        youtubeId: youtubeId,
        videoFeatured: data.videoFeatured,
      }

      await db.property.update({
        where: { id: propertyId },
        data: updateData,
      })
    } else {
      // ==========================================
      // MODO CADASTRO
      // ==========================================
      const lastProperty = await db.property.findFirst({
        orderBy: { codRef: "desc" },
        select: { codRef: true },
      })
      const nextCodRef = lastProperty ? lastProperty.codRef + 1 : 1000

      const createData: Prisma.PropertyCreateInput = {
        title: data.title,
        slug: data.slug,
        codRef: data.codRef || nextCodRef,
        description: data.description,
        price: Number(data.price),
        area: data.area ? Number(data.area) : null,
        bedrooms: Number(data.bedrooms),
        bathrooms: Number(data.bathrooms),
        garageSpaces: Number(data.garageSpaces || 0),
        featured: data.featured,
        type: data.type,
        status: data.status,
        address: data.street,
        number: data.number,
        complement: data.complement,
        neighborhood: data.neighborhood,
        city: data.city,
        state: data.state,
        imageUrls: data.imageUrls,
        youtubeUrl: data.youtubeUrl || null,
        youtubeId: youtubeId,
        videoFeatured: data.videoFeatured,

        createdBy: {
          connect: { id: currentUserId },
        },
      }

      await db.property.create({
        data: createData,
      })
    }
  } catch (error) {
    console.error("Erro crítico na Server Action:", error)
    return {
      success: false,
      error: "Erro interno ao salvar no banco de dados Neon.",
    }
  }
}
