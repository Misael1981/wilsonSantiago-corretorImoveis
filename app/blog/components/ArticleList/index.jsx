import ArticleCard from "../ArticleCard"

const ArticleList = ({ articles }) => {
  const safeArticles = Array.isArray(articles) ? articles : []

  if (safeArticles.length === 0) {
    return (
      <div className="rounded-md border bg-[#f8f5ef] p-4 text-sm text-gray-800">
        Nenhum artigo encontrado. Tente ajustar a busca ou escolher outra seção.
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-5xl">
      <div className="grid gap-6 md:grid-cols-2">
        {safeArticles.map((a) => (
          <ArticleCard key={a.slug} article={a} />
        ))}
      </div>
    </div>
  )
}

export default ArticleList