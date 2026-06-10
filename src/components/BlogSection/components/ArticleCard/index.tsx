import Link from "next/link"

type ArticleCardProps = {
  article: {
    id: string
    title: string
    excerpt: string | null
    slug: string
    imageUrl: string | null
  }
}

const ArticleCard = ({ article }: ArticleCardProps) => {
  return (
    <Link
      href={`/blog/${article.slug}`}
      className="group max-[90%] relative min-h-52 w-80 overflow-hidden rounded-sm transition-transform hover:scale-105"
    >
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${article.imageUrl || "/assets/casa.jpg"})`,
        }}
      >
        <div className="absolute inset-0 bg-black/50 transition-colors group-hover:bg-black/40" />
        <div className="relative z-10 flex h-full flex-col justify-end p-6 text-white">
          <h4 className="mb-2 text-xl leading-tight font-bold">
            {article.title || "Sem artigos disponíveis"}
          </h4>
          <p className="line-clamp-3 text-sm text-gray-200">
            {article.excerpt || "Visite o Blog para novidades."}
          </p>
        </div>
      </div>
    </Link>
  )
}

export default ArticleCard
