import { Card, CardContent } from "../ui/card"
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel"
import RealEstateCard from "./components/RealEstateCard"

const items = [
  {
    id: 1,
    title: "Imóvel 1",
  },
  {
    id: 2,
    title: "Imóvel 2",
  },
  {
    id: 3,
    title: "Imóvel 3",
  },
]

const CarouselRealEstate = () => {
  return (
    <section className="boxed p-4">
      <Carousel className="w-full">
        <CarouselContent>
          {items.map((item) => (
            <RealEstateCard key={item.id} item={item} />
          ))}
        </CarouselContent>
      </Carousel>
    </section>
  )
}

export default CarouselRealEstate
