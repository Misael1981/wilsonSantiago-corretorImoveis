// CardImoveis (component)
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { BedDouble, CarFront, ChartArea, Heart, ShowerHead } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const CardImoveis = ({ property }) => {
  return (
    <section>
      <div className="">
        <Card className="p-0">
          <CardContent className="p-4">
            <div className="flex flex-col justify-between gap-4 lg:max-w-[900px] lg:flex-row">
              <div className="relative h-[200px] w-full max-w-[500px] rounded-md lg:h-[300px] lg:w-[300px]">
                <Image
                  src={property.imageUrls[0]}
                  alt={property.title}
                  className="rounded-md object-cover"
                  fill
                />
              </div>
              <div className="flex flex-col items-start justify-between gap-4 lg:max-w-[65%]">
                <div>
                  <p className="line-clamp-2 text-sm text-gray-500">
                    {property.description}
                  </p>
                </div>
                <div>
                  <h2 className="text-wilson-blue text-lg font-bold">
                    {property.title}
                  </h2>
                  <p className="text-sm text-gray-500">
                    {property.neighborhood}
                  </p>
                </div>

                {/* Informações do imóvel */}
                <div className="flex w-full items-center justify-center">
                  <ul className="align-center text-wilson-blue flex w-full flex-wrap justify-between gap-2 text-xs">
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

                <div className="flex w-full items-center justify-between">
                  <div className="text-xl font-bold text-green-600">
                    R$ {property.price?.toLocaleString("pt-BR")}
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
                    <Button
                      className="bg-gradient-wilson-blue text-wilson-golden w-full text-lg font-bold"
                      variant="primary"
                    >
                      Ver Detalhes
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}

export default CardImoveis
