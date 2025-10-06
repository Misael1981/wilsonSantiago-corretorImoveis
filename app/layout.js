import { Outfit, Playfair_Display } from "next/font/google"
import "./globals.css"

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
    <html lang="pt-BR">
      <body
        className={`${outfit.variable} ${playfairDisplay.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  )
}
