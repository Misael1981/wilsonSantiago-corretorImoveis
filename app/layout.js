import { Outfit, Playfair_Display } from "next/font/google"
import { Toaster } from "@/components/ui/sonner"
import "./globals.css"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import FloatingWhatsApp from "@/components/FloatingWhatsApp"

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

export const metadata = {
  title: "Wilson Corretor de Imóveis",
  description: "Encontre o imóvel dos seus sonhos",
}

export default function RootLayout({ children }) {
  return (
    <html
      lang="pt-BR"
      className={`${outfit.variable} ${playfairDisplay.variable}`}
    >
      <body className="antialiased">
        {children}
        <div className="fixed right-4 bottom-4 z-50">
          <FloatingWhatsApp />
        </div>
        <Toaster />
      </body>
    </html>
  )
}
