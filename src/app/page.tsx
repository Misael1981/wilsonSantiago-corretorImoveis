import AdvertiseRealEstate from "@/components/AdvertiseRealEstate"
import BannerContactUs from "@/components/BannerContactUs"
import BlogSection from "@/components/BlogSection"
import CarouselProperties from "@/components/CarouselProperties"
import CustomersServed from "@/components/CustomersServed"
import FeaturedVideosSection from "@/components/FeaturedVideosSection"
import Footer from "@/components/Footer"
import Header from "@/components/Header"
import HeroSection from "@/components/HeroSection"
import PropertyCategory from "@/components/PropertyCategory"
import { getPropertiesCarousel } from "@/data/get-properties-carousel"

export default async function Home() {
  const properties = await getPropertiesCarousel()

  return (
    <>
      <Header />

      <main className="space-y-4 lg:space-y-6">
        <HeroSection />

        <FeaturedVideosSection />

        <PropertyCategory />

        <BannerContactUs />

        <CarouselProperties properties={properties} />

        <AdvertiseRealEstate />

        <BlogSection />

        <CustomersServed />
      </main>

      <Footer />
    </>
  )
}
