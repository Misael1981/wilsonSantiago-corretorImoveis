import AnimatedContent from "@/components/AnimatedContent"
import { Button } from "@/components/ui/button"
import { formatDate } from "@/helpers/format-date"
import Image from "next/image"
import Link from "next/link"

type ArticleHeroProps = {
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

const ArticleHero = ({ article }: ArticleHeroProps) => {
  return (
    <AnimatedContent>
      <section className="boxed w-full">
        <div className="flex w-full flex-col justify-between gap-4 rounded-md border md:flex-row">
          <div className="md:aspect-ratio-[4/3] relative h-100 w-full md:w-2/3">
            <Image
              src={article.imageUrl!}
              alt={article.title}
              fill
              sizes="(min-width: 768px) 66vw, 100vw"
              className="rounded-md object-cover"
              priority
            />
          </div>
          <div className="p-6 md:p-8 lg:w-1/3">
            <p className="text-xs tracking-[0.2em] text-gray-600 uppercase">
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
              <span>{formatDate(article.createdAt)}</span>
              <span>
                {article.author?.name ? ` • Por ${article.author.name}` : ""}
              </span>
            </div>
            {article.excerpt && (
              <p className="mt-4 text-sm text-gray-800">{article.excerpt}</p>
            )}
            <div className="mt-4">
              <Link href={`/blog/${article.slug}`}>
                <Button className="w-full">Ler mais</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </AnimatedContent>
  )
}

export default ArticleHero
