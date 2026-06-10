import { CheckCheck } from "lucide-react"
import { Button } from "../ui/button"
import Image from "next/image"
import ComponentHeader from "../ComponentHeader"
import Link from "next/link"

const items = [
  "Rápido e eficiente, sem compromisso algum, um de nossos agentes entrará em contato com você para te ajudar a encontrar o imóvel ideal.",

  "Preencha o formulário, e veja que o sonho é possível!",
]

const BannerContactUs = () => {
  return (
    <section className="boxed p-4">
      <div className="shadow-custom-deep lg:flex lg:items-stretch">
        <div className="bg-gradient-wilson-blue flex flex-col justify-between space-y-4 rounded-t-md p-4 lg:flex-2 lg:rounded-l-md lg:rounded-tr-none">
          <ComponentHeader title="Encomende seu imóvel" />
          <h4 className="text-xl font-semibold text-white/70">
            Não encontrou o imóvel que está procurando?
          </h4>
          <p className="text-white/70">
            Preencha o formulário abaixo e um de nossos agentes entrará em
            contato com você para te ajudar a encontrar o imóvel ideal.
          </p>
          <ul className="space-y-2">
            {items.map((item, index) => (
              <li key={index} className="text-md text-white/70">
                <CheckCheck className="text-wilson-golden mr-2 inline-block h-5 w-5" />
                {item}
              </li>
            ))}
          </ul>
          <Button
            className="bg-gradient-wilson-golden w-full font-bold text-blue-950"
            asChild
          >
            <Link href="/encomende-seu-imovel">Encomende seu imóvel</Link>
          </Button>
        </div>
        <div className="relative h-87 lg:w-100 lg:flex-1">
          <Image
            src="/assets/banner-contato.jpg"
            alt="banner-contact-us"
            fill
            className="rounded-b-md object-cover lg:rounded-r-md lg:rounded-bl-none"
            sizes="(max-width: 1024px) 100vw, 400px"
          />
        </div>
      </div>
      {/* <DialogOrderYourProperty open={dialogOpen} onOpenChange={setDialogOpen} /> */}
    </section>
  )
}

export default BannerContactUs
