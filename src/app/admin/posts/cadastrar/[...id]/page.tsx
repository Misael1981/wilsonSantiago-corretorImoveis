import { getArticleById } from "@/data/get-article-by-id"
import ArticleForm, { ArticleFormProps } from "./components/ArticleForm"

interface ArticlesFormPageProps {
  params: Promise<{
    id?: string[]
  }>
}

export default async function ArticlesFormPage({
  params,
}: ArticlesFormPageProps) {
  const resolvedParams = await params
  const articleId = resolvedParams.id?.[0]
  const isEditMode = Boolean(articleId) && articleId !== "novo"

  let articleData: ArticleFormProps["article"] = undefined

  if (isEditMode && articleId) {
    const data = await getArticleById({
      id: articleId,
    })

    if (!data) {
      return (
        <div className="p-6 text-red-500">Artigo não encontrado, mano!</div>
      )
    }

    articleData = data as unknown as ArticleFormProps["article"]
  }

  return (
    <div className="px-4 pb-4 lg:px-8 lg:pb-8">
      <h1 className="mb-6 text-2xl font-bold">
        {isEditMode ? "Editar Artigo" : "Cadastrar Novo Artigo"}
      </h1>

      <ArticleForm article={articleData} />
    </div>
  )
}
