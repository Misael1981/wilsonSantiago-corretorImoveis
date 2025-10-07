import { CheckCheck } from "lucide-react"
import ThirdTitle from "../ThirdTitle"
import { Button } from "../ui/button"
import Image from "next/image"

const items = [
  "Simule um financiamento para a compra do seu imóvel com as taxas mais baixas do mercado.",
  "Um de nossos agentes irá te orientar durante todo o processo, desde a documentação inicial, encaminhamento para a instituição financeira, até as chaves do seu imóvel.",
  "Entre em contato, e veja que o sonho é possível!",
]

const BannerContactUs = () => {
  return (
    <section className="boxed p-4">
      <div className="shadow-custom-deep lg:flex lg:items-stretch">
        <div className="bg-gradient-wilson-blue flex flex-col justify-between space-y-4 rounded-t-md p-4 lg:flex-2 lg:rounded-l-md lg:rounded-tr-none">
          <ThirdTitle title="Fale Conosco" />
          <h4 className="text-xl font-semibold text-white/70">
            Nós podemos te ajudar a transformar seu sonho em realidade
          </h4>
          <ul className="space-y-2">
            {items.map((item, index) => (
              <li key={index} className="text-md text-white/70">
                <CheckCheck className="text-wilson-golden mr-2 inline-block h-5 w-5" />
                {item}
              </li>
            ))}
          </ul>
          <Button className="bg-gradient-wilson-golden w-[50%] font-bold text-blue-950">
            Fale Conosco
          </Button>
        </div>
        <div className="relative h-[350px] lg:w-[400px] lg:flex-1">
          <Image
            src="/assets/banner-contato.jpg"
            alt="banner-contact-us"
            fill
            className="rounded-b-md object-cover lg:rounded-r-md lg:rounded-bl-none"
          />
        </div>
      </div>
    </section>
  )
}

export default BannerContactUs
