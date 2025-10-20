import HeaderAdmin from "../components/HeaderAdmin"
import AvailableProperties from "./components/AvailableProperties"
import RealEstateFilters from "./components/RealEstateFilters"
import SearchTables from "./components/SearchTables"
import SubTitleImoveis from "./components/SubTitleImoveis"
import SummaryCards from "./components/SummaryCards"
import prisma from "@/lib/prisma"

export default async function Imoveis({ searchParams }) {
  const params = await searchParams

  const view = params?.view || "available"
  const q = (params?.q || "").trim()

  // Resumo (dinâmico)
  const [
    totalProperties,
    soldCount,
    listingRequestsCount,
    propertyRequestsCount,
  ] = await Promise.all([
    prisma.property.count(),
    prisma.property.count({ where: { status: "SOLD" } }),
    prisma.listingRequest.count(),
    prisma.propertyRequest.count(),
  ])

  // Lista para a visão "Imóveis Disponíveis"
  const availableWhere = {
    AND: [
      { status: { in: ["ACTIVE", "SPECIAL_CONDITION"] } },
      q
        ? {
            OR: [
              { title: { contains: q, mode: "insensitive" } },
              { city: { contains: q, mode: "insensitive" } },
              { neighborhood: { contains: q, mode: "insensitive" } },
            ],
          }
        : {},
    ],
  }

  const availableProperties =
    view === "available"
      ? await prisma.property.findMany({
          where: availableWhere,
          orderBy: { createdAt: "desc" },
          select: {
            id: true,
            title: true,
            price: true,
            type: true,
            status: true,
            city: true,
            imageUrls: true,
            createdAt: true,
          },
        })
      : []

  return (
    <div>
      <HeaderAdmin label="Imóveis" />
      <SubTitleImoveis />
      <SummaryCards
        totalProperties={totalProperties}
        soldCount={soldCount}
        listingRequestsCount={listingRequestsCount}
        propertyRequestsCount={propertyRequestsCount}
      />
      <SearchTables view={view} />
      <RealEstateFilters q={q} />

      {view === "available" && (
        // Criaremos a listagem de disponíveis
        <div className="p-4">
          {/* Pode trocar por <AvailableProperties properties={availableProperties} /> quando quiser */}
          {/* Render rápido inline para você ver funcionando */}
          <AvailableProperties properties={availableProperties} />
        </div>
      )}

      {view === "listing" && (
        <div className="p-4">Pedidos de cadastro (em breve)</div>
      )}
      {view === "requests" && (
        <div className="p-4">Imóveis encomendados (em breve)</div>
      )}
    </div>
  )
}
