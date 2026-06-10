import { db } from "@/lib/prisma"

export async function getPostsForAdmin() {
  try {
    const articles = await db.article.findMany({
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        title: true,
        slug: true,
        createdAt: true,
      },
    })

    return articles
  } catch (error) {
    console.error("Erro ao buscar artigos:", error)
    return []
  }
}
