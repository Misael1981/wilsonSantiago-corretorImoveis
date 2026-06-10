import Link from "next/link"
import SubTitle from "../SubTitle"
import { Button } from "../ui/button"

const propertyTypes = [
  {
    id: 1,
    title: "Que tal uma casa nova?",
    imageUrl: "/assets/casa.jpg",
    href: "/imoveis?type=CASA&page=1",
  },
  {
    id: 2,
    title: "Ou você prefere um apartamento?",
    imageUrl: "/assets/apartamento.png",
    href: "/imoveis?type=APARTAMENTO&page=1",
  },
  {
    id: 3,
    title: "Uma chácara pra um refúgio merecido?",
    imageUrl: "/assets/chacara.png",
    href: "/imoveis?type=CHACARA&page=1",
  },
  {
    id: 4,
    title: "Procurando um imóvel comercial?",
    imageUrl: "/assets/loja.jpg",
    href: "/imoveis?type=SALA_COMERCIAL&page=1",
  },
]

const PropertyCategory = () => {
  return (
    <section className="space-y-4 px-4 lg:px-12">
      <SubTitle
        title="Encontro o imóvel ideal para você"
        className="text-center"
      />
      <div className="flex flex-wrap justify-center gap-4">
        {propertyTypes.map((item) => (
          <Link
            href={item.href}
            key={item.id}
            aria-label={item.title}
            className="block h-75 w-75 max-w-[90%] p-0"
          >
            <div
              className="h-75 w-75 rounded-lg bg-cover bg-center bg-no-repeat shadow-lg"
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
          className="bg-gradient-wilson-blue text-wilson-golden w-75 max-w-[90%]"
          asChild
        >
          <Link href="/imoveis">Ver todos os imóveis</Link>
        </Button>
      </div>
    </section>
  )
}

export default PropertyCategory
