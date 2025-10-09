import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CarouselItem } from "@/components/ui/carousel"
import { BedDouble, CarFront, ChartArea, ShowerHead } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const RealEstateCard = ({ property }) => {
  return (
    <CarouselItem
      key={property.id}
      className="md:basis-1/2 lg:basis-1/3 xl:basis-1/4 2xl:basis-1/5"
    >
      <Link
        href={`/imoveis/${property.slug || property.id}`}
        className="block h-full transition-transform duration-200 hover:scale-[1.02]"
      >
        <Card className="overflow-hidden p-0">
          <CardContent className="p-0">
            <div className="flex flex-col">
              {/* Container da imagem com aspect ratio fixo */}
              <div className="relative aspect-[4/3] w-full overflow-hidden">
                <Image
                  src={property.imageUrls[0]}
                  alt={property.title}
                  fill
                  className="object-cover transition-transform duration-300 hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                />
              </div>

              {/* Conteúdo do card */}
              <div className="bg-gradient-wilson-blue p-4">
                <h3 className="text-wilson-golden mb-2 line-clamp-1 text-center text-lg font-bold">
                  {property.title}
                </h3>
                <p className="mb-2 text-sm text-gray-100">
                  {property.city}, {property.neighborhood}
                </p>

                {/* Informações do imóvel */}
                <div className="flex h-16 w-full items-center justify-center">
                  <ul className="align-center flex w-full flex-wrap justify-between gap-2 text-xs text-gray-100">
                    <li>
                      {property.bedrooms && (
                        <span className="flex items-center gap-1">
                          <BedDouble />
                          {property.bedrooms} quartos
                        </span>
                      )}
                    </li>
                    <li>
                      {property.bathrooms && (
                        <span className="flex items-center gap-1">
                          <ShowerHead />
                          {property.bathrooms} banheiros
                        </span>
                      )}
                    </li>
                    <li>
                      {property.garageSpaces && (
                        <span className="flex items-center gap-1">
                          <CarFront />
                          {property.garageSpaces} vagas
                        </span>
                      )}
                    </li>
                    <li>
                      {property.area && (
                        <span className="flex items-center gap-1">
                          <ChartArea />
                          {property.area}m²
                        </span>
                      )}
                    </li>
                  </ul>
                </div>

                {/* Preço */}
                <div className="text-xl font-bold text-green-600">
                  R$ {property.price?.toLocaleString("pt-BR")}
                </div>

                <Button
                  className="bg-gradient-wilson-golden mt-4 w-full"
                  variant="primary"
                >
                  Ver Detalhes
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </Link>
    </CarouselItem>
  )
}

export default RealEstateCard
