import AnimatedContent from "@/components/AnimatedContent"
import StatusBadge from "@/components/StatusBadge"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { PropertyStatus, PropertyType } from "@/generated/prisma"
import { formatCurrency } from "@/helpers/format-currency"
import { BedDouble, CarFront, ChartArea, Heart, ShowerHead } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

type PropertyCardProps = {
  property: {
    id: string
    createdAt: Date
    slug: string | null
    title: string
    type: PropertyType
    status: PropertyStatus
    codRef: number
    description: string | null
    price: number
    area: number | null
    bedrooms: number
    bathrooms: number
    garageSpaces: number
    imageUrls: string[]
    neighborhood: string
    city: string
  }
}

const PropertyCard = ({ property }: PropertyCardProps) => {
  return (
    <AnimatedContent>
      <Card className="w-fit py-0">
        <CardContent className="p-4">
          <div className="flex flex-col justify-between gap-4 lg:max-w-225 lg:flex-row">
            <div className="relative h-50 w-full max-w-125 rounded-md lg:h-75 lg:w-75">
              <Image
                src={property.imageUrls[0] || "/placeholder-property.jpg"}
                alt={property.title}
                className="rounded-md object-cover"
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 500px, 300px"
              />
              <StatusBadge status={property.status} />
            </div>
            <div className="flex flex-col items-start justify-between gap-4 lg:max-w-[65%]">
              <div>
                <p className="line-clamp-2 text-sm text-gray-500">
                  {property.description}
                </p>
              </div>
              <div className="space-y-2">
                <h2 className="text-wilson-blue text-lg font-bold">
                  {property.title}
                </h2>
                <div className="flex w-full justify-between">
                  <p className="text-sm text-gray-500">
                    {property.neighborhood}
                  </p>
                  <Badge className="bg-gradient-wilson-blue">
                    {property.codRef}
                  </Badge>
                </div>
              </div>

              {/* Informações do imóvel */}
              <div className="flex w-full items-center justify-center">
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

              <div className="flex w-full items-center justify-between">
                <div className="text-xl font-bold text-green-600">
                  {formatCurrency(property.price)}
                </div>
                <Button
                  size="icon"
                  variant="outline"
                  className="border border-red-600"
                >
                  <Heart size={16} className="h-7 w-7 text-red-600" />
                </Button>
              </div>

              <div className="w-full">
                <Link href={`/imoveis/${property.slug || property.id}`}>
                  <Button className="bg-gradient-wilson-blue text-wilson-golden w-full text-lg font-bold">
                    Ver Detalhes
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </AnimatedContent>
  )
}

export default PropertyCard
