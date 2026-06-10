import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, ShieldCheck, Users } from "lucide-react"

type StatsCardsProps = {
  metrics: {
    totalUsers: number
    adminCount: number
    newUsersThisMonth: number
  }
}

const StatsCards = ({ metrics }: StatsCardsProps) => {
  const stats = [
    { title: "Total de Usuários", icon: Users, value: metrics.totalUsers },
    { title: "Administradores", icon: ShieldCheck, value: metrics.adminCount },
    { title: "Este mês", icon: Calendar, value: metrics.newUsersThisMonth },
  ]
  return (
    <section className="flex flex-wrap justify-center gap-4 p-4">
      {stats.map((stat) => (
        <Card className="w-60" key={stat.title}>
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

export default StatsCards
