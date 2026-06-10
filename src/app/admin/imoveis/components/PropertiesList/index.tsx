import { PropertyStatus, PropertyType } from "@/generated/prisma"
import PropertieCard from "../PropertieCard"
import { Badge } from "@/components/ui/badge"
import EmptyState from "@/components/EmptyState"

type PropertiesListProps = {
  properties: {
    id: string
    title: string
    codRef: number
    status: PropertyStatus
    type: PropertyType
    neighborhood: string
    city: string
    price: number
  }[]
  title?: string
}

const PropertiesList = ({ properties, title }: PropertiesListProps) => {
  return (
    <section className="space-y-6 py-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">
          {title || "Lista de Imóveis"}
        </h2>
        <Badge variant="outline" className="text-sm">
          {properties.length} {properties.length === 1 ? "imóvel" : "imóveis"}
        </Badge>
      </div>
      {properties.length === 0 && (
        <EmptyState description="Nenhum imóvel deste tipo disponível no momento." />
      )}
      {properties.map((propertie) => (
        <PropertieCard key={propertie.id} propertie={propertie} />
      ))}
    </section>
  )
}

export default PropertiesList
