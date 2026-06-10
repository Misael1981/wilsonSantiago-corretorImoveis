import { getArticlesForBlogSection } from "@/data/get-articles-for-blog-section"
import SubTitle from "../SubTitle"
import ArticleCard from "./components/ArticleCard"

const BlogSection = async () => {
  const articles = await getArticlesForBlogSection()

  // Pegamos apenas os 4 primeiros artigos para preencher o mosaico perfeitamente
  const featuredArticles = articles.slice(0, 4)

  // Separamos os dois artigos que devem ficar empilhados no bloco do meio (índices 1 e 2)
  const middleArticles = featuredArticles.slice(1, 3)

  return (
    <section className="boxed space-y-4 pb-4 lg:space-y-6">
      <SubTitle title="Explore" />
      <h3 className="text-center text-lg font-bold text-slate-800 lg:text-2xl">
        Explore uma seleção de conteúdos que simplificam sua jornada de compra,
        venda ou manutenção dos seus imóveis
      </h3>

      {/* Container do Mosaico */}
      <div className="flex flex-wrap items-stretch justify-center gap-4">
        {/* 1º Card (Destaque da Esquerda - Índice 0) */}
        {featuredArticles[0] && <ArticleCard article={featuredArticles[0]} />}

        {/* Bloco do Meio (Empilha o 2º e o 3º Card - Índices 1 e 2) */}
        {middleArticles.length > 0 && (
          <div className="flex w-80 max-w-[90%] flex-col gap-4">
            {middleArticles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        )}

        {/* 4º Card (Destaque da Direita - Índice 3) */}
        {featuredArticles[3] && <ArticleCard article={featuredArticles[3]} />}
      </div>
    </section>
  )
}

export default BlogSection
