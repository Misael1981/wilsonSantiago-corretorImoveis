import { db } from "@/lib/prisma"

export async function getProperties() {
  try {
    const properties = await db.property.findMany({
      orderBy: { createdAt: "desc" },
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

    return properties
  } catch (error) {
    console.error("Erro ao buscar imóveis:", error)
    return []
  }
}
