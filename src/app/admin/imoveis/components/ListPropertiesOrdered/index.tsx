import EmptyState from "@/components/EmptyState"
import { PropertyType } from "@/generated/prisma"
import PropertieOrderedCard from "../PropertieOrderedCard"

type ListPropertiesOrderedProps = {
  properties: {
    name: string
    id: string
    phone: string
    createdAt: Date
    type: PropertyType
    description: string | null
    neighborhood: string | null
    city: string
    minPrice: number | null
    maxPrice: number | null
  }[]
}

const ListPropertiesOrdered = ({ properties }: ListPropertiesOrderedProps) => {
  return (
    <section className="space-y-6 py-6">
      <h2 className="text-2xl font-semibold">Lista de Imóveis Encomendados</h2>

      {properties.length === 0 && (
        <EmptyState description="Nenhum imóvel deste tipo disponível no momento." />
      )}

      {properties.map((propertie) => (
        <PropertieOrderedCard key={propertie.id} propertie={propertie} />
      ))}
    </section>
  )
}

export default ListPropertiesOrdered
