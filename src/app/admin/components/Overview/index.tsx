import { Card, CardContent } from "@/components/ui/card"

type OverviewProps = {
  data: {
    propertiesCount: number
    usersCount: number
    newUsersLast30Days: number
    propertyRequestsPendingCount: number
    listingRequestsCount: number
  }
}

const Overview = ({ data }: OverviewProps) => {
  const valuesCard = [
    { title: "Imóveis Disponíveis", value: data.propertiesCount ?? 0 },
    { title: "Número de Usuários", value: data.usersCount ?? 0 },
    {
      title: "Novos Usuários (Último Mês)",
      value: data.newUsersLast30Days ?? 0,
    },
    {
      title: "Encomendas de imóveis (pendentes)",
      value: data.propertyRequestsPendingCount ?? 0,
    },
    {
      title: "Pedidos para cadastros de imóveis",
      value: data.listingRequestsCount ?? 0,
    },
  ]

  return (
    <section className="flex w-full justify-center p-4">
      <div>
        <h2 className="text-2xl font-bold">Visão Geral</h2>
        <div className="my-4 flex flex-wrap justify-center gap-4 lg:justify-center">
          {valuesCard.map((value) => (
            <Card key={value.title} className="w-75 max-w-[90%] p-0">
              <CardContent className="p-4">
                <div className="flex h-25 flex-col justify-between gap-4">
                  <h3 className="text-center text-xl font-bold text-gray-600">
                    {value.title}
                  </h3>
                  <p className="text-center text-3xl font-bold text-green-600">
                    {value.value}
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
