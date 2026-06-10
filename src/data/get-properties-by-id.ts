import { db } from "@/lib/prisma"

export async function getPropertiesById({ id }: { id: string }) {
  try {
    const property = await db.property.findUnique({
      where: { id },
      select: {
        id: true,
        title: true,
        slug: true,
        codRef: true,
        description: true,
        price: true,
        area: true,
        bedrooms: true,
        bathrooms: true,
        garageSpaces: true,
        type: true,
        status: true,
        featured: true,

        street: true,
        number: true,
        complement: true,
        neighborhood: true,
        city: true,
        state: true,

        imageUrls: true,
        youtubeUrl: true,
        youtubeId: true,
        videoFeatured: true,
        createdAt: true,
      },
    })

    return property
  } catch (error) {
    console.error("Erro ao buscar o imóvel:", error)
    throw new Error("Não foi possível carregar os dados do imóvel.")
  }
}
