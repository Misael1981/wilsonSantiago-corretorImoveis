import SubTitle from "@/components/SubTitle"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"

const itens = [
  {
    id: 1,
    title: "Encomenda seu imóvel",
    description:
      "Não encontrou o imóvel que está procurando? Encomende seu imóvel de forma rápida e segura e nós encontramos pra vc",
    link: "#",
    image: "/assets/encomenda.svg",
  },
  {
    id: 2,
    title: "Finance seu imóvel",
    description:
      "Finance seu imóvel de forma simples e rápida, com os melhores juros do mercado",
    link: "#",
    image: "/assets/financas.svg",
  },
  {
    id: 3,
    title: "Cadastre seu imóvel",
    description:
      "Cadastre seu imóvel no portal mais dinâmico do mercado, e tenha acesso a um grande número de clientes",
    link: "#",
    image: "/assets/cadastro.svg",
  },
]

const Services = () => {
  return (
    <section className="boxed p-4">
      <SubTitle title="Serviços" />
      <div className="mt-8 flex w-full flex-wrap items-center justify-center gap-4 lg:justify-between">
        {itens.map((item) => (
          <Card key={item.id} className="h-[400px] w-[300px] max-w-[90%]">
            <CardContent className="flex h-full flex-col items-center justify-between">
              <div>
                <Image
                  src={item.image}
                  alt={item.title}
                  width={150}
                  height={150}
                />
              </div>
              <div className="mt-4 flex flex-col items-center justify-center gap-2">
                <h3 className="text-lg font-bold">{item.title}</h3>
                <p className="text-center text-sm text-gray-500">
                  {item.description}
                </p>
              </div>
              <div>
                <a
                  href={item.link}
                  className="text-sm font-semibold text-blue-700 hover:underline"
                >
                  Saiba mais
                </a>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}

export default Services
