import FooterBlog from "@/components/FooterBlog"
import HeaderBlog from "@/components/HeaderBlog"
import { getArticlesForBlogSection } from "@/data/get-articles-for-blog-section"
import ArticleHero from "./components/ArticleHero"
import WelcomeBlogs from "./components/WelcomeBlogs"
import ArticleCard from "./components/ArticleCard"
import AnimatedContent from "@/components/AnimatedContent"

export default async function BlogPage() {
  const articles = await getArticlesForBlogSection()
  return (
    <div className="flex min-h-screen w-full flex-col justify-between">
      <HeaderBlog />
      <main className="w-full space-y-6 bg-[#f8f5ef]">
        <WelcomeBlogs />

        <ArticleHero article={articles[0]} />

        <AnimatedContent>
          <section className="boxed flex flex-wrap justify-between gap-4">
            {articles.map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </section>
        </AnimatedContent>
      </main>
      <FooterBlog />
    </div>
  )
}
