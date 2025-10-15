```
import prisma from "@/lib/prisma"
import { notFound } from "next/navigation"
import Link from "next/link"
import SectionBar from "../../components/SectionBar"
import ArticleList from "../../components/ArticleList"

export const revalidate = 600

export async function generateMetadata({ params }) {
  const { slug } = params ?? {}
  if (!slug) return { title: "Seção não encontrada" }

  try {
    const tag = await prisma.tag.findUnique({
      where: { slug },
      select: { name: true, description: true },
    })
    if (!tag) return { title: "Seção não encontrada" }

    return {
      title: `Seção: ${tag.name}`,
      description:
        tag.description ||
        `Artigos da seção ${tag.name}. Explore conteúdos atualizados do blog.`,
    }
  } catch {
    return { title: "Seção" }
  }
}

export default async function TagPage({ params, searchParams }) {
    const rawSlug = params?.slug
    const slug = typeof rawSlug === "string" ? decodeURIComponent(rawSlug) : ""
    if (!slug) return notFound()

    const page = Math.max(1, parseInt(searchParams?.page ?? "1", 10) || 1)
    const take = Math.max(1, Math.min(50, parseInt(searchParams?.pageSize ?? "12", 10) || 12))
    const skip = (page - 1) * take

    let dbHealthy = true
    let tag = null

    try {
      tag = await prisma.tag.findUnique({
        where: { slug },
        select: { id: true, name: true, slug: true, description: true },
      })
    } catch {
      dbHealthy = false
    }

    if (!dbHealthy) {
      return (
        <main>
          <SectionBar activeSlug={slug} />
          <section className="boxed p-4">
            <div className="rounded-md border bg-white p-6">
              <h1
                style={{ fontFamily: "var(--font-playfair)" }}
                className="text-2xl font-bold text-gray-900"
              >
                Seção
              </h1>
              <p className="mt-2 text-sm text-gray-600">
                Não foi possível carregar esta seção no momento. Tente novamente mais tarde.
              </p>
              <div className="mt-4">
                <Link
                  href="/blog"
                  className="text-sm font-semibold text-blue-700 hover:underline"
                >
                  Voltar ao Blog
                </Link>
              </div>
            </div>
          </section>
        </main>
      )
    }

    if (!tag) return notFound()

    let articles = []
    let total = 0

    try {
      const result = await Promise.all([
        prisma.article.findMany({
          where: {
            published: true,
            tags: { some: { tag: { slug } } },
          },
          orderBy: [{ publishedAt: "desc" }, { createdAt: "desc" }],
          skip,
          take,
          select: {
            id: true,
            title: true,
            excerpt: true,
            slug: true,
            imageUrl: true,
            readTime: true,
            keywords: true,
            publishedAt: true,
            createdAt: true,
          },
        }),
        prisma.article.count({
          where: {
            published: true,
            tags: { some: { tag: { slug } } },
          },
        }),
      ])
      articles = result[0]
      total = result[1]
    } catch {
      articles = []
      total = 0
    }

    const totalPages = Math.max(1, Math.ceil(total / take))

    return (
      <main>
        <SectionBar activeSlug={slug} />
        <section className="boxed p-4">
          <div className="rounded-md border bg-white p-6">
            <h1
              style={{ fontFamily: "var(--font-playfair)" }}
              className="text-2xl font-bold text-gray-900"
            >
              Seção: {tag.name}
            </h1>
            {tag.description && (
              <p className="mt-2 text-sm text-gray-600">{tag.description}</p>
            )}
            <div className="mt-4">
              <Link
                href="/blog"
                className="text-sm font-semibold text-blue-700 hover:underline"
              >
                Voltar ao Blog
              </Link>
            </div>
          </div>
        </section>

        <ArticleList articles={articles} />

        {/* Paginação */}
        <section className="boxed p-4">
          <div className="rounded-md border bg-white p-4">
            <div className="flex items-center justify-between">
              <Link
                href={`/blog/tag/${slug}?page=${Math.max(1, page - 1)}&pageSize=${take}`}
                className={[
                  "rounded-md border px-3 py-2 text-sm",
                  page <= 1
                    ? "pointer-events-none cursor-default opacity-50"
                    : "hover:bg-gray-50",
                ].join(" ")}
                aria-disabled={page <= 1}
              >
                ← Anteriores
              </Link>
              <span className="text-sm text-gray-600">
                Página {page} de {totalPages}
              </span>
              <Link
                href={`/blog/tag/${slug}?page=${Math.min(totalPages, page + 1)}&pageSize=${take}`}
                className={[
                  "rounded-md border px-3 py-2 text-sm",
                  page >= totalPages
                    ? "pointer-events-none cursor-default opacity-50"
                    : "hover:bg-gray-50",
                ].join(" ")}
                aria-disabled={page >= totalPages}
              >
                Próximos →
              </Link>
            </div>
          </div>
        </section>
      </main>
    )
}
```
