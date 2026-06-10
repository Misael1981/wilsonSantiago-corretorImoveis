"use client"

import { deletePost } from "@/app/actions/delete-post"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import Link from "next/link"
import { useTransition } from "react"
import { toast } from "sonner"

type ArticleCardProps = {
  article: {
    id: string
    title: string
    slug: string
    createdAt: Date
  }
}

const ArticleCard = ({ article }: ArticleCardProps) => {
  const [isPending, startTransition] = useTransition()

  const handleDelete = async () => {
    startTransition(async () => {
      try {
        const result = await deletePost(article.id)
        if (result.success) {
          toast.success("Artigo deletado com sucesso!")
        }
      } catch (error) {
        console.log("Erro ao deletar o artigo.", error)
        toast.error("Erro ao deletar o artigo, mano!")
      }
    })
  }

  return (
    <Card className="flex-col justify-between md:w-85">
      <CardContent>
        <h3 className="text-lg font-semibold">{article.title}</h3>
        <p className="text-muted-foreground text-sm">
          Criado em: {new Date(article.createdAt).toLocaleDateString()}
        </p>
      </CardContent>

      <CardFooter className="flex justify-between gap-4">
        <Button
          variant="destructive"
          disabled={isPending}
          onClick={handleDelete}
        >
          {isPending ? "Deletando..." : "Deletar Artigo"}
        </Button>

        <Link
          href={`/admin/posts/cadastrar/${article.id}`}
          className="bg-gradient-wilson-blue rounded-lg px-4 py-2 text-sm text-white"
        >
          Editar Artigo
        </Link>
      </CardFooter>
    </Card>
  )
}

export default ArticleCard
