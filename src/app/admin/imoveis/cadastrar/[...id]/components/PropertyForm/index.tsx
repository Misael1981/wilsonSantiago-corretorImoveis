"use client"

import { PropertyFormValues, propertySchema } from "@/schemas/property-schema"
import { useForm, useWatch, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import z from "zod"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { useEffect, useTransition } from "react"
import { generateSlug } from "@/helpers/generate-slug"
import { Switch } from "@/components/ui/switch"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { STATUS_LABELS, TYPES_lABELS } from "@/constants/maps-enums"
import { Textarea } from "@/components/ui/textarea"
import { formatCurrency } from "@/helpers/format-currency"
import { formatArea } from "@/helpers/format-area"
import MultiImageUpload from "../MultiImageUpload"
import { CiYoutube } from "react-icons/ci"
import { Button } from "@/components/ui/button"
import { uploadMultipleImages } from "@/services/upload-images"
import { toast } from "sonner"
import { savePropertyAction } from "@/app/actions/save-property"
import { Bookmark } from "lucide-react"
import { useRouter } from "next/navigation"

type PropertyFormProps = {
  property?: PropertyFormValues
  propertyId?: string
}

export type PropertyFormInput = z.input<typeof propertySchema>

const PropertyForm = ({ property, propertyId }: PropertyFormProps) => {
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  const methods = useForm<PropertyFormInput>({
    resolver: zodResolver(propertySchema),
    defaultValues: {
      title: property?.title || "",
      slug: property?.slug || "",
      codRef: property?.codRef || 0,
      description: property?.description || "",

      price: property?.price || "",
      area: property?.area || "",
      bedrooms: property?.bedrooms || "",
      bathrooms: property?.bathrooms || "",
      garageSpaces: property?.garageSpaces || "",

      featured: property?.featured || false,
      type: property?.type || "CASA",
      status: property?.status || "ACTIVE",

      street: property?.street || "",
      number: property?.number || "",
      complement: property?.complement || "",
      neighborhood: property?.neighborhood || "",
      city: property?.city || "",
      state: property?.state || "",

      imageUrls: property?.imageUrls || [],
      youtubeUrl: property?.youtubeUrl || "",
      videoFeatured: property?.videoFeatured || false,
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

  const youtubeUrl = useWatch({
    control,
    name: "youtubeUrl",
  })

  useEffect(() => {
    if (!name) return

    const generatedSlug = generateSlug(name)
    methods.setValue("slug", generatedSlug, { shouldValidate: true })
  }, [name, methods])

  useEffect(() => {
    if (!youtubeUrl) {
      methods.setValue("videoFeatured", false)
    }
  }, [youtubeUrl, methods])

  const onSubmit = async (data: PropertyFormInput) => {
    startTransition(async () => {
      try {
        const finalImageUrls = await uploadMultipleImages(data.imageUrls)

        const dataToSave = propertySchema.parse({
          ...data,
          imageUrls: finalImageUrls,
        })

        await savePropertyAction(dataToSave, propertyId)
        toast.success("Imóvel salvo com sucesso!")
        router.push("/admin/imoveis")
      } catch (error) {
        console.log("Erro ao salvar o imóvel.", error)
        toast.error("Erro ao salvar o imóvel, mano!")
      }
    })
  }

  return (
    <Card>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent>
          <FieldGroup className="grid grid-cols-1 gap-6">
            {/* Seção Destacar Imóvel */}
            <div className="flex lg:justify-end">
              <div className="flex w-full flex-col items-end justify-end gap-3 rounded-xl border border-zinc-200 bg-zinc-50/50 p-5 shadow-sm transition-all hover:border-amber-200 hover:bg-amber-50/10 lg:max-w-md lg:self-end">
                <Controller
                  control={control}
                  name="featured"
                  render={({ field }) => (
                    <Field
                      orientation="horizontal"
                      className="w-full justify-between gap-4"
                    >
                      <FieldLabel className="font-semibold text-zinc-700">
                        Destacar Imóvel
                      </FieldLabel>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        className="shadow-sm data-[state=checked]:bg-amber-500 data-[state=unchecked]:bg-zinc-300"
                      />
                    </Field>
                  )}
                />
                <FieldDescription className="max-w-sm text-right text-xs leading-relaxed text-zinc-500">
                  Ao ativar, o imóvel ganha prioridade visual, aparecendo nos
                  carrosséis e áreas de maior destaque da sua vitrine.
                </FieldDescription>
              </div>
            </div>

            {/* Tipo e Status do Imóvel */}
            <div className="flex flex-col gap-4 lg:flex-row">
              {/* Tipo do imóvel */}
              <Controller
                control={control}
                name="status"
                render={({ field }) => (
                  <Field>
                    <FieldLabel>Status do Imóvel</FieldLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o tipo" />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.entries(STATUS_LABELS).map(([value, label]) => (
                          <SelectItem key={value} value={value}>
                            {label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </Field>
                )}
              />

              {/* Status do imóvel */}
              <Controller
                control={control}
                name="type"
                render={({ field }) => (
                  <Field>
                    <FieldLabel>Tipo do Imóvel</FieldLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o Status" />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.entries(TYPES_lABELS).map(([value, label]) => (
                          <SelectItem key={value} value={value}>
                            {label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </Field>
                )}
              />
            </div>

            {/* Título e CodRef */}
            <div className="flex flex-col gap-4 lg:flex-row">
              {/* Título */}
              <Field>
                <FieldLabel>Título do Imóvel</FieldLabel>
                <Input placeholder="Excelente casa..." {...register("title")} />
                <FieldError>{errors.title?.message}</FieldError>
              </Field>

              {/* Código de Referencia */}
              <Field className="lg:w-1/4">
                <FieldLabel>Código de Referência</FieldLabel>
                <Input
                  placeholder="Ex: 123456"
                  type="number"
                  {...register("codRef")}
                />
                <FieldError>{errors.codRef?.message}</FieldError>
              </Field>
            </div>

            {/* Slug */}
            <Field>
              <FieldLabel>Slug (Link para a página do imóvel)</FieldLabel>
              <Input
                placeholder="Ex: excelente-casa-no-centro"
                {...register("slug")}
              />
              <FieldError>{errors.slug?.message}</FieldError>
            </Field>

            {/* Descrição */}
            <Field>
              <FieldLabel>Descrição do Imóvel</FieldLabel>
              <Textarea {...register("description")} />
            </Field>

            {/* Preço e área */}
            <div className="flex flex-col gap-4 lg:flex-row">
              {/* Preço */}
              <Controller
                control={control}
                name="price"
                render={({ field }) => {
                  const numericValue =
                    typeof field.value === "number" ? field.value : 0

                  const displayedValue =
                    numericValue > 0 ? formatCurrency(numericValue) : ""

                  return (
                    <Field>
                      <FieldLabel>Preço do Imóvel</FieldLabel>
                      <Input
                        placeholder="R$ 0,00"
                        value={displayedValue}
                        onChange={(e) => {
                          const inputValue = e.target.value

                          const onlyDigits = inputValue.replace(/\D/g, "")

                          if (!onlyDigits) {
                            field.onChange(0)
                            return
                          }

                          const parsedNumber = parseFloat(onlyDigits) / 100
                          field.onChange(parsedNumber)
                        }}
                      />
                      <FieldError>{errors.price?.message}</FieldError>
                    </Field>
                  )
                }}
              />

              {/* Área */}
              <Controller
                control={control}
                name="area"
                render={({ field }) => {
                  const value = (field.value as string | number) ?? ""

                  return (
                    <Field>
                      <FieldLabel>Área do Imóvel</FieldLabel>
                      <Input
                        placeholder="Ex: 150 m²"
                        value={value}
                        onChange={(e) => {
                          const inputValue = e.target.value
                          const isDeleting =
                            (e.nativeEvent as InputEvent).inputType ===
                            "deleteContentBackward"
                          let cleanValue = inputValue
                          if (
                            isDeleting &&
                            (inputValue.endsWith(" m") ||
                              inputValue.endsWith(" "))
                          ) {
                            cleanValue = inputValue.replace(/ m²| m| $/g, "")
                          }

                          const onlyDigits = cleanValue.replace(/\D/g, "")

                          if (!onlyDigits) {
                            field.onChange("")
                            return
                          }

                          const formattedArea = formatArea(
                            onlyDigits,
                            isDeleting,
                          )

                          field.onChange(formattedArea)
                        }}
                      />
                    </Field>
                  )
                }}
              />
            </div>

            {/* Quartos, Banheiros e Garagens */}
            <div className="flex gap-2 lg:gap-6">
              {/* Quartos */}
              <Field>
                <FieldLabel>Quantidade de Quartos</FieldLabel>
                <Input
                  placeholder="Ex: 3"
                  type="number"
                  {...register("bedrooms")}
                />
                <FieldError>{errors.bedrooms?.message}</FieldError>
              </Field>

              {/* Banheiros */}
              <Field>
                <FieldLabel>Quantidade de Banheiros</FieldLabel>
                <Input
                  placeholder="Ex: 2"
                  type="number"
                  {...register("bathrooms")}
                />
                <FieldError>{errors.bathrooms?.message}</FieldError>
              </Field>

              {/* Garagens */}
              <Field>
                <FieldLabel>Garagem para Veículos</FieldLabel>
                <Input
                  placeholder="Ex: 2"
                  type="number"
                  {...register("garageSpaces")}
                />
                <FieldError>{errors.garageSpaces?.message}</FieldError>
              </Field>
            </div>

            {/* Endereço */}
            <div className="space-y-4">
              <div className="flex flex-col gap-4 lg:flex-row">
                {/* Rua e Número*/}
                <Field>
                  <FieldLabel>Rua</FieldLabel>
                  <Input
                    placeholder="Ex: Rua das Flores"
                    {...register("street")}
                  />
                </Field>

                <Field className="lg:w-1/4">
                  <FieldLabel>Número</FieldLabel>
                  <Input placeholder="Ex: 123" {...register("number")} />
                </Field>
              </div>
              {/* Complemento e Bairro */}
              <div className="flex flex-col gap-4 lg:flex-row">
                <Field>
                  <FieldLabel>Complemento</FieldLabel>
                  <Input
                    placeholder="Ex: Apto 101"
                    {...register("complement")}
                  />
                </Field>

                <Field>
                  <FieldLabel>Bairro</FieldLabel>
                  <Input
                    placeholder="Ex: Centro"
                    {...register("neighborhood")}
                  />
                </Field>
              </div>

              {/* Cidade e Estado */}
              <div className="flex flex-col gap-4 lg:flex-row">
                <Field>
                  <FieldLabel>Cidade</FieldLabel>
                  <Input placeholder="Ex: São Paulo" {...register("city")} />
                </Field>

                <Field className="lg:w-1/4">
                  <FieldLabel>Estado</FieldLabel>
                  <Input placeholder="Ex: SP" {...register("state")} />
                </Field>
              </div>
            </div>

            {/* Seção de Vídeo - Destaque Visual */}
            <div className="space-y-4 rounded-xl border border-red-100 bg-red-50/30 p-6 shadow-sm transition-all hover:bg-red-50/50">
              <div className="flex items-center gap-2 border-b border-red-100 pb-2 text-red-700">
                <CiYoutube className="h-5 w-5" />
                <h3 className="text-sm font-bold tracking-wider uppercase">
                  Mídia Digital & Vídeo
                </h3>
              </div>

              <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                <div className="lg:col-span-2">
                  <Field>
                    <FieldLabel className="text-red-900">
                      URL do Vídeo (YouTube)
                    </FieldLabel>
                    <FieldDescription className="text-amber-600/70">
                      Cole o link do vídeo de apresentação para habilitar o
                      destaque.
                    </FieldDescription>
                    <Input
                      placeholder="Ex: https://www.youtube.com/watch?v=..."
                      {...register("youtubeUrl")}
                      className="border-red-200 bg-white focus-visible:ring-red-500"
                    />
                    <FieldError>{errors.youtubeUrl?.message}</FieldError>
                  </Field>
                </div>

                <div
                  className={`flex flex-col justify-center rounded-lg border p-4 transition-all ${!youtubeUrl ? "border-zinc-200 bg-zinc-100/50 opacity-60" : "border-red-200 bg-white shadow-sm"}`}
                >
                  <Controller
                    control={control}
                    name="videoFeatured"
                    render={({ field }) => (
                      <Field
                        orientation="horizontal"
                        className="justify-between gap-4"
                      >
                        <FieldLabel
                          className={`font-semibold ${!youtubeUrl ? "text-zinc-400" : "text-red-700"}`}
                        >
                          Vídeo em Destaque
                        </FieldLabel>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          disabled={!youtubeUrl}
                          className="shadow-sm data-[state=checked]:bg-red-600"
                        />
                      </Field>
                    )}
                  />
                </div>
              </div>
            </div>

            {/* Imagens dos Imóveis */}
            <Field>
              <FieldLabel>Imagens do Imóvel</FieldLabel>
              <MultiImageUpload
                // A MÁGICA TÁ AQUI: Garante isolamento de estado do componente
                key={propertyId || "novo-imovel"}
                form={methods}
                name="imageUrls"
                initialUrls={property?.imageUrls}
              />
            </Field>
          </FieldGroup>
        </CardContent>
        <CardFooter className="mt-6 flex w-full justify-end">
          <Button
            type="submit"
            disabled={isPending}
            className="bg-gradient-wilson-blue rounded-lg px-4 py-2 text-sm text-white"
          >
            <Bookmark />
            {isPending ? "Salvando..." : "Salvar"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}

export default PropertyForm
