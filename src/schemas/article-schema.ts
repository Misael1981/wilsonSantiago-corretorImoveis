import z from "zod"

export const articleSchema = z.object({
  title: z.string().min(2, "O título deve ter pelo menos 2 caracteres"),
  content: z.string().min(10, "O conteúdo deve ter pelo menos 10 caracteres"),
  excerpt: z.string().optional().or(z.literal("")),
  slug: z.string().min(2, "O slug deve ter pelo menos 2 caracteres"),
  imageUrl: z.union([z.string(), z.instanceof(File), z.null()]).optional(),
  published: z.boolean().default(false),
  featured: z.boolean().default(false),
  metaTitle: z.string().optional().or(z.literal("")),
  metaDescription: z.string().optional().or(z.literal("")),

  tags: z.string().optional(),
})

export type ArticleFormValues = z.infer<typeof articleSchema>
export type ArticleFormInput = z.input<typeof articleSchema>
export type ArticleFormOutput = z.output<typeof articleSchema>
