import { getPropertiesById } from "@/data/get-properties-by-id"
import PropertyForm from "./components/PropertyForm"
import { PropertyFormValues } from "@/schemas/property-schema"
import { dbPropertyToFormValues } from "@/helpers/db-property-to-form-values"

interface RegisterFormPageProps {
  params: Promise<{
    id?: string[]
  }>
}

export default async function RegisterFormPage({
  params,
}: RegisterFormPageProps) {
  const resolvedParams = await params
  const propertyId = resolvedParams.id?.[0]
  const isEditMode = Boolean(propertyId) && propertyId !== "novo"

  let propertyData: PropertyFormValues | undefined = undefined

  if (isEditMode && propertyId) {
    const dbProperty = await getPropertiesById({ id: propertyId })

    if (!dbProperty) {
      return (
        <div className="p-6 text-red-500">Imóvel não encontrado, mano!</div>
      )
    }

    propertyData = dbPropertyToFormValues(dbProperty)
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="mb-6 text-2xl font-bold">
        {isEditMode
          ? `Editar Imóvel (Ref: ${propertyData?.codRef})`
          : "Cadastrar Novo Imóvel"}
      </h1>

      <PropertyForm
        property={propertyData}
        propertyId={propertyId === "novo" ? undefined : propertyId}
      />
    </div>
  )
}
