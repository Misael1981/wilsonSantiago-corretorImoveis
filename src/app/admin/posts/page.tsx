import HeaderAdmin from "@/components/HeaderAdmin"
import SectionTitleAdmin from "@/components/SectionTitleAdmin"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import SearchPosts from "./components/SearchPosts"
import { getPostsForAdmin } from "@/data/get-posts-for-admin"
import ListArticles from "./components/ListArticles"

export default async function AdminPostsPage() {
  const posts = await getPostsForAdmin()

  return (
    <div className="mx-auto max-w-6xl space-y-6 px-4">
      <HeaderAdmin label="Posts" />

      <SectionTitleAdmin
        label="Gerenciar Posts"
        description="Gerencie posts do blog, cadastre novos posts e edite os existentes"
        actionButton={
          <Link href="/admin/posts/cadastrar/novo">
            <Button className="bg-gradient-wilson-blue px-6 py-4 text-lg text-white">
              + Novo Post
            </Button>
          </Link>
        }
      />

      <SearchPosts />

      <ListArticles articles={posts} />
    </div>
  )
}
