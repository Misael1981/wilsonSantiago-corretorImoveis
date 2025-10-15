import prisma from "@/lib/prisma"
import Link from "next/link"
import Image from "next/image"

function formatDateISO(d) {
  if (!d) return null
  try {
    return new Date(d).toISOString().slice(0, 10)
  } catch {
    return null
  }
}

export default async function ArticleHero() {
  let article = null

  try {
    article = await prisma.article.findFirst({
      where: { published: true, featured: true },
      orderBy: [{ publishedAt: "desc" }, { createdAt: "desc" }],
      select: {
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

    if (!article) {
      article = await prisma.article.findFirst({
        where: { published: true },
        orderBy: [{ publishedAt: "desc" }, { createdAt: "desc" }],
        select: {
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
    }
  } catch {
    article = null
  }

  if (!article) return null

  const date = formatDateISO(article.publishedAt || article.createdAt)
  const img = article.imageUrl || "/assets/casa.jpg"

  return (
    <section className="boxed p-4">
      <div className="overflow-hidden rounded-md border bg-[#f8f5ef]">
        <div className="grid gap-0 md:grid-cols-3">
          <div className="relative h-[280px] md:h-[360px] md:col-span-2">
            <Image
              src={img}
              alt={article.title}
              fill
              sizes="(min-width: 1024px) 66vw, 100vw"
              className="object-cover"
              priority
            />
          </div>
          <div className="p-6 md:p-8">
            <p className="text-xs uppercase tracking-[0.2em] text-gray-600">
              Em destaque
            </p>
            <h2
              style={{ fontFamily: "var(--font-playfair)" }}
              className="mt-2 text-3xl font-bold text-gray-900"
            >
              <Link href={`/blog/${article.slug}`} className="hover:underline">
                {article.title}
              </Link>
            </h2>
            <div className="mt-2 text-xs text-gray-700">
              {date ? `Publicado em ${date}` : "Publicado"}
              {typeof article.readTime === "number" ? ` • ${article.readTime} min` : ""}
              {article.author?.name ? ` • Por ${article.author.name}` : ""}
            </div>
            {article.excerpt && (
              <p className="mt-4 text-sm text-gray-800">{article.excerpt}</p>
            )}
            <div className="mt-4">
              <Link
                href={`/blog/${article.slug}`}
                className="inline-block rounded-md bg-blue-700 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-800"
              >
                Ler agora
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}