import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import prisma from "@/lib/prisma"

const slugify = (s) =>
  String(s)
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")

async function ensureUniqueSlug(base) {
  let slug = slugify(base)
  if (!slug) slug = "post"
  let suffix = 1
  // tenta até achar um slug livre
  while (true) {
    const exists = await prisma.article.findUnique({ where: { slug } })
    if (!exists) return slug
    suffix += 1
    slug = `${slugify(base)}-${suffix}`
  }
}

export async function POST(req) {
  try {
    const session = await getServerSession(authOptions)
    if (!session || session.user?.role !== "ADMIN") {
      return new Response("Unauthorized", { status: 401 })
    }

    const body = await req.json()
    const {
      title,
      content,
      excerpt,
      imageUrl,
      published,
      featured,
      metaTitle,
      metaDescription,
      keywords,
      readTime,
      tags, // array de ids ou slugs
    } = body || {}

    if (!title || !content) {
      return new Response("Título e conteúdo são obrigatórios", { status: 400 })
    }

    const slug = await ensureUniqueSlug(title)
    const data = {
      title: String(title).trim(),
      content: String(content).trim(),
      excerpt: excerpt ? String(excerpt).trim() : null,
      slug,
      imageUrl: imageUrl ? String(imageUrl).trim() : null,
      published: !!published,
      featured: !!featured,
      readTime: typeof readTime === "number" ? readTime : null,
      metaTitle: metaTitle ? String(metaTitle).trim() : null,
      metaDescription: metaDescription ? String(metaDescription).trim() : null,
      keywords: Array.isArray(keywords)
        ? keywords.map((k) => String(k).trim()).filter(Boolean)
        : typeof keywords === "string"
        ? keywords
            .split(",")
            .map((k) => k.trim())
            .filter(Boolean)
        : [],
      publishedAt: published ? new Date() : null,
      authorId: session.user.id,
    }

    let tagIds = []
    if (Array.isArray(tags) && tags.length > 0) {
      const byId = await prisma.tag.findMany({
        where: { id: { in: tags } },
        select: { id: true },
      })
      const bySlug =
        byId.length < tags.length
          ? await prisma.tag.findMany({
              where: { slug: { in: tags } },
              select: { id: true },
            })
          : []
      const merged = [...byId, ...bySlug]
      const unique = Array.from(new Set(merged.map((t) => t.id)))
      tagIds = unique
    }

    const created = await prisma.article.create({
      data: {
        ...data,
        tags:
          tagIds.length > 0
            ? { create: tagIds.map((id) => ({ tagId: id })) }
            : undefined,
      },
      select: {
        id: true,
        title: true,
        slug: true,
        published: true,
        publishedAt: true,
        createdAt: true,
      },
    })

    return new Response(JSON.stringify(created), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    })
  } catch (err) {
    console.error("POST /api/articles error:", err)
    return new Response("Internal Server Error", { status: 500 })
  }
}