import HeaderAdmin from "../components/HeaderAdmin"
import AvailableProperties from "./components/AvailableProperties"
import RealEstateFilters from "./components/RealEstateFilters"
import RealEstateRequests from "./components/RealEstateRequests"
import RegistrationRequests from "./components/RegistrationRequests"
import SearchTables from "./components/SearchTables"
import SubTitleImoveis from "./components/SubTitleImoveis"
import SummaryCards from "./components/SummaryCards"
import prisma from "@/lib/prisma"

export default async function Imoveis({ searchParams }) {
  const params = await searchParams

  const view = params?.view || "available"
  const q = (params?.q || "").trim()

  // Resumo (dinâmico)
  const propertiesCount = await prisma.property.count()
  const soldPropertiesCount = await prisma.property.count({
    where: { status: "SOLD" },
  })
  const listingRequestsCount = await prisma.listingRequest.count()
  const propertyRequestsCount = await prisma.propertyRequest.count()

  const totalProperties = propertiesCount
  const soldCount = soldPropertiesCount
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

  const listings = await prisma.listingRequest.findMany({
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      name: true,
      phone: true,
      city: true,
      type: true,
      description: true,
      title: true,
      price: true,
      status: true,
      createdAt: true,
    },
  })

  const propertyRequests = await prisma.propertyRequest.findMany({
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      name: true,
      phone: true,
      city: true,
      type: true,
      neighborhood: true,
      description: true,
      minPrice: true,
      maxPrice: true,
      status: true,
      source: true,
      createdAt: true,
    },
  })

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
            codRef: true,
            // --- incluir campos usados na edição para evitar “reset” ---
            description: true,
            address: true,
            number: true,
            complement: true,
            neighborhood: true,
            state: true,
            zipCode: true,
            bedrooms: true,
            bathrooms: true,
            garageSpaces: true,
            area: true,
            featured: true,
            slug: true,
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

      {view === "listing" && <RegistrationRequests listings={listings} />}
      {view === "requests" && (
        <RealEstateRequests propertyRequests={propertyRequests} />
      )}
    </div>
  )
}
