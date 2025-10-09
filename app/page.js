import About from "@/components/About"
import AdvertiseRealEstate from "@/components/AdvertiseRealEstate"
import BannerContactUs from "@/components/BannerContactUs"
import CarouselRealEstate from "@/components/CarouselRealEstate"
import Footer from "@/components/Footer"
import Header from "@/components/Header"
import PropertyCategory from "@/components/PropertyCategory"
import WelcomeSection from "@/components/WelcomeSection"
import { PrismaClient } from "@/app/generated/prisma"
import RealEstateCard from "@/components/CarouselRealEstate/components/RealEstateCard"

const prisma = new PrismaClient()

// Função para buscar todos os dados necessários da página
async function getHomePageData() {
  try {
    const [properties, featuredProperties, propertyTypes, siteConfig] =
      await Promise.all([
        // Buscar imóveis ativos (para carrossel geral)
        prisma.property.findMany({
          where: {
            status: "ACTIVE",
            deletedAt: null,
          },
          orderBy: {
            createdAt: "desc",
          },
          take: 12, // Limitar para performance
          select: {
            id: true,
            title: true,
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
          },
        }),

        // Buscar imóveis em destaque
        prisma.property.findMany({
          where: {
            status: "ACTIVE",
            featured: true,
            deletedAt: null,
          },
          orderBy: {
            createdAt: "desc",
          },
          take: 6,
          select: {
            id: true,
            title: true,
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
          },
        }),

        // Buscar tipos de propriedades com contagem
        prisma.property.groupBy({
          by: ["type"],
          where: {
            status: "ACTIVE",
            deletedAt: null,
          },
          _count: {
            type: true,
          },
        }),

        // Buscar configurações do site
        prisma.siteConfig.findMany({
          select: {
            key: true,
            value: true,
          },
        }),
      ])

    return {
      properties,
      featuredProperties,
      propertyTypes,
      siteConfig: siteConfig.reduce((acc, config) => {
        acc[config.key] = config.value
        return acc
      }, {}),
    }
  } catch (error) {
    console.error("Erro ao buscar dados da home:", error)
    return {
      properties: [],
      featuredProperties: [],
      propertyTypes: [],
      siteConfig: {},
    }
  }
}

export default async function Home() {
  const { properties, featuredProperties, propertyTypes, siteConfig } =
    await getHomePageData()

  return (
    <>
      <Header />
      <WelcomeSection />
      <PropertyCategory />
      <BannerContactUs />
      <CarouselRealEstate>
        {properties.map((property) => (
          <RealEstateCard key={property.id} property={property} />
        ))}
      </CarouselRealEstate>
      <About />
      <AdvertiseRealEstate />
      <Footer />
    </>
  )
}
