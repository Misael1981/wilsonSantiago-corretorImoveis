import ArticleCard from "../ArticleCard"

type ListArticlesProps = {
  articles: {
    id: string
    title: string
    slug: string
    createdAt: Date
  }[]
}

const ListArticles = ({ articles }: ListArticlesProps) => {
  return (
    <section className="w-full space-y-4 pb-8">
      <div className="space-y-1">
        <h2 className="text-2xl font-semibold">Lista de Artigos</h2>
        <span className="text-md opacity-80">Total: {articles.length}</span>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {articles.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>
    </section>
  )
}

export default ListArticles
