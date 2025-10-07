import BannerContactUs from "@/components/BannerContactUs"
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
    </>
  )
}
