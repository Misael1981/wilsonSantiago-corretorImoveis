import { getPropertiesForCards } from "@/data/get-properties-for-cards"
import ImoveisBreadcrumb from "./components/ImoveisBreadcrumb"
import { SidebarTrigger } from "@/components/ui/sidebar"
import PropertyTypesFilter from "./components/PropertyTypesFilter"
import PaginationButtons from "./components/PaginationButtons"
import PropertyCard from "./components/PropertyCard"

type PropertiesPageProps = {
  searchParams: Promise<{ page?: string; type?: string; city?: string }>
}

export default async function PropertiesPage({
  searchParams,
}: PropertiesPageProps) {
  const resolvedParams = await searchParams
  const page = Number(resolvedParams.page) || 1
  const type = resolvedParams.type ?? undefined
  const city = resolvedParams.city ?? undefined

  const { properties, meta } = await getPropertiesForCards({
    page,
    limit: 6,
    type,
    city,
  })

  return (
    <div className="w-full">
      <header className="space-y-4 bg-white py-4 shadow-lg">
        <div className="flex items-center gap-2">
          <SidebarTrigger />
          <ImoveisBreadcrumb />
        </div>
        <PropertyTypesFilter />
      </header>
      <main className="w-full space-y-6 p-4">
        <h1>Página de Imóveis</h1>
        {properties.length === 0 ? (
          <div className="py-24 text-center font-medium text-slate-400">
            Nenhum imóvel deste tipo encontrado no momento. 🏡
          </div>
        ) : (
          <>
            <div className="flex w-full flex-col items-center justify-center gap-4">
              {properties.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>

            <PaginationButtons
              currentPage={meta.currentPage}
              totalPages={meta.totalPages}
            />
          </>
        )}
      </main>
    </div>
  )
}
