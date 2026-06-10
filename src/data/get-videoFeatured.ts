import { db } from "@/lib/prisma"

export async function getVideoFeatured() {
  try {
    const videoFeatured = await db.property.findMany({
      where: { videoFeatured: true },
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        title: true,
        codRef: true,
        slug: true,
        videoFeatured: true,
        youtubeUrl: true,
        youtubeId: true,
        createdAt: true,
      },
    })

    return videoFeatured
  } catch (error) {
    console.error("Erro ao buscar imóveis:", error)
    return []
  }
}
