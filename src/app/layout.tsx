import type { Metadata, Viewport } from "next"
import { Outfit, Playfair_Display, Inter } from "next/font/google"
import "./globals.css"
import AuthProvider from "@/providers/auth"
import { Toaster } from "@/components/ui/sonner"
import { cn } from "@/lib/utils"

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" })

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
  applicationName: "Wilson Corretor de Imóveis",
  description:
    "Encontre o imóvel dos seus sonhos. Casas, terrenos e apartamentos com atendimento exclusivo.",
  creator: "Misael Borges",
  authors: [{ name: "Misael Borges" }],
  publisher: "Wilson Santiago",
  category: "real estate",
  manifest: "/site.webmanifest",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ||
      "https://www.wilsonsantiago-corretor.com.br",
  ),

  openGraph: {
    title: "Wilson Corretor de Imóveis",
    description: "Encontre o imóvel dos seus sonhos.",
    url: "https://www.wilsonsantiago-corretor.com.br",
    siteName: "Wilson Corretor de Imóveis",
    images: [
      {
        url: "/icons/icon-512.png",
        width: 512,
        height: 512,
        alt: "Wilson Corretor de Imóveis",
      },
    ],
    locale: "pt_BR",
    type: "website",
  },

  icons: {
    icon: [
      { url: "/icons/favicon.ico", type: "image/x-icon" },
      { url: "/icons/favicon.svg", type: "image/svg+xml" },
      { url: "/icons/favicon-96x96.png", sizes: "96x96", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: ["/icons/favicon-96x96.png"],
  },
}

export const viewport: Viewport = {
  themeColor: "#0f1b29",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="pt-BR"
      className={cn(
        outfit.variable,
        playfairDisplay.variable,
        "font-sans",
        inter.variable,
      )}
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
