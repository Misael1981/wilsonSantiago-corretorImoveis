import EmptyState from "@/components/EmptyState"
import { PropertyType } from "@/generated/prisma"
import PropertyRegistrationCard from "../PropertyRegistrationCard"

type PropertyRegistrationRequestsListProps = {
  properties: {
    area: number | null
    title: string
    name: string
    id: string
    email: string | null
    phone: string
    createdAt: Date
    type: PropertyType
    description: string | null
    price: number | null
    bedrooms: number | null
    imageUrls: string[]
    neighborhood: string | null
    city: string
  }[]
}

const PropertyRegistrationRequestsList = ({
  properties,
}: PropertyRegistrationRequestsListProps) => {
  return (
    <section className="space-y-6 py-6">
      <h2 className="text-2xl font-semibold">
        Solicitações de Cadastro de Imóveis
      </h2>

      {properties.length === 0 && (
        <EmptyState description="Nenhum imóvel deste tipo disponível no momento." />
      )}

      {properties.map((propertie) => (
        <PropertyRegistrationCard key={propertie.id} propertie={propertie} />
      ))}
    </section>
  )
}

export default PropertyRegistrationRequestsList
