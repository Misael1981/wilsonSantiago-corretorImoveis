import prisma from "@/lib/prisma"
import { notFound } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { unified } from "unified"
import remarkParse from "remark-parse"
import remarkGfm from "remark-gfm"
import remarkBreaks from "remark-breaks"
import remarkRehype from "remark-rehype"
import rehypeSanitize from "rehype-sanitize"
import rehypeStringify from "rehype-stringify"

function formatDateISO(d) {
  if (!d) return null
  try {
    return new Date(d).toISOString().slice(0, 10)
  } catch {
    return null
  }
}

export async function generateMetadata({ params }) {
  const p = await params
  const { slug } = p ?? {}
  if (!slug) return { title: "Artigo não encontrado" }

  const meta = await prisma.article.findFirst({
    where: { slug, published: true },
    select: { title: true, metaTitle: true, metaDescription: true },
  })

  if (!meta) return { title: "Artigo não encontrado" }
  return {
    title: meta.metaTitle || meta.title,
    description: meta.metaDescription || meta.title,
  }
}

export default async function ArticleDetail({ params }) {
  const p = await params
  const { slug } = p ?? {}
  if (!slug) return notFound()

  const article = await prisma.article.findUnique({
    where: { slug, published: true },
    include: {
      author: { select: { name: true } },
      tags: { include: { tag: true } },
    },
  })

  if (!article || !article.published) return notFound()

  // Incrementa visualizações do artigo
  await prisma.article.update({
    where: { id: article.id },
    data: { views: { increment: 1 } },
  })

  const date = formatDateISO(article.publishedAt || article.createdAt)
  const img = article.imageUrl || "/assets/casa.jpg"
  const tagList = Array.isArray(article.tags)
    ? article.tags.map((t) => t.tag).filter(Boolean)
    : []

  const htmlContent = await markdownToHtml(stripIndent(article.content))

  return (
    <main>
      {/* Hero */}
      <section className="boxed p-4">
        <div className="overflow-hidden rounded-md border bg-[#f8f5ef]">
          <div className="grid gap-0 md:grid-cols-3">
            <div className="relative h-[260px] md:col-span-2 md:h-[360px]">
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
              <p className="text-xs tracking-[0.2em] text-gray-600 uppercase">
                Artigo
              </p>
              <h1
                style={{ fontFamily: "var(--font-playfair)" }}
                className="mt-2 text-3xl font-bold text-gray-900"
              >
                {article.title}
              </h1>
              <div className="mt-2 text-xs text-gray-700">
                {date ? `Publicado em ${date}` : "Publicado"}
                {typeof article.readTime === "number"
                  ? ` • ${article.readTime} min`
                  : ""}
                {article.author?.name ? ` • Por ${article.author.name}` : ""}
              </div>

              {/* Tags */}
              {tagList.length > 0 && (
                <ul className="mt-4 flex flex-wrap gap-2">
                  {tagList.map((t) => (
                    <li key={t.slug}>
                      <Link
                        href={`/blog?tag=${t.slug}`}
                        className="rounded-full border border-gray-300 px-2 py-0.5 text-[10px] tracking-wide text-gray-700 uppercase hover:bg-gray-100"
                      >
                        {t.name}
                      </Link>
                    </li>
                  ))}
                </ul>
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
          </div>
        </div>
      </section>

      {/* Conteúdo */}
      <section className="boxed p-4">
        <article className="rounded-md border bg-white p-6">
          {/* Conteúdo editorial com styled-components isolado em Client Component */}
          <ArticleContentStyled html={htmlContent} />
        </article>
      </section>
    </main>
  )
}

import ArticleContentStyled from "./components/ArticleContentStyled"

async function markdownToHtml(markdown) {
  const file = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkBreaks)
    .use(remarkRehype)
    .use(rehypeSanitize)
    .use(rehypeStringify)
    .process(markdown || "")
  return String(file)
}

function stripIndent(str) {
  if (!str) return ""
  const lines = String(str).replace(/\r\n/g, "\n").split("\n")
  const indents = lines
    .slice(1)
    .filter((l) => l.trim().length)
    .map((l) => (l.match(/^[ \t]*/)?.[0] || "").length)
  const minIndent = indents.length > 0 ? Math.min(...indents) : 0
  return lines.map((l, i) => (i === 0 ? l : l.slice(minIndent))).join("\n")
}
