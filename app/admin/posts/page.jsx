import HeaderAdmin from "../components/HeaderAdmin"
import PostList from "./components/PostList"
import PostsFilter from "./components/PostsFilter"
import SubTitlePosts from "./components/SubTitlePosts"
import prisma from "@/lib/prisma"

export default async function Posts({ searchParams }) {
  const params = await searchParams

  const q = (params?.q || "").trim()
  const publishedParam = params?.published
  const publishedFilter =
    publishedParam === "true" ? true : publishedParam === "false" ? false : null

  const page = Number(params?.page) > 0 ? Number(params?.page) : 1
  const perPageRaw = Number(params?.perPage) > 0 ? Number(params?.perPage) : 12
  const perPage = Math.min(perPageRaw, 50) // limita para evitar consultas pesadas
  const skip = (page - 1) * perPage
  const take = perPage

  const where = {
    AND: [
      publishedFilter === null ? {} : { published: publishedFilter },
      q
        ? {
            OR: [
              { title: { contains: q, mode: "insensitive" } },
              { excerpt: { contains: q, mode: "insensitive" } },
              { content: { contains: q, mode: "insensitive" } },
            ],
          }
        : {},
    ],
  }

  const total = await prisma.article.count({ where })

  const posts = await prisma.article.findMany({
    where,
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      title: true,
      content: true,
      slug: true,
      imageUrl: true,
      excerpt: true,
      metaTitle: true,
      metaDescription: true,
      keywords: true,
      publishedAt: true,
      authorId: true,
      published: true,
      featured: true,
      createdAt: true,
    },
    skip,
    take,
  })

  return (
    <div>
      <HeaderAdmin label="Posts" />
      <SubTitlePosts />
      <PostsFilter />
      <PostList posts={posts} />
    </div>
  )
}
