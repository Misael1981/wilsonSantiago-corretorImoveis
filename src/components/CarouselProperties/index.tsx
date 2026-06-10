"use client"

import { PropertyStatus } from "@/generated/prisma"
import SubTitle from "../SubTitle"
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel"
import Autoplay from "embla-carousel-autoplay"
import CarouselCard from "./components/CarouselCard"

type CarouselPropertiesProps = {
  properties: {
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
  }[]
}

const CarouselProperties = ({ properties }: CarouselPropertiesProps) => {
  return (
    <section className="boxed space-y-4 lg:space-y-6">
      <SubTitle title="Imóveis em Destaque" />

      <Carousel
        className="xs:max-w-xs mx-auto w-full max-w-70 sm:max-w-xl md:max-w-3xl lg:max-w-5xl"
        opts={{
          loop: true,
          align: "start",
        }}
        plugins={[
          Autoplay({
            delay: 3000,
            stopOnInteraction: true,
          }),
        ]}
      >
        <CarouselContent>
          {properties.map((property) => (
            <CarouselItem
              key={property.id}
              className="flex basis-full pl-4 sm:basis-1/2 lg:basis-1/4"
            >
              {/* Adicionar um h-full aqui ajuda a garantir que se um card tiver mais texto que outro, eles fiquem do mesmo tamanho */}
              <div className="h-full w-full p-1">
                <CarouselCard property={property} />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </section>
  )
}

export default CarouselProperties
