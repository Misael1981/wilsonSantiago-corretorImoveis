import HeaderAdmin from "@/components/HeaderAdmin"
import MetricsCards from "@/components/MetricsCards"
import SectionTitleAdmin from "@/components/SectionTitleAdmin"
import { Button } from "@/components/ui/button"
import { getPropertiesData } from "@/data/get-properties-data"
import { Check, Home, UserPlus } from "lucide-react"
import Link from "next/link"
import { FaEnvelopeOpen } from "react-icons/fa"
import SearchProperties from "./components/SearchProperties"
import PropertiesList from "./components/PropertiesList"
import PropertyRegistrationRequestsList from "./components/PropertyRegistrationRequestsList"
import ListPropertiesOrdered from "./components/ListPropertiesOrdered"
import PaginationButtons from "./components/PaginationButtons"
import { getProperties } from "@/data/get-properties"

interface ImoveisPageProps {
  searchParams?: Promise<{
    view?: string
    q?: string
    page?: string
  }>
}

export default async function ImoveisPage({ searchParams }: ImoveisPageProps) {
  const resolvedSearchParams = (await searchParams) ?? {}

  const q = resolvedSearchParams.q
  const view = resolvedSearchParams.view
  const page = resolvedSearchParams.page

  const currentView = view || "available"

  const data = await getPropertiesData({ q, view: currentView, page })

  const queryParams = (novaPagina: number) => {
    const params = new URLSearchParams()
    if (q) params.set("q", q)
    if (currentView) params.set("view", currentView) // Mantém a aba atual na paginação
    params.set("page", novaPagina.toString())
    return `?${params.toString()}`
  }

  const metrics = [
    {
      title: "Total de Imóveis",
      icon: Home,
      value: data.metrics.totalProperties,
    },
    { title: "Imóveis Vendidos", icon: Check, value: data.metrics.soldCount },
    {
      title: "Cadastro de Imóveis (Usuários)",
      icon: UserPlus,
      value: data.metrics.listingRequestsCount,
    },
    {
      title: "Imóveis Encomendados",
      icon: FaEnvelopeOpen,
      value: data.metrics.propertyRequestsCount,
    },
  ]

  const properties = await getProperties()

  const propertieFeatures = properties.filter((p) => p.featured === true)
  const videoFeaturedProperties = properties.filter(
    (p) => p.videoFeatured === true,
  )

  return (
    <div className="mx-auto max-w-6xl p-4">
      <HeaderAdmin label="Gerenciamento de Imóveis" />

      <SectionTitleAdmin
        label="Gerenciar Imóveis"
        description="Gerencie imóveis, cadastre imóveis e encomendas de imóveis"
        actionButton={
          <Link href="/admin/imoveis/cadastrar/novo">
            <Button className="bg-gradient-wilson-blue px-6 py-4 text-lg text-white">
              + Novo Imóvel
            </Button>
          </Link>
        }
      />

      <MetricsCards metrics={metrics} />

      <SearchProperties view={currentView} />

      <div className="mt-4">
        {(() => {
          switch (currentView) {
            case "listing":
              return (
                <PropertyRegistrationRequestsList properties={data.listings} />
              )

            case "requests":
              return (
                <ListPropertiesOrdered properties={data.propertyRequests} />
              )

            case "featured":
              return (
                <PropertiesList
                  properties={propertieFeatures}
                  title="Imóveis em Destaque"
                />
              )

            case "video_featured":
              return (
                <PropertiesList
                  properties={videoFeaturedProperties}
                  title="Imóveis com Vídeo em Destaque"
                />
              )

            case "available":
            default:
              return (
                <PropertiesList
                  properties={data.availableProperties}
                  title="Todos os Imóveis Disponíveis"
                />
              )
          }
        })()}
      </div>

      <PaginationButtons
        queryParams={queryParams}
        pagination={data.pagination}
      />
    </div>
  )
}
