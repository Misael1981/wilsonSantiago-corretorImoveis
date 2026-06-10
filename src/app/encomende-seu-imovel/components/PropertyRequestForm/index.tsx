"use client"

import { savePropertyRequest } from "@/app/actions/save-property-request"
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
import { formatCurrency } from "@/helpers/format-currency"
import { formatPhoneNumber } from "@/helpers/format-phone-number"
import {
  PropertyRequestFormInput,
  propertyRequestSchema,
} from "@/schemas/property-schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { useTransition } from "react"
import { Controller, useForm } from "react-hook-form"
import { toast } from "sonner"

const PropertyRequestForm = () => {
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  const methods = useForm<PropertyRequestFormInput>({
    resolver: zodResolver(propertyRequestSchema),
    defaultValues: {
      name: "",
      phone: "",
      type: PropertyType.CASA,
      neighborhood: "",
      city: "",
      minPrice: "",
      maxPrice: "",
      description: "",
    },
  })

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = methods

  const onSubmit = async (data: PropertyRequestFormInput) => {
    startTransition(async () => {
      try {
        const response = await savePropertyRequest(
          data as Parameters<typeof savePropertyRequest>[0],
        )

        if (!response?.success) {
          toast.error(response?.error || "Erro ao enviar o pedido, mano!")
          return
        }

        toast.success("Pedido enviado com sucesso!")
        toast.success("Aguarde que um reposável entrará em contato!")
        router.push("/")
      } catch (error) {
        console.log("Erro ao enviar pedido.", error)
        toast.error("Erro ao enviar pedido, mano!")
      }
    })
  }

  return (
    <Card className="w-full max-w-5xl">
      <CardHeader>
        <CardTitle className="text-center text-2xl">
          Encomende seu Imóvel
        </CardTitle>
        <CardDescription className="text-center">
          Nos conte rapidamente o que você procura e nós retornamos com opções.
        </CardDescription>
      </CardHeader>

      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent>
          <FieldGroup className="space-y-4">
            <div className="flex flex-col gap-4 lg:flex-row">
              <Field>
                <FieldLabel>Nome Completo</FieldLabel>
                <Input placeholder="Digite seu nome" {...register("name")} />
                <FieldError>{errors.name?.message}</FieldError>
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
            </div>

            <div className="flex flex-col gap-4 lg:flex-row">
              <div className="flex flex-1 flex-col gap-4 lg:flex-row">
                <Field>
                  <FieldLabel>Bairro</FieldLabel>
                  <Input
                    placeholder="Ex: Centro"
                    {...register("neighborhood")}
                  />
                  <FieldError>{errors.neighborhood?.message}</FieldError>
                </Field>

                <Field>
                  <FieldLabel>Cidade</FieldLabel>
                  <Input placeholder="Ex: Pouso Alegre" {...register("city")} />
                  <FieldError>{errors.city?.message}</FieldError>
                </Field>
              </div>
              <Controller
                control={control}
                name="type"
                render={({ field }) => (
                  <Field className="lg:w-1/3">
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

            <div className="flex flex-col gap-4 lg:flex-row">
              <Controller
                control={control}
                name="minPrice"
                render={({ field }) => {
                  const numericValue =
                    typeof field.value === "number" ? field.value : 0

                  const displayedValue =
                    numericValue > 0 ? formatCurrency(numericValue) : ""

                  return (
                    <Field>
                      <FieldLabel>Preço mínimo do Imóvel (R$)</FieldLabel>
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
                      <FieldError>{errors.minPrice?.message}</FieldError>
                    </Field>
                  )
                }}
              />
              <Controller
                control={control}
                name="maxPrice"
                render={({ field }) => {
                  const numericValue =
                    typeof field.value === "number" ? field.value : 0

                  const displayedValue =
                    numericValue > 0 ? formatCurrency(numericValue) : ""

                  return (
                    <Field>
                      <FieldLabel>Preço máximo do Imóvel (R$)</FieldLabel>
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
                      <FieldError>{errors.maxPrice?.message}</FieldError>
                    </Field>
                  )
                }}
              />
            </div>

            <Field>
              <FieldLabel>Descreva o Imóvel Desejado</FieldLabel>
              <Textarea
                placeholder="Ex: número de quartos, área, proximidade com escolas..."
                {...register("description")}
                maxLength={500}
              />
            </Field>
          </FieldGroup>
        </CardContent>
        <CardFooter className="mt-6 flex justify-center">
          <Button
            type="submit"
            className="bg-gradient-wilson-blue w-full max-w-2xl text-white"
            disabled={isPending}
          >
            {isPending ? "Enviando..." : "Encomendar Imóvel"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  )
}

export default PropertyRequestForm
