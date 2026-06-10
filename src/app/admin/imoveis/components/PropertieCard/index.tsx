"use client"

import { deletePropertie } from "@/app/actions/delete-propertie"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  badgeClassForStatus,
  STATUS_LABELS,
  TYPES_lABELS,
} from "@/constants/maps-enums"
import { PropertyStatus, PropertyType } from "@/generated/prisma"
import { formatCurrency } from "@/helpers/format-currency"
import Link from "next/link"
import { useTransition } from "react"
import { toast } from "sonner"

type PropertieCardProps = {
  propertie: {
    id: string
    title: string
    codRef: number
    status: PropertyStatus
    type: PropertyType
    neighborhood: string
    city: string
    price: number
  }
}

const PropertieCard = ({ propertie }: PropertieCardProps) => {
  const [isPending, startTransition] = useTransition()

  const handleDelete = async () => {
    startTransition(async () => {
      try {
        const result = await deletePropertie(propertie.id)
        if (result.success) {
          toast.success("Imóvel deletado com sucesso!")
        }
      } catch (error) {
        console.log("Erro ao deletar o imóvel.", error)
        toast.error("Erro ao deletar o imóvel, mano!")
      }
    })
  }

  return (
    <Card>
      <CardHeader className="flex flex-col items-center justify-between gap-2 lg:flex-row-reverse">
        <div className="flex w-full justify-end lg:w-fit">
          <Badge variant="secondary">{propertie.codRef}</Badge>
        </div>
        <CardTitle>{propertie.title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex justify-end">
          <Badge
            className={`${badgeClassForStatus(propertie.status)} text-xs font-medium`}
          >
            {STATUS_LABELS[propertie.status] ?? propertie.status}
          </Badge>
        </div>
        <div className="flex justify-between">
          <div>
            <span className="text-base font-semibold">
              {TYPES_lABELS[propertie.type] ?? propertie.type}
            </span>
            <div>
              <span>
                {propertie.neighborhood} - {propertie.city}
              </span>
            </div>
          </div>
          <div className="self-end">
            <span className="text-lg font-semibold text-green-600">
              {formatCurrency(propertie.price)}
            </span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex items-center justify-between">
        <Button
          variant="destructive"
          onClick={handleDelete}
          disabled={isPending}
        >
          {isPending ? "Deletando..." : "Deletar Imóvel"}
        </Button>
        <Link
          href={`/admin/imoveis/cadastrar/${propertie.id}`}
          className="bg-gradient-wilson-blue rounded-lg px-4 py-2 text-sm text-white"
        >
          Editar Imóvel
        </Link>
      </CardFooter>
    </Card>
  )
}

export default PropertieCard
