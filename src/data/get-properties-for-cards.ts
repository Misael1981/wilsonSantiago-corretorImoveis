// @/data/get-properties.ts
import { PropertyType } from "@/generated/prisma"
import { db } from "@/lib/prisma"

type GetPropertiesInput = {
  page?: number
  limit?: number
  type?: string | null // Filtro pelo tipo do imóvel (casa, apartamento, etc.)
}

export async function getPropertiesForCards({
  page = 1,
  limit = 6, // Define quantos imóveis aparecem por página na parte pública
  type = null,
}: GetPropertiesInput = {}) {
  try {
    // 1. Garante que os números da paginação sejam válidos
    const currentPage = Math.max(1, page)
    const skip = (currentPage - 1) * limit

    // 2. Monta a query dinâmica de filtro (where)
    // Se o Wilson (ou o cliente) clicar em "Todos", o 'type' vem nulo, aí o Prisma traz tudo!
    const whereClause: any = {
      // Exemplo opcional: buscar apenas imóveis marcados como visíveis/publicados
      // published: true,
    }

    if (type && type !== "ALL") {
      whereClause.type = type as PropertyType // Ou apenas a string se não for Enum
    }

    // 3. Executa as buscas em paralelo para voar em performance (banco Neon agradece)
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

    // 4. Calcula o total de páginas matematicamente
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
