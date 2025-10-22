import prisma from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

export async function PATCH(req, { params }) {
  try {
    const session = await getServerSession(authOptions)
    if (!session || session.user?.role !== "ADMIN") {
      return new Response("Unauthorized", { status: 401 })
    }

    const { id } = await params
    const exists = await prisma.article.findUnique({
      where: { id },
      select: { id: true, published: true, publishedAt: true },
    })
    if (!exists) {
      return new Response("Not found", { status: 404 })
    }

    const body = await req.json()
    const allowed = [
      "title",
      "content",
      "excerpt",
      "imageUrl",
      "published",
      "featured",
      "readTime",
      "metaTitle",
      "metaDescription",
      "keywords",
    ]
    const data = Object.fromEntries(
      Object.entries(body).filter(([k]) => allowed.includes(k))
    )

    if (typeof body.published === "boolean") {
      data.published = body.published
      data.publishedAt = body.published ? new Date() : null
    }
    if (Array.isArray(body.keywords)) {
      data.keywords = body.keywords.map((k) => String(k).trim()).filter(Boolean)
    } else if (typeof body.keywords === "string") {
      data.keywords = body.keywords
        .split(",")
        .map((k) => k.trim())
        .filter(Boolean)
    }

    const updated = await prisma.article.update({
      where: { id },
      data,
      select: {
        id: true,
        title: true,
        slug: true,
        published: true,
        featured: true,
        publishedAt: true,
        updatedAt: true,
      },
    })

    return new Response(JSON.stringify(updated), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    })
  } catch (err) {
    console.error("PATCH /api/articles/[id] error:", err)
    return new Response("Internal Server Error", { status: 500 })
  }
}

export async function DELETE(req, { params }) {
  try {
    const session = await getServerSession(authOptions)
    if (!session || session.user?.role !== "ADMIN") {
      return new Response("Unauthorized", { status: 401 })
    }

    const { id } = await params
    const exists = await prisma.article.findUnique({
      where: { id },
      select: { id: true },
    })
    if (!exists) {
      return new Response("Not found", { status: 404 })
    }

    await prisma.article.delete({ where: { id } })
    return new Response(null, { status: 204 })
  } catch (err) {
    console.error("DELETE /api/articles/[id] error:", err)
    return new Response("Internal Server Error", { status: 500 })
  }
}