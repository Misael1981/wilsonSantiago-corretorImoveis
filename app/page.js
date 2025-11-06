import AdvertiseRealEstate from "@/components/AdvertiseRealEstate"
import BannerContactUs from "@/components/BannerContactUs"
import Footer from "@/components/Footer"
import Header from "@/components/Header"
import PropertyCategory from "@/components/PropertyCategory"
import WelcomeSection from "@/components/WelcomeSection"
import RealEstateCard from "@/components/RealEstateCard"
import LinksBlogs from "@/components/LinksBlogs"
import CustomersServed from "@/components/CustomersServed"
import CarouselGlobal from "@/components/Carousel"
import VideoHighlights from "@/components/VideoHighlights"
import prisma from "@/lib/prisma"

// Função para buscar todos os dados necessários da página
async function getHomePageData() {
  try {
    const [
      properties,
      featuredProperties,
      propertyTypes,
      siteConfig,
      articles,
    ] = await Promise.all([
      // Buscar imóveis ativos (para carrossel geral)
      prisma.property.findMany({
        where: {
          deletedAt: null,
        },
        orderBy: {
          createdAt: "desc",
        },
        take: 20, // Limitar para performance
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
        take: 20,
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
          createdAt: true,
          youtubeId: true,
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

      // Buscar artigos
      prisma.article.findMany({
        where: {
          published: true, // ✅ Usar published ao invés de deletedAt
        },
        orderBy: {
          createdAt: "desc",
        },
        take: 6,
        select: {
          id: true,
          title: true,
          content: true,
          excerpt: true,
          imageUrl: true,
          slug: true,
        },
      }),
    ])

    // Clientes satisfeitos
    const customersData = await prisma.customer.findMany({
      where: {
        isActive: true,
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 6,
      select: {
        id: true,
        name: true,
        testimonial: true,
        photo: true,
        rating: true,
        occupation: true,
        location: true,
        createdAt: true,
      },
    })

    return {
      properties,
      featuredProperties,
      propertyTypes,
      siteConfig: siteConfig.reduce((acc, config) => {
        acc[config.key] = config.value
        return acc
      }, {}),
      articles,
      customersData,
    }
  } catch (error) {
    console.error("Erro ao buscar dados da home:", error)
    return {
      properties: [],
      featuredProperties: [],
      propertyTypes: [],
      siteConfig: {},
      articles: [],
      customersData: [],
    }
  }
}

export default async function Home() {
  const { properties, articles, customersData, featuredProperties } = await getHomePageData()

  const videoHighlights = (featuredProperties || [])
    .filter((p) => p.youtubeId)
    .slice(0, 2)
    .map((p) => ({
      id: p.id,
      youtubeId: p.youtubeId,
      title: p.title,
      description: p.description || "",
      thumbnail: Array.isArray(p.imageUrls) && p.imageUrls.length > 0 ? p.imageUrls[0] : "/assets/casa.jpg",
      price: p.price,
      location: `${p.city}${p.neighborhood ? " - " + p.neighborhood : ""}`,
      specs: {
        bedrooms: p.bedrooms || 0,
        bathrooms: p.bathrooms || 0,
        garage: p.garageSpaces || 0,
        area: p.area ? `${p.area} m²` : "",
      },
      tags: [],
      publishedAt: p.createdAt,
      views: 0,
      slug: p.slug || p.id,
    }))

  return (
    <>
      <Header />
      <main>
        <WelcomeSection />
        <VideoHighlights highlights={videoHighlights} />
        <PropertyCategory />
        <BannerContactUs />
        <CarouselGlobal title="Imóveis em Destaque">
          {properties.map((property) => (
            <RealEstateCard
              key={property.id}
              property={property}
              basisClass="md:basis-1/2 lg:basis-1/3 xl:basis-1/4 2xl:basis-1/5"
            />
          ))}
        </CarouselGlobal>
        <AdvertiseRealEstate />
        <LinksBlogs articles={articles} />
        <CustomersServed customersData={customersData} />
      </main>
      <Footer />
    </>
  )
}
