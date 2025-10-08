import About from "@/components/About"
import AdvertiseRealEstate from "@/components/AdvertiseRealEstate"
import BannerContactUs from "@/components/BannerContactUs"
import CarouselRealEstate from "@/components/CarouselRealEstate"
import Footer from "@/components/Footer"
import Header from "@/components/Header"
import PropertyCategory from "@/components/PropertyCategory"
import WelcomeSection from "@/components/WelcomeSection"

export default function Home() {
  return (
    <>
      <Header />
      <WelcomeSection />
      <PropertyCategory />
      <BannerContactUs />
      <CarouselRealEstate />
      <About />
      <AdvertiseRealEstate />
      <Footer />
    </>
  )
}
