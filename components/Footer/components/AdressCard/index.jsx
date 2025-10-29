"use client"
import dynamic from "next/dynamic"
import Image from "next/image"
import { MdLocationOn } from "react-icons/md"

const DynamicMapSection = dynamic(() => import("@/components/MapSection"), {
  ssr: false,
  loading: () => (
    <div className="flex h-[200px] w-full items-center justify-center bg-gray-100 text-sm text-gray-600">
      Carregando mapa...
    </div>
  ),
})

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
        {/* Usa import dinâmico para evitar SSR de leaflet */}
        <DynamicMapSection />
      </div>
    </div>
  )
}

export default AdressCard
