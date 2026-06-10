import { db, Prisma } from "@/lib/prisma"

interface GetPropertiesDataParams {
  q?: string
  view?: string
  page?: string
}

export async function getPropertiesData({
  q,
  view = "available",
  page = "1",
}: GetPropertiesDataParams) {
  const itensPorPagina = 10
  const paginaAtual = Number(page) || 1
  const itensParaPular = (paginaAtual - 1) * itensPorPagina

  const availableWhere: Prisma.PropertyWhereInput = {
    AND: [
      {
        status: {
          in: ["ACTIVE", "SPECIAL_CONDITION"],
        },
      },
      ...(q
        ? [
            {
              OR: [
                { title: { contains: q, mode: "insensitive" as const } },
                { city: { contains: q, mode: "insensitive" as const } },
                { neighborhood: { contains: q, mode: "insensitive" as const } },
              ],
            },
          ]
        : []),
    ],
  }

  try {
    const [
      propertiesCount,
      soldPropertiesCount,
      listingRequestsCount,
      propertyRequestsCount,
      listings,
      propertyRequests,
      availableProperties,
      totalImoveisFiltrados,
    ] = await Promise.all([
      db.property.count(),
      db.property.count({ where: { status: "SOLD" } }),
      db.listingRequest.count(),
      db.propertyRequest.count(),

      db.listingRequest.findMany({
        orderBy: { createdAt: "desc" },
        select: {
          id: true,
          name: true,
          email: true,
          phone: true,
          neighborhood: true,
          city: true,
          type: true,
          title: true,
          description: true,
          price: true,
          area: true,
          bedrooms: true,
          imageUrls: true,
          createdAt: true,
        },
      }),

      db.propertyRequest.findMany({
        orderBy: { createdAt: "desc" },
        select: {
          id: true,
          name: true,
          phone: true,
          type: true,
          city: true,
          neighborhood: true,
          description: true,
          minPrice: true,
          maxPrice: true,
          createdAt: true,
        },
      }),

      view === "available"
        ? db.property.findMany({
            where: availableWhere,
            orderBy: { createdAt: "desc" },
            take: itensPorPagina,
            skip: itensParaPular,
            select: {
              id: true,
              title: true,
              codRef: true,
              status: true,
              type: true,
              neighborhood: true,
              city: true,
              price: true,
              featured: true,
              createdAt: true,
              videoFeatured: true,
            },
          })
        : Promise.resolve([]),

      view === "available"
        ? db.property.count({ where: availableWhere })
        : Promise.resolve(0),
    ])

    const totalPaginas = Math.ceil(totalImoveisFiltrados / itensPorPagina)

    return {
      metrics: {
        totalProperties: propertiesCount,
        soldCount: soldPropertiesCount,
        listingRequestsCount,
        propertyRequestsCount,
      },
      listings,
      propertyRequests,
      availableProperties,
      pagination: {
        paginaAtual,
        totalPaginas,
        temPaginaAnterior: paginaAtual > 1,
        temProximaPagina: paginaAtual < totalPaginas,
      },
    }
  } catch (error) {
    console.error("Erro ao buscar dados do painel:", error)
    throw new Error(
      "Não foi possível carregar os dados do painel da imobiliária.",
    )
  }
}
