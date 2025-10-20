import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Check, Home, UserPlus } from "lucide-react"
import { FaEnvelopeOpen } from "react-icons/fa"

const stats = [
  {
    title: "Total de Imóveis",
    value: 100,
    icon: Home,
  },
  {
    title: "Imóveis Vendidos",
    value: 10,
    icon: Check,
  },
  {
    title: "Cadastro de Imóveis (Usuários)",
    value: 3,
    icon: UserPlus,
  },
  {
    title: "Imóveis Encomendados",
    value: 3,
    icon: FaEnvelopeOpen,
  },
]

const SummaryCards = () => {
  return (
    <section className="flex flex-wrap gap-4 p-4">
      {stats.map((stat) => (
        <Card className="w-[250px]" key={stat.title}>
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
