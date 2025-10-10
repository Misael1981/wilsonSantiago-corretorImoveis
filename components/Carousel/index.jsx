"use client"

import Autoplay from "embla-carousel-autoplay"
import { Carousel, CarouselContent } from "../ui/carousel"
import SubTitle from "../SubTitle"

const CarouselGlobal = ({
  children,
  title,
  autoplay = true,
  delay = 2000,
  className = "",
}) => {
  return (
    <section className={`boxed my-4 p-4 ${className}`}>
      <SubTitle title={title} className="mb-4" />
      <Carousel
        className="w-full"
        opts={{
          align: "start",
          loop: true,
        }}
        plugins={[
          Autoplay({
            delay,
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

export default CarouselGlobal
