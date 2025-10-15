export const dynamic = "force-dynamic"
import prisma from "@/lib/prisma"
import HeaderBlog from "./components/HeaderBlog"
import WelcomeBlogs from "./components/WelcomeBlogs"
import ArticleList from "./components/ArticleList"

export default async function BlogPage({ searchParams }) {
  const params = await searchParams // precisa do await agora

  const q = typeof params?.q === "string" ? params.q.trim() : ""
  const tag = typeof params?.tag === "string" ? params.tag.trim() : ""

  let posts = []
  try {
    posts = await prisma.article.findMany({
      orderBy: { publishedAt: "desc" },
      select: {
        id: true,
        title: true,
        excerpt: true,
        content: true,
        published: true,
        metaTitle: true,
        imageUrl: true,
        publishedAt: true,
        metaDescription: true,
        slug: true,
        keywords: true,
      },
    })
  } catch (error) {
    console.error("Error fetching posts:", error)
    posts = []
  }

  if (!posts.length) {
    return (
      <section className="boxed p-4">
        <h1 className="mb-2 text-2xl font-bold">Blog</h1>
        <p className="text-gray-600">Nenhuma publicação encontrada.</p>
      </section>
    )
  }

  const where = {
    published: true,
    ...(q
      ? {
          OR: [
            { title: { contains: q, mode: "insensitive" } },
            { excerpt: { contains: q, mode: "insensitive" } },
            { content: { contains: q, mode: "insensitive" } },
          ],
        }
      : {}),
    ...(tag
      ? {
          tags: { some: { tag: { slug: tag } } },
        }
      : {}),
  }

  const articles = await prisma.article.findMany({
    where,
    orderBy: [{ publishedAt: "desc" }, { createdAt: "desc" }],
    select: {
      title: true,
      slug: true,
      excerpt: true,
      imageUrl: true,
      readTime: true,
      publishedAt: true,
      createdAt: true,
      keywords: true,
    },
  })

  return (
    <>
      <HeaderBlog />
      <WelcomeBlogs />
      <section className="boxed p-4">
        <ArticleList articles={articles} />
      </section>
    </>
  )
}
