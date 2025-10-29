import prisma from "@/lib/prisma"
import CardImoveis from "./components/CardImoveis"
import AnimatedContent from "@/components/AnimatedContent"

export default async function Imoveis({ searchParams }) {
  // Mapeamento dos tipos (valores da URL -> enum do Prisma)
  const typeMap = {
    casa: "CASA",
    apartamento: "APARTAMENTO",
    terreno: "TERRENO",
    loja: "LOJA",
    chacara: "CHACARA",
    sitio: "SITIO",
    galpao: "GALPAO",
    sala_comercial: "SALA_COMERCIAL",
  }

  // Aguarda o searchParams antes de ler as propriedades (corrige o erro de sync dynamic APIs)
  const sp = await searchParams

  const {
    type,
    city,
    neighborhood,
    priceMin,
    priceMax,
    bedrooms,
    bathrooms,
    parking,
    area,
    page = "1",
    pageSize = "12",
    title,
    status,
    codRef,
  } = sp ?? {}

  const where = {
    status: "ACTIVE",
    deletedAt: null,
    ...(type ? { type: typeMap[type] } : {}),
    ...(title ? { title: { contains: title, mode: "insensitive" } } : {}),
    ...(city ? { city: { contains: city, mode: "insensitive" } } : {}),
    ...(neighborhood
      ? { neighborhood: { contains: neighborhood, mode: "insensitive" } }
      : {}),
    ...(priceMin || priceMax
      ? {
          price: {
            ...(priceMin ? { gte: parseFloat(priceMin) } : {}),
            // Corrige 'lle' -> 'lte'
            ...(priceMax ? { lte: parseFloat(priceMax) } : {}),
          },
        }
      : {}),
    ...(bedrooms ? { bedrooms: { gte: parseInt(bedrooms, 10) } } : {}),
    ...(bathrooms ? { bathrooms: { gte: parseInt(bathrooms, 10) } } : {}),
    ...(parking ? { garageSpaces: { gte: parseInt(parking, 10) } } : {}),
    ...(area ? { area: { gte: parseFloat(area) } } : {}),
  }

  const currentPage = Math.max(1, parseInt(page, 10) || 1)
  const take = Math.max(1, Math.min(50, parseInt(pageSize, 10) || 12))
  const skip = (currentPage - 1) * take

  const [properties, total] = await Promise.all([
    prisma.property.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip,
      take,
      // Ao fazer a consulta com prisma.property.findMany, inclua:
      select: {
        id: true,
        title: true,
        description: true,
        price: true,
        area: true,
        bedrooms: true,
        bathrooms: true,
        garageSpaces: true,
        type: true,
        imageUrls: true,
        city: true,
        neighborhood: true,
        slug: true,
        status: true,
        codRef: true,
      },
    }),
    prisma.property.count({ where }),
  ])

  const totalPages = Math.ceil(total / take)

  return (
    <AnimatedContent>
      <div className="flex w-full flex-col items-center justify-center p-4">
        <h1 className="mb-4 text-2xl font-bold">Imóveis</h1>
        <div className="flex flex-wrap items-center justify-center gap-4">
          {properties.map((property) => (
            <CardImoveis key={property.id} property={property} />
          ))}
        </div>
      </div>
    </AnimatedContent>
  )
}
