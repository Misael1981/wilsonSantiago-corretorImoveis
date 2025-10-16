import Image from "next/image"
import ThirdTitle from "../ThirdTitle"
import { Card, CardContent } from "../ui/card"
import { Button } from "../ui/button"
import Link from "next/link"

const AdvertiseRealEstate = () => {
  return (
    <div className="boxed p-4">
      <Card className="bg-gradient-wilson-blue p-0">
        <CardContent className="flex flex-col gap-4 p-4 lg:flex-row lg:items-stretch">
          <div className="relative min-h-[30vh] w-[100%] p-4 lg:w-1/3">
            <Image
              src="/assets/imagem_anuncie-imovel.webp"
              alt="Anuncie seu imóvel"
              fill
              className="rounded-md object-cover"
            />
          </div>
          <div className="flex flex-col justify-between gap-4 lg:w-2/3">
            <ThirdTitle title="Corretores e proprietários de imóveis" />
            <p className="text-lg text-white/50">
              Receba mais contatos divulgando os seus imóveis no portal
              imobiliário pioneiro da região
            </p>
            <Button
              asChild
              className="text-wilson-blue bg-gradient-wilson-golden"
            >
              <Link href="/cadastrar-imovel">Cadastre seu imóvel</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default AdvertiseRealEstate
