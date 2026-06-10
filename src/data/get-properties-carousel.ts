import { db } from "@/lib/prisma"

export async function getPropertiesCarousel() {
  try {
    const properties = await db.property.findMany({
      where: { featured: true },
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        title: true,
        codRef: true,
        slug: true,
        featured: true,
        createdAt: true,
        neighborhood: true,
        city: true,
        price: true,
        imageUrls: true,
        bathrooms: true,
        bedrooms: true,
        garageSpaces: true,
        area: true,
        status: true,
      },
    })

    return properties
  } catch (error) {
    console.error("Erro ao buscar dados públicos dos imóveis:", error)
    throw new Error("Não foi possível carregar os dados dos imóveis.")
  }
}
