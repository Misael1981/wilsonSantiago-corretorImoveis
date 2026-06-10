import { db } from "@/lib/prisma"
import { notFound } from "next/navigation"
import { SidebarTrigger } from "@/components/ui/sidebar"
import ImoveisBreadcrumb from "../components/ImoveisBreadcrumb"
import { Card, CardContent, CardTitle } from "@/components/ui/card"
import GalleryImages from "./components/GalleryImages"
import { Badge } from "@/components/ui/badge"
import { BedDouble, CarFront, ChartArea, ShowerHead } from "lucide-react"
import { formatCurrency } from "@/helpers/format-currency"
import { FaWhatsapp } from "react-icons/fa"
import { Button } from "@/components/ui/button"

type PropertyDetailsProps = {
  params: Promise<{ slug: string }>
}

export default async function PropertyDetailsPage({
  params,
}: PropertyDetailsProps) {
  const resolvedParams = await params
  const slugOrId = resolvedParams.slug

  const property = await db.property.findFirst({
    where: {
      OR: [{ slug: slugOrId }, { id: slugOrId }],
    },
    select: {
      title: true,
      price: true,
      status: true,
      type: true,
      description: true,
      neighborhood: true,
      city: true,
      imageUrls: true,
      bathrooms: true,
      bedrooms: true,
      area: true,
      garageSpaces: true,
      codRef: true,
    },
  })

  if (!property) notFound()

  const galleryData = {
    property: {
      title: property.title,
      status: property.status,
      imageUrls: property.imageUrls,
    },
  }

  return (
    <div className="w-full">
      <header className="w-full space-y-4 bg-white py-4 shadow-lg">
        <div className="flex items-center gap-2">
          <SidebarTrigger />
          <ImoveisBreadcrumb propertyTitle={property.title} />
        </div>
      </header>
      <main className="flex w-full justify-center p-4">
        <Card className="w-full max-w-4xl">
          <CardContent className="space-y-4">
            <CardTitle className="text-center">{property.title}</CardTitle>
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:items-stretch">
              <GalleryImages {...galleryData} />
              <div className="flex h-full flex-col justify-between gap-4">
                <div className="space-y-4">
                  <div className="flex w-full justify-end">
                    <Badge className="bg-gradient-wilson-blue">
                      {property.codRef}
                    </Badge>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">
                      {property.city}, {property.neighborhood}
                    </span>
                  </div>
                  <div className="flex w-full flex-wrap items-center justify-center">
                    <ul className="align-center text-wilson-blue flex w-full flex-wrap justify-between gap-2 text-xs">
                      <li>
                        {property.bedrooms > 0 && (
                          <span className="flex items-center gap-1">
                            <BedDouble />
                            {property.bedrooms} quartos
                          </span>
                        )}
                      </li>
                      <li>
                        {property.bathrooms > 0 && (
                          <span className="flex items-center gap-1">
                            <ShowerHead />
                            {property.bathrooms} banheiros
                          </span>
                        )}
                      </li>
                      <li>
                        {property.garageSpaces > 0 && (
                          <span className="flex items-center gap-1">
                            <CarFront />
                            {property.garageSpaces} vagas
                          </span>
                        )}
                      </li>
                      <li>
                        {property.area! > 0 && (
                          <span className="flex items-center gap-1">
                            <ChartArea />
                            {property.area}m²
                          </span>
                        )}
                      </li>
                    </ul>
                  </div>
                  <div>
                    <span className="text-lg font-semibold text-gray-800">
                      Descrição
                    </span>
                    <p className="text-xs text-gray-600">
                      {property.description}
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex w-full justify-end text-xl font-bold text-green-600">
                    <p>{formatCurrency(property.price)}</p>
                  </div>
                  <Button className="w-full bg-green-600 text-white hover:bg-green-700">
                    <FaWhatsapp className="mr-2" />
                    Fale com o Corretor
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
