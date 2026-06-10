// @/data/get-articles-for-blog-section.ts
import { db } from "@/lib/prisma"

export async function getArticlesForBlogSection() {
  try {
    const articles = await db.article.findMany({
      where: {
        published: true,
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 4,
      select: {
        id: true,
        title: true,
        slug: true,
        excerpt: true,
        imageUrl: true,
        readTime: true,
        publishedAt: true,
        createdAt: true,
        author: { select: { name: true } },
      },
    })

    return articles
  } catch (error) {
    console.error("Erro ao buscar artigos do blog:", error)
    return []
  }
}
