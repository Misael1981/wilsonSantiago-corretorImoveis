export const dynamic = "force-dynamic"

import { Outfit, Playfair_Display } from "next/font/google"
import "../globals.css"
import HeaderBlog from "./components/HeaderBlog"
import FooterBlog from "./components/FooterBlog"

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

export default function BlogLayout({ children }) {
  return (
    <div className={`${outfit.variable} ${playfairDisplay.variable}`}>
      <HeaderBlog />
      {children}
      <FooterBlog />
    </div>
  )
}
