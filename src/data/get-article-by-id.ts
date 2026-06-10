import { db } from "@/lib/prisma"

export async function getArticleById({ id }: { id: string }) {
  try {
    const article = await db.article.findUnique({
      where: { id },
      select: {
        id: true,
        title: true,
        content: true,
        excerpt: true,
        slug: true,
        imageUrl: true,
        published: true,
        featured: true,
        views: true,
        readTime: true,
        metaDescription: true,
        metaTitle: true,
        createdAt: true,

        tags: {
          select: {
            tag: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    })

    return article
  } catch (error) {
    console.error("Erro ao buscar o artigo:", error)
    throw new Error("Não foi possível carregar os dados do artigo.")
  }
}
