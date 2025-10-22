import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Check, Home, UserPlus } from "lucide-react"
import { FaEnvelopeOpen } from "react-icons/fa"

const SummaryCards = ({
  totalProperties = 0,
  soldCount = 0,
  listingRequestsCount = 0,
  propertyRequestsCount = 0,
}) => {
  const stats = [
    { title: "Total de Imóveis", value: totalProperties, icon: Home },
    { title: "Imóveis Vendidos", value: soldCount, icon: Check },
    {
      title: "Cadastro de Imóveis (Usuários)",
      value: listingRequestsCount,
      icon: UserPlus,
    },
    {
      title: "Imóveis Encomendados",
      value: propertyRequestsCount,
      icon: FaEnvelopeOpen,
    },
  ]
  return (
    <section className="flex flex-wrap justify-center gap-4 p-4 lg:justify-between">
      {stats.map((stat) => (
        <Card className="h-[150px] w-[250px]" key={stat.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            <stat.icon className="text-muted-foreground h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
          </CardContent>
        </Card>
      ))}
    </section>
  )
}
export default SummaryCards
