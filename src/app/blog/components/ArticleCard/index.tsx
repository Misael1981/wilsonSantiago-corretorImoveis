import { formatDate } from "@/helpers/format-date"

import Link from "next/link"

type ArticleCardProps = {
  article: {
    createdAt: Date
    title: string
    excerpt: string | null
    slug: string
    imageUrl: string | null
    readTime: number | null
    publishedAt: Date | null
    author: {
      name: string | null
    }
  }
}

const ArticleCard = ({ article }: ArticleCardProps) => {
  return (
    <div
      className="w-80 space-y-4 rounded-lg border bg-white p-4 font-semibold"
      style={{ fontFamily: "var(--font-playfair)" }}
    >
      <div className="space-y-2">
        <h2 style={{ fontFamily: "var(--font-playfair)" }}>
          <Link
            href={`/blog/${article.slug}`}
            className="line-clamp-2 text-xl font-bold text-gray-900 hover:underline"
            aria-label={`Ler artigo: ${article.title}`}
          >
            {article.title}
          </Link>
        </h2>
        <p className="text-xs font-light text-gray-600">
          Publicado em {formatDate(article.publishedAt!)}
        </p>
      </div>

      <div className="space-y-2">
        {article.excerpt && (
          <p className="line-clamp-2 text-sm text-gray-800">
            {article.excerpt}
          </p>
        )}
      </div>

      <div>
        <Link
          href={`/blog/${article.slug}`}
          className="text-sm font-semibold text-blue-700 hover:underline"
        >
          Leia mais
        </Link>
      </div>
    </div>
  )
}

export default ArticleCard
