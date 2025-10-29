// importações e configurações do módulo
import prisma from "@/lib/prisma"
import { notFound, redirect } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { BedDouble, CarFront, ChartArea, ShowerHead } from "lucide-react"
import { Button } from "@/components/ui/button"
import { FaWhatsapp } from "react-icons/fa"
import GalleryImages from "./components/GalleryImages"
import { formatBRL } from "@/lib/utils"
import CodRefBadge from "@/components/CodRefBadge"

export async function generateMetadata({ params }) {
  const p = await params
  const { slugOrId } = p
  // Blindagem contra erro de conexão no deploy
  try {
    const property = await prisma.property.findFirst({
      where: { OR: [{ id: slugOrId }, { slug: slugOrId }] },
      select: { title: true, metaTitle: true, metaDescription: true },
    })
    if (!property) {
      return { title: "Imóvel não encontrado" }
    }
    return {
      title: property.metaTitle || property.title,
      description:
        property.metaDescription || `Detalhes do imóvel: ${property.title}`,
    }
  } catch (e) {
    return { title: "Detalhes do Imóvel" }
  }
}

export default async function PropertyDetails({ params }) {
  const p = await params
  const { slugOrId } = p

  // Buscar por id OU slug
  const property = await prisma.property.findFirst({
    where: { OR: [{ id: slugOrId }, { slug: slugOrId }] },
  })

  if (!property) {
    return notFound()
  }

  // Se veio por ID mas existe slug, redireciona para a URL canônica com slug
  if (property.slug && slugOrId === property.id) {
    redirect(`/imoveis/${property.slug}`)
  }

  // Incrementa visualizações
  await prisma.property.update({
    where: { id: property.id },
    data: { views: { increment: 1 } },
  })

  // Removido formatBRL local; usamos helper compartilhado

  return (
    <div className="boxed p-4">
      <Card className="p-0">
        <CardContent className="p-4">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:items-stretch">
            {/* Galeria principal */}
            <GalleryImages property={property} />
            {/* Informações */}
            <div className="flex h-full flex-col justify-between gap-4">
              <div className="flex justify-end">
                <CodRefBadge codRef={property.codRef} />
              </div>
              <h1 className="text-wilson-blue text-2xl font-bold">
                {property.title}
              </h1>
              <p className="text-sm text-gray-600">
                {property.city}, {property.neighborhood}
              </p>
              <div className="text-xl font-bold text-green-600">
                {formatBRL(property.price)}
              </div>
              <ul className="text-wilson-blue flex flex-wrap justify-between gap-3 text-sm">
                {property.bedrooms != null && (
                  <li className="flex items-center gap-2">
                    <BedDouble /> {property.bedrooms} quartos
                  </li>
                )}
                {property.bathrooms != null && (
                  <li className="flex items-center gap-2">
                    <ShowerHead /> {property.bathrooms} banheiros
                  </li>
                )}
                {property.garageSpaces != null && (
                  <li className="flex items-center gap-2">
                    <CarFront /> {property.garageSpaces} vagas
                  </li>
                )}
                {property.area != null && (
                  <li className="flex items-center gap-2">
                    <ChartArea /> {property.area} m²
                  </li>
                )}
              </ul>
              <div>
                <h2 className="text-lg font-semibold text-gray-800">
                  Descrição
                </h2>
                <p className="text-xs text-gray-600">{property.description}</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800">
                  Endereço
                </h3>
                <p className="text-sm text-gray-600">
                  {property.address} {property.number ? `, ${property.number}` : ""} {property.complement ? ` - ${property.complement}` : ""}
                </p>
                <p className="text-xs text-gray-500">
                  CEP: {property.zipCode || "N/A"} - {property.state}
                </p>
              </div>
              <div>
                <Button
                  className="w-full bg-green-600 text-white hover:bg-green-700"
                  variant="outline"
                >
                  <FaWhatsapp className="mr-2" />
                  Fale com o Corretor
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
export const dynamic = "force-dynamic"
