export const dynamic = "force-dynamic"

import { Outfit, Playfair_Display } from "next/font/google"
import "../globals.css"
import Header from "@/components/Header"
import Footer from "@/components/Footer"

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
})

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
})

export default function SobreLayout({ children }) {
  return (
    <div className={`${outfit.variable} ${playfairDisplay.variable}`}>
      <Header />
      {children}
      <Footer />
    </div>
  )
}
