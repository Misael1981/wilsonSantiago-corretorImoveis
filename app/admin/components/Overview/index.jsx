import { Card, CardContent } from "@/components/ui/card"

const Overview = ({
  propertiesCount,
  usersCount,
  newUsersLast30Days,
  propertyRequestsPendingCount,
  listingRequestsCount,
}) => {
  const cards = [
    { title: "Imóveis Disponíveis", value: propertiesCount ?? 0 },
    { title: "Número de Usuários", value: usersCount ?? 0 },
    { title: "Novos Usuários (Último Mês)", value: newUsersLast30Days ?? 0 },
    {
      title: "Encomendas de imóveis (pendentes)",
      value: propertyRequestsPendingCount ?? 0,
    },
    {
      title: "Pedidos para cadastros de imóveis",
      value: listingRequestsCount ?? 0,
    },
  ]

  return (
    <section className="flex w-full justify-center p-4">
      <div>
        <h2 className="text-2xl font-bold">Visão Geral</h2>
        <div className="my-4 flex flex-wrap justify-center gap-4 lg:justify-start">
          {cards.map((card) => (
            <Card key={card.title} className="w-[300px] max-w-[90%] p-0">
              <CardContent className="p-4">
                <div className="flex h-[100px] flex-col justify-between gap-4">
                  <h3 className="text-center text-xl font-bold text-gray-600">
                    {card.title}
                  </h3>
                  <p className="text-center text-3xl font-bold text-green-600">
                    {card.value}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Overview
