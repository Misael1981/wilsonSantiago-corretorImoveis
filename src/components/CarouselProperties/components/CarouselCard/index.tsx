import PropertyStats from "@/components/PropertyStats"
import StatusBadge from "@/components/StatusBadge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { PropertyStatus } from "@/generated/prisma"
import Image from "next/image"
import Link from "next/link"

type CarouselCardProps = {
  property: {
    title: string
    id: string
    createdAt: Date
    slug: string | null
    featured: boolean
    status: PropertyStatus
    codRef: number
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

const CarouselCard = ({ property }: CarouselCardProps) => {
  const imageUrl = property.imageUrls.find(Boolean)
  return (
    <Link
      href={`/imoveis/${property.slug || property.id}`}
      className="block h-full transition-transform duration-200 hover:scale-[1.02]"
    >
      <Card className="flex h-full flex-col overflow-hidden p-0">
        <CardContent className="flex flex-1 flex-col p-0">
          <div className="flex h-full flex-1 flex-col">
            {/* Container da imagem com aspect ratio fixo */}
            <div className="relative aspect-4/3 w-full overflow-hidden">
              {imageUrl && (
                <Image
                  src={imageUrl || "logo-vertical.svg"}
                  alt={property.title}
                  fill
                  className="object-cover transition-transform duration-300 hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                />
              )}
              <StatusBadge status={property.status} />
            </div>

            {/* Conteúdo do card */}
            <div className="bg-gradient-wilson-blue flex flex-1 flex-col gap-3 p-4">
              <h3 className="text-wilson-golden mb-2 line-clamp-1 text-center text-base font-bold">
                {property.title}
              </h3>
              <p className="mb-2 truncate text-sm text-gray-100">
                {property.neighborhood} - {property.city}
              </p>

              {/* Informações do imóvel */}
              <PropertyStats
                bedrooms={property.bedrooms}
                bathrooms={property.bathrooms}
                garageSpaces={property.garageSpaces}
                area={property.area}
              />

              {/* Preço */}
              <div className="mt-auto text-xl font-bold text-green-600">
                R$ {property.price?.toLocaleString("pt-BR")}
              </div>

              <Button className="bg-gradient-wilson-golden mt-4 w-full">
                Ver Detalhes
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}

export default CarouselCard
