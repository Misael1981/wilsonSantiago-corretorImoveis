"use client"

import Autoplay from "embla-carousel-autoplay"
import { Carousel, CarouselContent } from "../ui/carousel"
import SubTitle from "../SubTitle"

const CarouselRealEstate = ({ children }) => {
  return (
    <section className="boxed my-4 p-4">
      <SubTitle title="Imóveis em Destaque" className="mb-4" />
      <Carousel
        className="w-full"
        opts={{
          align: "start",
          loop: true,
        }}
        plugins={[
          Autoplay({
            delay: 2000,
            stopOnInteraction: true,
            stopOnMouseEnter: true,
            stopOnFocusIn: true,
          }),
        ]}
      >
        <CarouselContent>{children}</CarouselContent>
      </Carousel>
    </section>
  )
}

export default CarouselRealEstate
