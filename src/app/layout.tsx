import type { Metadata } from "next"
import { Outfit, Playfair_Display } from "next/font/google"
import "./globals.css"
import AuthProvider from "@/providers/auth"
import { Toaster } from "@/components/ui/sonner"

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

export const metadata: Metadata = {
  title: "Wilson Corretor de Imóveis",
  description: "Encontre o imóvel dos seus sonhos",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ||
      "https://www.wilsonsantiago-corretor.com.br",
  ),
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${outfit.variable} ${playfairDisplay.variable}`}
    >
      <body className="flex min-h-full flex-col">
        <AuthProvider>
          {children}
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  )
}
