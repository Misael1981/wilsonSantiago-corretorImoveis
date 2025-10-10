import Image from "next/image"
import { MdLocationOn } from "react-icons/md"

const AdressCard = () => {
  return (
    <div className="w-full space-y-2 lg:max-w-[400px]">
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
      <div className="relative h-50 w-full overflow-hidden rounded-md">
        <Image
          src="/assets/map.PNG"
          alt="Mapa do endereço"
          fill
          className="rounded-md object-cover"
        />
      </div>
    </div>
  )
}

export default AdressCard
