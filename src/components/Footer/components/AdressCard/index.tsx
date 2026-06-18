import { Card, CardContent } from "@/components/ui/card"
import { MdLocationOn } from "react-icons/md"
import RealEstateMap from "../RealEstateMap"

const AdressCard = () => {
  return (
    <div className="w-full space-y-2 lg:max-w-100" id="adress">
      <h3 className="text-wilson-golden mb-4 text-lg font-semibold">
        Onde estamos
      </h3>
      <ul className="space-y-2">
        <li className="flex items-center">
          <MdLocationOn className="text-wilson-golden mr-2 h-10 w-10" />
          <span className="text-white">
            Avenida Abreu Lima, 149 - Centro - Pouso Alegre - MG
          </span>
        </li>
      </ul>
      <Card className="bg-gray-700/30 p-0">
        <CardContent className="p-2">
          <RealEstateMap />
        </CardContent>
      </Card>
    </div>
  )
}

export default AdressCard
