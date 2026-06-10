import { BedDouble, CarFront, ChartArea, ShowerHead } from "lucide-react"

type PropertyStatsProps = {
  bedrooms: number
  bathrooms: number
  garageSpaces: number
  area: number | null
}

const PropertyStats = ({
  bedrooms,
  bathrooms,
  garageSpaces,
  area,
}: PropertyStatsProps) => {
  return (
    <ul className="align-center flex w-full flex-wrap justify-between gap-2 text-xs text-gray-100">
      <li>
        {bedrooms > 0 && (
          <span className="flex items-center gap-1">
            <BedDouble />
            {bedrooms} quartos
          </span>
        )}
      </li>
      <li>
        {bathrooms > 0 && (
          <span className="flex items-center gap-1">
            <ShowerHead />
            {bathrooms} banheiros
          </span>
        )}
      </li>
      <li>
        {garageSpaces > 0 && (
          <span className="flex items-center gap-1">
            <CarFront />
            {garageSpaces} vagas
          </span>
        )}
      </li>
      <li>
        {area! > 0 && (
          <span className="flex items-center gap-1">
            <ChartArea />
            {area}m²
          </span>
        )}
      </li>
    </ul>
  )
}

export default PropertyStats
