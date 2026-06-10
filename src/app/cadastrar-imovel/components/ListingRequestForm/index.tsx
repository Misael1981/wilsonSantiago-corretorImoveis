"use client"

import { saveListingRequest } from "@/app/actions/save-listing-request"
import MultiImageUpload from "@/app/admin/imoveis/cadastrar/[...id]/components/MultiImageUpload"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { TYPES_lABELS } from "@/constants/maps-enums"
import { PropertyType } from "@/generated/prisma"
import { formatArea } from "@/helpers/format-area"
import { formatCurrency } from "@/helpers/format-currency"
import { formatPhoneNumber } from "@/helpers/format-phone-number"
import {
  ListingRequestFormInput,
  listingRequestSchema,
} from "@/schemas/property-schema"
import { uploadMultipleImages } from "@/services/upload-images"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { useTransition } from "react"
import { Controller, useForm } from "react-hook-form"
import { toast } from "sonner"

const ListingRequestForm = () => {
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  const methods = useForm<ListingRequestFormInput>({
    resolver: zodResolver(listingRequestSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      city: "",
      type: PropertyType.CASA,
      title: "",
      description: "",
      price: "",
      area: "",
      imageUrls: [],
    },
  })

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = methods

  const onSubmit = async (data: ListingRequestFormInput) => {
    startTransition(async () => {
      try {
        const finalImageUrls = await uploadMultipleImages(data.imageUrls!)

        const dataToSave = listingRequestSchema.parse({
          ...data,
          imageUrls: finalImageUrls,
        })

        const response = await saveListingRequest(dataToSave)

        // 4. Trata a resposta caso o banco tenha falhado
        if (!response?.success) {
          toast.error(response?.error || "Erro ao salvar no banco, mano!")
          return
        }

        toast.success("Imóvel enviado com sucesso!")
        toast.success("Aguarde que um reposável entrará em contato!")
        router.push("/")
      } catch (error) {
        console.log("Erro ao cadastrar o imóvel.", error)
        toast.error("Erro ao cadastrar o imóvel, mano!")
      }
    })
  }

  return (
    <Card className="w-full max-w-5xl">
      <CardHeader>
        <CardTitle className="text-center text-2xl">
          Cadastrar seu Imóvel
        </CardTitle>
        <CardDescription className="text-center">
          Preencha os dados abaixo e entraremos em contato
        </CardDescription>
      </CardHeader>

      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent>
          <FieldGroup>
            <section className="space-y-4 lg:space-y-6">
              <h3 className="text-lg">Dados Pessoais</h3>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Field>
                  <FieldLabel>Nome Completo</FieldLabel>
                  <Input placeholder="Digite seu nome" {...register("name")} />
                  <FieldError>{errors.name?.message}</FieldError>
                </Field>

                <Field>
                  <FieldLabel>E-mail</FieldLabel>
                  <Input
                    placeholder="seuemail@email.com"
                    {...register("email")}
                  />
                  <FieldError>{errors.email?.message}</FieldError>
                </Field>

                <Field>
                  <FieldLabel>Telefone/WhatsApp</FieldLabel>
                  <Input
                    placeholder="(XX) XXXXX-XXXX"
                    {...register("phone")}
                    onChange={(e) => {
                      const formattedValue = formatPhoneNumber(e.target.value)

                      setValue("phone", formattedValue, {
                        shouldValidate: true,
                        shouldDirty: true,
                      })
                    }}
                  />
                  <FieldError>{errors.phone?.message}</FieldError>
                </Field>

                <Field>
                  <FieldLabel>Cidade</FieldLabel>
                  <Input placeholder="Ex: Pouso Alegre" {...register("city")} />
                  <FieldError>{errors.city?.message}</FieldError>
                </Field>
              </div>
            </section>

            <section className="space-y-4 lg:space-y-6">
              <h3 className="text-lg">Dados do Imóvel</h3>

              <div className="space-y-4">
                <div className="flex flex-col gap-4 lg:flex-row">
                  <Field>
                    <FieldLabel>Título do Anúncio</FieldLabel>
                    <Input
                      placeholder="Excelente casa com 3 quartos no centro"
                      {...register("title")}
                    />
                    <FieldError>{errors.title?.message}</FieldError>
                  </Field>

                  <div className="w-full lg:w-1/3">
                    <Controller
                      control={control}
                      name="type"
                      render={({ field }) => (
                        <Field>
                          <FieldLabel>Tipo do Imóvel</FieldLabel>
                          <Select
                            onValueChange={field.onChange}
                            value={field.value}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Selecione o Status" />
                            </SelectTrigger>
                            <SelectContent>
                              {Object.entries(TYPES_lABELS).map(
                                ([value, label]) => (
                                  <SelectItem key={value} value={value}>
                                    {label}
                                  </SelectItem>
                                ),
                              )}
                            </SelectContent>
                          </Select>
                        </Field>
                      )}
                    />
                  </div>
                </div>

                <Field>
                  <FieldLabel>Descrição do Imóvel</FieldLabel>
                  <Textarea
                    placeholder="Descreva detalhes do imóvel: localização, características, diferenciais, estado de conservação, etc."
                    {...register("description")}
                    maxLength={500}
                  />
                </Field>

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
                                cleanValue = inputValue.replace(
                                  / m²| m| $/g,
                                  "",
                                )
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
              </div>
            </section>

            <section>
              {/* Imagens dos Imóveis */}
              <Field>
                <FieldLabel>Imagens do Imóvel</FieldLabel>
                <MultiImageUpload
                  key={"novo-imovel"}
                  form={methods}
                  name="imageUrls"
                />
              </Field>
            </section>
          </FieldGroup>
        </CardContent>
        <CardFooter className="mt-6 flex justify-center">
          <Button
            type="submit"
            className="bg-gradient-wilson-blue w-full max-w-2xl text-white"
            disabled={isPending}
          >
            {isPending ? "Enviando..." : "Enviar Cadastro"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}

export default ListingRequestForm
