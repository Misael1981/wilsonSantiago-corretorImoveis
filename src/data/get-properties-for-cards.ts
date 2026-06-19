import { PropertyType } from "@/generated/prisma"
import { db, Prisma } from "@/lib/prisma"

type GetPropertiesInput = {
  page?: number
  limit?: number
  type?: string | null
  city?: string | null
}

export async function getPropertiesForCards({
  page = 1,
  limit = 6,
  type = null,
  city = null,
}: GetPropertiesInput = {}) {
  try {
    const currentPage = Math.max(1, page)
    const skip = (currentPage - 1) * limit

    const whereClause: Prisma.PropertyWhereInput = {
      // Exemplo opcional: buscar apenas imóveis marcados como visíveis/publicados
      // published: true,
    }

    if (type && type !== "ALL") {
      const baseType = (type as string).includes("_")
        ? (type as string).split("_")[0]
        : (type as string)

      whereClause.type = baseType as PropertyType
    }

    if (city && (city as string).trim() !== "") {
      whereClause.city = {
        contains: city,
        mode: "insensitive",
      }
    }

    const [properties, totalCount] = await Promise.all([
      db.property.findMany({
        where: whereClause,
        skip: skip,
        take: limit,
        orderBy: { createdAt: "desc" },
        select: {
          id: true,
          title: true,
          slug: true,
          codRef: true,
          description: true,
          neighborhood: true,
          city: true,
          bathrooms: true,
          bedrooms: true,
          garageSpaces: true,
          area: true,
          price: true,
          imageUrls: true,
          type: true,
          status: true,
          createdAt: true,
        },
      }),
      db.property.count({
        where: whereClause,
      }),
    ])

    const totalPages = Math.ceil(totalCount / limit)

    return {
      properties,
      meta: {
        totalItems: totalCount,
        totalPages: totalPages === 0 ? 1 : totalPages,
        currentPage,
      },
    }
  } catch (error) {
    console.error("Erro ao buscar dados públicos dos imóveis:", error)
    throw new Error("Não foi possível carregar os dados dos imóveis.")
  }
}
