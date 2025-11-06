import { Outfit, Playfair_Display } from "next/font/google"
import { Toaster } from "@/components/ui/sonner"
import "./globals.css"
import HideOnAdminFloatingWhatsApp from "@/components/FloatingWhatsApp/HideOnAdmin"
import AuthProvider from "./providers/auth"

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
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ||
      "https://www.wilsonsantiago-corretor.com.br",
  ),
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" }, // padrão
      { url: "/favicon-96x96.png", type: "image/png", sizes: "96x96" },
      { url: "/logo-favicon.png", type: "image/png" }, // opcional
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
}

export const viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#0d3b85" },
    { media: "(prefers-color-scheme: dark)", color: "#0d3b85" },
  ],
}

export default function RootLayout({ children }) {
  return (
    <html
      lang="pt-BR"
      className={`${outfit.variable} ${playfairDisplay.variable}`}
    >
      <body className="antialiased">
        <AuthProvider>
          {children}
          <div className="fixed right-4 bottom-4 z-50">
            <HideOnAdminFloatingWhatsApp />
          </div>
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  )
}
