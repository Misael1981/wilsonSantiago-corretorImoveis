import SubTitle from "../SubTitle"

const propertyTypes = [
  {
    id: 1,
    title: "Que tal uma casa nova?",
    imageUrl: "/assets/casa.jpg",
  },
  {
    id: 2,
    title: "Ou você prefere um apartamento?",
    imageUrl: "/assets/apartamento.png",
  },
  {
    id: 3,
    title: "Uma chácara pra um refúgio merecido?",
    imageUrl: "/assets/chacara.png",
  },
  {
    id: 4,
    title: "Procurando um imóvel comercial?",
    imageUrl: "/assets/loja.jpg",
  },
]

const PropertyCategory = () => {
  return (
    <section className="mt-4 p-4 lg:mt-6">
      <SubTitle
        title="Encontro o imóvel ideal para você"
        className="mb-6 text-center"
      />
      <div className="flex flex-wrap justify-center gap-4">
        {propertyTypes.map((item) => (
          <div
            key={item.id}
            className="h-[300px] w-[300px] max-w-[90%] rounded-lg bg-cover bg-center bg-no-repeat shadow-lg"
            style={{ backgroundImage: `url('${item.imageUrl}')` }}
          >
            <div className="flex h-full w-full items-end rounded-lg bg-black/30 p-4">
              <h3 className="font-bold text-white">{item.title}</h3>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default PropertyCategory
