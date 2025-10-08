import { Card, CardContent } from "@/components/ui/card"
import { CarouselItem } from "@/components/ui/carousel"

const RealEstateCard = ({ item }) => {
  return (
    <CarouselItem key={item.id}>
      <Card>
        <CardContent className="flex items-center justify-center">
          <h3 className="text-2xl font-bold">{item.title}</h3>
        </CardContent>
      </Card>
    </CarouselItem>
  )
}

export default RealEstateCard
