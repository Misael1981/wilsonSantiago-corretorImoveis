import MapSection from "@/components/MapSection"
import Image from "next/image"
import { MdLocationOn } from "react-icons/md"

const AdressCard = () => {
  return (
    <div className="w-full space-y-2 lg:max-w-[400px]" id="adress">
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
      <div className="h-50 w-full overflow-hidden rounded-md">
        <MapSection />
      </div>
    </div>
  )
}

export default AdressCard
