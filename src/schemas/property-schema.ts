import { PropertyStatus, PropertyType } from "@/generated/prisma"
import z from "zod"

export const propertySchema = z
  .object({
    title: z.string().min(2, "O título é deve ter pelo menos 2 caracteres"),
    slug: z.string().min(2, "Campo obrigatório."),
    codRef: z.number().min(1, "Campo Obrigatório."),
    description: z.string().optional().or(z.literal("")),
    price: z.coerce.number().min(1, "O preço deve ser maior que zero"),
    area: z.coerce
      .number()
      .min(1, "A área deve ser maior que zero")
      .optional()
      .or(z.literal(0)),
    bedrooms: z.coerce.number().min(0, "Mínimo 0 quartos"),
    bathrooms: z.coerce.number().min(0, "Mínimo 0 banheiros"),
    garageSpaces: z.coerce.number().min(0, "Mínimo 0 vagas").default(0),

    type: z.enum(PropertyType).default("CASA"),
    status: z.enum(PropertyStatus).default("ACTIVE"),
    featured: z.boolean().default(false),

    street: z.string().optional(),
    number: z.string().optional(),
    complement: z.string().optional(),
    neighborhood: z.string().min(2, "Bairro obrigatório"),
    city: z.string().min(2, "Cidade obrigatória"),
    state: z.string().length(2, "Use a sigla do estado (ex: MG)"),

    imageUrls: z
      .array(z.string().url())
      .min(1, "Cadastre pelo menos 1 foto do imóvel"),
    youtubeUrl: z
      .string()
      .url("URL do YouTube inválida")
      .optional()
      .or(z.literal("")),
    videoFeatured: z.boolean().default(false),
  })
  .refine(
    (data) => {
      if (data.videoFeatured && !data.youtubeUrl) {
        return false
      }
      return true
    },
    {
      message:
        "Para destacar o vídeo na Home, você precisa preencher a URL do YouTube!",
      path: ["youtubeUrl"],
    },
  )

// Extrai a Tipagem automática do TypeScript com base no Schema do Zod
export type PropertyFormValues = z.infer<typeof propertySchema>
export type PropertyFormInput = z.input<typeof propertySchema>

export const listingRequestSchema = z.object({
  name: z.string().min(2, "O nome é deve ter pelo menos 2 caracteres"),
  email: z.string().email("E-mail inválido"),
  phone: z.string().min(2, "O telefone é deve ter pelo menos 2 caracteres"),

  city: z.string().min(2, "Cidade obrigatória"),

  title: z.string().min(2, "O título é deve ter pelo menos 2 caracteres"),
  type: z.enum(PropertyType).default("CASA"),
  description: z.string().optional().or(z.literal("")),
  price: z.coerce.number().min(1, "O preço deve ser maior que zero"),
  area: z.coerce
    .number()
    .min(1, "A área deve ser maior que zero")
    .optional()
    .or(z.literal(0)),

  imageUrls: z.array(z.string().url()).optional(),
})

export type ListingRequestFormValues = z.infer<typeof listingRequestSchema>
export type ListingRequestFormInput = z.input<typeof listingRequestSchema>

export const propertyRequestSchema = z.object({
  name: z.string().min(2, "O nome é deve ter pelo menos 2 caracteres"),
  phone: z.string().min(2, "O telefone é deve ter pelo menos 2 caracteres"),
  type: z.enum(PropertyType).default("CASA"),
  neighborhood: z.string().min(2, "Bairro obrigatório"),
  city: z.string().min(2, "Cidade obrigatória"),
  minPrice: z.coerce.number().min(1, "O preço deve ser maior que zero"),
  maxPrice: z.coerce.number().min(1, "O preço deve ser maior que zero"),
  description: z.string().optional().or(z.literal("")),
})

export type PropertyRequestFormValues = z.infer<typeof propertyRequestSchema>
export type PropertyRequestFormInput = z.input<typeof propertyRequestSchema>
