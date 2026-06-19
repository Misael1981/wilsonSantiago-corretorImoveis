"use server"

import { db, Prisma } from "@/lib/prisma"
import { ArticleFormInput, articleSchema } from "@/schemas/article-schema"
import { redirect } from "next/navigation"
import { auth } from "@/lib/auth"

function calculateReadTime(htmlContent: string): number {
  const textPure = htmlContent.replace(/<[^>]*>/g, "")
  const wordsCount = textPure
    .trim()
    .split(/\s+/)
    .filter((word) => word.length > 0).length
  const minutes = Math.ceil(wordsCount / 200)
  return minutes > 0 ? minutes : 1
}

export async function saveArticleAction(
  formData: ArticleFormInput,
  articleId?: string | null,
) {
  const validatedFields = articleSchema.safeParse(formData)

  if (!validatedFields.success) {
    return {
      success: false,
      error: "Dados inválidos no formulário do artigo.",
      details: validatedFields.error.flatten().fieldErrors,
    }
  }

  const data = validatedFields.data

  try {
    const session = await auth()

    if (!session?.user?.id) {
      return {
        success: false,
        error: "Mano, você precisa estar logado para salvar artigos!",
      }
    }

    const currentAuthorId = session.user.id

    const existingArticle = await db.article.findFirst({
      where: {
        slug: data.slug,
        ...(articleId ? { NOT: { id: articleId } } : {}),
      },
    })

    if (existingArticle) {
      return {
        success: false,
        error:
          "Já existe um artigo com esse slug (URL). Tente mudar o título ou o slug manual.",
      }
    }

    const estimatedReadTime = calculateReadTime(data.content)

    const tagsString = data.tags || ""
    const tagsArray = tagsString
      .split(",")
      .map((tag) => tag.trim().toLowerCase())
      .filter((tag) => tag.length > 0)

    const tagsUpsertOperation = tagsArray.map((tagName) => ({
      tag: {
        connectOrCreate: {
          where: { name: tagName },
          create: {
            name: tagName,
          },
        },
      },
    }))

    if (articleId) {
      // ==========================================
      // MODO EDIÇÃO: Atualiza o artigo existente
      // ==========================================

      await db.articleTag.deleteMany({
        where: { articleId: articleId },
      })

      const updateData: Prisma.ArticleUpdateInput = {
        title: data.title,
        slug: data.slug,
        excerpt: data.excerpt || null,
        content: data.content,
        imageUrl:
          typeof data.imageUrl === "string" ? data.imageUrl || null : null,
        published: data.published,
        featured: data.featured,
        metaTitle: data.metaTitle || null,
        metaDescription: data.metaDescription || null,
        readTime: estimatedReadTime,
        publishedAt: data.published ? new Date() : null,

        tags: {
          create: tagsUpsertOperation,
        },
      }

      await db.article.update({
        where: { id: articleId },
        data: updateData,
      })
    } else {
      // ==========================================
      // MODO CADASTRO: Cria um novo artigo
      // ==========================================
      const createData: Prisma.ArticleCreateInput = {
        title: data.title,
        slug: data.slug,
        excerpt: data.excerpt || null,
        content: data.content,
        imageUrl:
          typeof data.imageUrl === "string" ? data.imageUrl || null : null,
        published: data.published,
        featured: data.featured,
        metaTitle: data.metaTitle || null,
        metaDescription: data.metaDescription || null,
        readTime: estimatedReadTime,
        publishedAt: data.published ? new Date() : null,

        author: {
          connect: { id: currentAuthorId },
        },

        tags: {
          create: tagsUpsertOperation,
        },
      }

      await db.article.create({
        data: createData,
      })
    }
  } catch (error) {
    console.error("Erro crítico na Server Action de Artigos:", error)
    return {
      success: false,
      error: "Erro interno ao salvar o artigo no banco Neon.",
    }
  }

  redirect("/admin/posts")
}
