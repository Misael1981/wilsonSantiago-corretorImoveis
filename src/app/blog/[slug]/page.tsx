import { db } from "@/lib/prisma"
import { notFound } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Metadata } from "next"
import HeaderBlog from "@/components/HeaderBlog"
import { sanitizeContent } from "@/helpers/sanitize-content"

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params

  if (!slug) return { title: "Artigo não encontrado" }

  const meta = await db.article.findFirst({
    where: { slug, published: true },
    select: { title: true, metaTitle: true, metaDescription: true },
  })

  if (!meta) return { title: "Artigo não encontrado" }

  return {
    title: meta.metaTitle || `${meta.title} • Blog Wilson Corretor`,
    description: meta.metaDescription || `Leia mais sobre: ${meta.title}`,
  }
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params

  if (!slug) return notFound()

  const article = await db.article.findUnique({
    where: { slug, published: true },
    include: {
      tags: {
        include: {
          tag: true,
        },
      },
    },
  })

  if (!article || !article.published) return notFound()

  db.article
    .update({
      where: { id: article.id },
      data: { views: { increment: 1 } },
    })
    .catch((err) => console.error("Erro ao incrementar views:", err))

  const publishedDate = article.publishedAt || article.createdAt
  const formattedDate = publishedDate
    ? new Date(publishedDate).toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      })
    : null

  const heroImage = article.imageUrl || "/assets/casa.jpg"

  const tagList = article.tags?.map((t) => t.tag).filter(Boolean) || []

  return (
    <div>
      <HeaderBlog />
      <main className="min-h-screen bg-[#faf8f5]">
        {/* Seção Hero / Cabeçalho do Artigo */}
        <section className="boxed p-4 pt-6">
          <div className="overflow-hidden rounded-md border border-gray-200 bg-[#f8f5ef]">
            <div className="grid gap-0 md:grid-cols-3">
              {/* Foto de Capa do Artigo */}
              <div className="relative h-65 md:col-span-2 md:h-100">
                <Image
                  src={heroImage}
                  alt={article.title}
                  fill
                  sizes="(min-width: 1024px) 66vw, 100vw"
                  className="object-cover"
                  priority
                />
              </div>
              {/* Bloco de Informações Metas */}
              <div className="flex flex-col justify-between p-2">
                <div>
                  <p className="text-xs font-semibold tracking-[0.2em] text-blue-700 uppercase">
                    Artigo Exclusivo
                  </p>
                  <h1
                    style={{ fontFamily: "var(--font-playfair)" }}
                    className="mt-3 text-2xl leading-tight font-bold text-gray-900"
                  >
                    {article.title}
                  </h1>
                  <div className="mt-3 space-y-1 text-xs text-gray-600">
                    {formattedDate && <p>Publicado em {formattedDate}</p>}
                    {typeof article.readTime === "number" &&
                      article.readTime > 0 && (
                        <p>⏱️ Leitura de {article.readTime} min</p>
                      )}
                    <p>👤 Por Wilson Santiago</p>
                  </div>
                  {/* Listagem de Tags */}
                  {tagList.length > 0 && (
                    <ul className="mt-5 flex flex-wrap gap-2">
                      {tagList.map((t) => (
                        <li key={t.id}>
                          <span className="rounded-full border border-gray-300 bg-white px-3 py-1 text-[10px] font-medium tracking-wide text-gray-700 uppercase transition-colors hover:bg-gray-100">
                            {t.name}
                          </span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
                <div className="mt-2 border-t border-gray-200/60 pt-4">
                  <Link
                    href="/blog"
                    className="inline-flex items-center gap-1 text-sm font-semibold text-blue-700 hover:text-blue-800 hover:underline"
                  >
                    ← Voltar ao Blog
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Conteúdo do Artigo */}
        <section className="boxed p-4 pb-12">
          <article className="mx-auto max-w-4xl rounded-md border border-gray-200 bg-white p-6 shadow-sm md:p-10">
            <div
              className="prose prose-slate prose-headings:font-serif prose-headings:text-gray-900 prose-h1:text-3xl prose-h1:mb-4 prose-h2:text-xl prose-h2:mt-8 prose-h2:mb-3 prose-p:text-gray-700 prose-p:leading-relaxed prose-p:my-3 prose-ul:my-3 prose-li:my-1 prose-li:marker:text-gray-400 prose-a:text-blue-700 hover:prose-a:underline [&_p]:break-word max-w-none **:max-w-full"
              dangerouslySetInnerHTML={{
                __html: sanitizeContent(article.content),
              }}
            />
          </article>
        </section>
      </main>
    </div>
  )
}
