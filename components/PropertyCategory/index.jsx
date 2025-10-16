import Link from "next/link"
import SubTitle from "../SubTitle"
import { Button } from "../ui/button"

const propertyTypes = [
  {
    id: 1,
    title: "Que tal uma casa nova?",
    imageUrl: "/assets/casa.jpg",
    href: "/imoveis?type=casa",
  },
  {
    id: 2,
    title: "Ou você prefere um apartamento?",
    imageUrl: "/assets/apartamento.png",
    href: "/imoveis?type=apartamento",
  },
  {
    id: 3,
    title: "Uma chácara pra um refúgio merecido?",
    imageUrl: "/assets/chacara.png",
    href: "/imoveis?type=chacara",
  },
  {
    id: 4,
    title: "Procurando um imóvel comercial?",
    imageUrl: "/assets/loja.jpg",
    href: "/imoveis?category=comercial",
  },
]

const PropertyCategory = () => {
  return (
    <section className="space-y-4 p-4">
      <SubTitle
        title="Encontro o imóvel ideal para você"
        className="mb-8 text-center"
      />
      <div className="flex flex-wrap justify-center gap-4">
        {propertyTypes.map((item) => (
          <Link
            href={item.href}
            key={item.id}
            aria-label={item.title}
            className="block h-[300px] w-[300px] max-w-[90%] p-0"
          >
            <div
              className="h-[300px] w-[300px] max-w-[90%] rounded-lg bg-cover bg-center bg-no-repeat shadow-lg"
              style={{ backgroundImage: `url('${item.imageUrl}')` }}
            >
              <div className="flex h-full w-full items-end rounded-lg bg-black/30 p-4">
                <h3 className="font-bold text-white">{item.title}</h3>
              </div>
            </div>
          </Link>
        ))}
      </div>
      <div className="flex justify-center">
        <Button
          className="bg-gradient-wilson-blue text-wilson-golden w-[300px] max-w-[90%]"
          asChild
        >
          <Link href="/imoveis">Ver todos os imóveis</Link>
        </Button>
      </div>
    </section>
  )
}

export default PropertyCategory
