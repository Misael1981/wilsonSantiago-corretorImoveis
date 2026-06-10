"use client"

import ImageUpload from "@/components/ImageUpload"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea" // Importando Textarea para o resumo e metadescrição
import { Switch } from "@/components/ui/switch" // Importando Switch para booleans
import { generateSlug } from "@/helpers/generate-slug"
import { ArticleFormInput, articleSchema } from "@/schemas/article-schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect, useTransition } from "react"
import { Controller, useForm, useWatch } from "react-hook-form"
import ReactQuill from "react-quill-new"
import "react-quill-new/dist/quill.snow.css"
import { saveArticleAction } from "@/app/actions/save-article"
import { toast } from "sonner"
import { uploadToCloudinaryClient } from "@/services/upload-images"
import { isRedirectError } from "next/dist/client/components/redirect-error"

export type ArticleFormProps = {
  article?: {
    id: string
    title: string
    slug: string
    excerpt: string | null
    content: string
    imageUrl: string | null
    published: boolean
    featured: boolean
    metaTitle: string | null
    metaDescription: string | null
    tags: {
      tag: {
        name: string
      }
    }[]
  }
}

const ArticleForm = ({ article }: ArticleFormProps) => {
  const [isPending, startTransition] = useTransition()

  const methods = useForm<ArticleFormInput>({
    resolver: zodResolver(articleSchema),
    defaultValues: {
      title: article?.title || "",
      slug: article?.slug || "",
      excerpt: article?.excerpt || "",
      content: article?.content || "",
      imageUrl: article?.imageUrl || "",
      published: article?.published || false,
      featured: article?.featured || false,
      tags: article?.tags ? article.tags.map((t) => t.tag.name).join(", ") : "",
      metaTitle: article?.metaTitle || "",
      metaDescription: article?.metaDescription || "",
    },
  })

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = methods

  const name = useWatch({
    control,
    name: "title",
  })

  useEffect(() => {
    if (!name) return

    const generatedSlug = generateSlug(name)
    methods.setValue("slug", generatedSlug, { shouldValidate: true })
  }, [name, methods])

  const onSubmit = async (data: ArticleFormInput) => {
    startTransition(async () => {
      try {
        let imageUrl = data.imageUrl

        if (data.imageUrl && typeof data.imageUrl !== "string") {
          const uploaded = await uploadToCloudinaryClient(data.imageUrl as File)
          imageUrl = uploaded.url
        }

        const result = await saveArticleAction(
          { ...data, imageUrl: imageUrl as string },
          article?.id,
        )

        if (result.success) {
          toast.success("Artigo salvo com sucesso!")
        } else {
          toast.error("Ocorreu um erro ao salvar o artigo.")
        }
      } catch (error) {
        if (isRedirectError(error)) throw error
        console.error(error)
        toast.error("Ocorreu um erro inesperado ao salvar o artigo.")
      }
    })
  }

  return (
    <Card className="mx-auto w-full max-w-4xl">
      <form
        onSubmit={handleSubmit(
          (data) => onSubmit(data),
          (errors) => console.log("⚠️ Campos com erro no Zod:", errors), // 👈 ADICIONE ISSO
        )}
        className="space-y-6"
      >
        <CardContent className="pt-6">
          <FieldGroup className="grid grid-cols-1 gap-6">
            {/* Título do Artigo */}
            <Field>
              <FieldLabel>Título do Artigo</FieldLabel>
              <Input
                {...register("title")}
                placeholder="Digite o título do artigo"
              />
              <FieldError>{errors.title?.message}</FieldError>
            </Field>

            {/* Slug */}
            <Field>
              <FieldLabel>Slug (Link amigável para a página)</FieldLabel>
              <Input
                placeholder="Ex: as-vantagens-de-morar-no-centro"
                {...register("slug")}
              />
              <FieldError>{errors.slug?.message}</FieldError>
            </Field>

            {/* NOVO: Resumo / Excerpt */}
            <Field>
              <FieldLabel>
                Resumo do Post (Aparece na listagem principal)
              </FieldLabel>
              <Textarea
                {...register("excerpt")}
                placeholder="Uma breve introdução para chamar a atenção do leitor..."
                rows={3}
              />
              <FieldError>{errors.excerpt?.message}</FieldError>
            </Field>

            {/* Conteúdo do Artigo */}
            <Field>
              <FieldLabel>Conteúdo do Artigo</FieldLabel>
              <Controller
                name="content"
                control={control}
                render={({ field }) => (
                  <div className="overflow-hidden rounded-lg border bg-white">
                    <ReactQuill
                      theme="snow"
                      value={field.value}
                      onChange={field.onChange}
                      className="min-h-60"
                    />
                  </div>
                )}
              />
              <FieldError>{errors.content?.message}</FieldError>
            </Field>

            {/* Imagem do Artigo */}
            <Field>
              <FieldLabel>Imagem de Capa do Artigo</FieldLabel>
              <ImageUpload
                form={methods}
                name="imageUrl"
                initialUrl={article?.imageUrl}
              />
              <FieldError>{errors.imageUrl?.message as string}</FieldError>
            </Field>

            {/* NOVO: Switches de Configuração (Lado a Lado) */}
            <div className="flex flex-col gap-6 rounded-xl border bg-slate-50 p-4 sm:flex-row">
              <Field className="flex items-center gap-3 space-y-0">
                <Controller
                  name="published"
                  control={control}
                  render={({ field }) => (
                    <Switch
                      id="published"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  )}
                />
                <div>
                  <FieldLabel htmlFor="published" className="cursor-pointer">
                    Publicar Artigo
                  </FieldLabel>
                  <p className="text-muted-foreground text-xs">
                    Tornar este post visível para todos os clientes.
                  </p>
                </div>
              </Field>

              <Field className="flex items-center gap-3 space-y-0">
                <Controller
                  name="featured"
                  control={control}
                  render={({ field }) => (
                    <Switch
                      id="featured"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  )}
                />
                <div>
                  <FieldLabel htmlFor="featured" className="cursor-pointer">
                    Artigo em Destaque
                  </FieldLabel>
                  <p className="text-muted-foreground text-xs">
                    Exibir no topo ou na seção principal do blog.
                  </p>
                </div>
              </Field>
            </div>

            {/* Tags */}
            <Field>
              <FieldLabel>Tags (separadas por vírgula)</FieldLabel>
              <Input
                placeholder="Ex: mercado-imobiliario, congonhal, dicas"
                {...register("tags")}
              />
              <FieldError>{errors.tags?.message}</FieldError>
            </Field>

            <hr className="my-2" />
            <h3 className="-mb-2 text-sm font-semibold text-slate-700">
              ⚙️ Configurações de SEO (Google)
            </h3>

            {/* Meta Title */}
            <Field>
              <FieldLabel>Meta Title (Título Aba do Navegador)</FieldLabel>
              <Input
                {...register("metaTitle")}
                placeholder="Deixe em branco para usar o título original"
              />
              <FieldError>{errors.metaTitle?.message}</FieldError>
            </Field>

            {/* Meta Description */}
            <Field>
              <FieldLabel>
                Meta Description (Resumo exibido no Google)
              </FieldLabel>
              <Textarea
                {...register("metaDescription")}
                placeholder="Texto curto e objetivo para ranqueamento de busca..."
                rows={2}
              />
              <FieldError>{errors.metaDescription?.message}</FieldError>
            </Field>
          </FieldGroup>
        </CardContent>
        <CardFooter className="flex justify-center border-t bg-slate-50 p-4">
          <Button
            type="submit"
            disabled={isPending}
            className="bg-gradient-wilson-blue w-full max-w-xl"
          >
            {isPending ? "Salvando Artigo..." : "Salvar Artigo"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}

export default ArticleForm
