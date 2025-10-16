Arquivo .env.local

```
NEXT_PUBLIC_WHATSAPP=5535999999999
```

Atualizações de código

- ### 1. Metadata na Sobre

```
export async function generateMetadata() {
  return {
    title: "Sobre • Wilson Corretor de Imóveis",
    description:
      "Conheça mais sobre Wilson Santiago, experiência, serviços e como ele pode te ajudar.",
  }
}
// ... existing code ...
const Sobre = () => {
  // ... existing code ...
  return (
    <main className="min-h-screen">
      {/* mantém estrutura existente */}
      // ... existing code ...
    </main>
  )
}
// ... existing code ...
```

### 2. Serviços com ações reais (WhatsApp, Modal, Cadastro)

```
import SubTitle from "@/components/SubTitle"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
// ... existing code ...
import Link from "next/link"
import DialogOrderYourProperty from "@/components/DialogOrderYourProperty"
// ... existing code ...
const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP || "5535999999999"
const wa = (msg) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`
// ... existing code ...
{itens.map((item) => (
  <Card key={item.id} className="h-[400px] w-[300px] max-w-[90%]">
    <CardContent className="flex h-full flex-col items-center justify-between">
      {/* conteúdo existente */}
      // ... existing code ...
      <div>
        {item.id === 1 ? (
          <DialogOrderYourProperty
            trigger={
              <a
                href="#encomenda"
                className="text-sm font-semibold text-blue-700 hover:underline"
              >
                Encomendar imóvel
              </a>
            }
          />
        ) : item.id === 2 ? (
          <a
            href={wa("Olá Wilson, quero simular um financiamento do meu imóvel.")}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-semibold text-blue-700 hover:underline"
            aria-label="Simular financiamento via WhatsApp"
          >
            Simular financiamento
          </a>
        ) : (
          <Link
            href="/cadastrar-imovel"
            className="text-sm font-semibold text-blue-700 hover:underline"
            aria-label="Cadastrar seu imóvel no portal"
          >
            Cadastrar imóvel
          </Link>
        )}
      </div>
    </CardContent>
  </Card>
))}
// ... existing code ...
```

### 3. About com CTA e modal

```
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
// ... existing code ...
import DialogOrderYourProperty from "@/components/DialogOrderYourProperty"
const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP || "5535999999999"
const wa = (msg) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`
// ... existing code ...
<Card>
  <CardContent className="flex flex-wrap items-center justify-between gap-4">
    {/* imagem e texto existentes */}
    // ... existing code ...
    <div className="mt-4 flex flex-wrap gap-3">
      <a
        href={wa("Olá Wilson! Gostaria de conversar sobre imóveis e serviços.")}
        target="_blank"
        rel="noopener noreferrer"
        className="rounded-md border px-3 py-2 text-sm font-semibold text-blue-700 hover:bg-gray-50"
        aria-label="Falar com Wilson pelo WhatsApp"
      >
        Falar no WhatsApp
      </a>
      <DialogOrderYourProperty
        trigger={
          <a
            href="#encomenda"
            className="rounded-md border px-3 py-2 text-sm font-semibold text-blue-700 hover:bg-gray-50"
          >
            Encomendar imóvel
          </a>
        }
      />
    </div>
  </CardContent>
</Card>
// ... existing code ...
```

### 4. WelcomeSobre com CTA simples

```
import Image from "next/image"
// ... existing code ...
const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP || "5535999999999"
const wa = (msg) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`
// ... existing code ...
<div className="max-w-xl">
  {/* título e texto existentes */}
  // ... existing code ...
  <div className="mt-4">
    <a
      href={wa("Olá Wilson! Vi sua página Sobre e quero saber mais.")}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-block rounded-md bg-white/10 px-4 py-2 text-sm font-semibold text-white hover:bg-white/20"
      aria-label="Falar agora com Wilson pelo WhatsApp"
    >
      Fale agora no WhatsApp
    </a>
  </div>
</div>
// ... existing code ...
```
