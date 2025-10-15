import Link from "next/link"

function formatDateISO(d) {
  if (!d) return null
  try {
    return new Date(d).toISOString().slice(0, 10) // YYYY-MM-DD, determinístico
  } catch {
    return null
  }
}

const ArticleCard = ({ article }) => {
  const {
    title,
    slug,
    excerpt,
    readTime,
    publishedAt,
    createdAt,
    keywords,
  } = article || {}

  const date = formatDateISO(publishedAt || createdAt)

  return (
    <article className="border-b border-gray-200 py-6">
      <header>
        <h2 style={{ fontFamily: "var(--font-playfair)" }}>
          <Link
            href={`/blog/${slug}`}
            className="text-2xl font-bold text-gray-900 hover:underline"
            aria-label={`Ler artigo: ${title}`}
          >
            {title}
          </Link>
        </h2>
        <div className="mt-1 text-xs uppercase tracking-wide text-gray-600">
          {date ? `Publicado em ${date}` : "Publicado"}
          {typeof readTime === "number" ? ` • ${readTime} min` : ""}
        </div>
      </header>

      {excerpt && (
        <p className="mt-3 text-sm text-gray-800">{excerpt}</p>
      )}

      {Array.isArray(keywords) && keywords.length > 0 && (
        <ul className="mt-3 flex flex-wrap gap-2">
          {keywords.map((k) => (
            <li key={k}>
              <span className="rounded-full border border-gray-300 px-2 py-0.5 text-[10px] uppercase tracking-wide text-gray-700">
                {k}
              </span>
            </li>
          ))}
        </ul>
      )}

      <div className="mt-3">
        <Link
          href={`/blog/${slug}`}
          className="text-sm font-semibold text-blue-700 hover:underline"
        >
          Leia mais
        </Link>
      </div>
    </article>
  )
}

export default ArticleCard