import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"

type MetricsCardsProps = {
  metrics: {
    title: string
    icon: React.ComponentType<{ className?: string }>
    value: number
  }[]
}

const MetricsCards = ({ metrics }: MetricsCardsProps) => {
  return (
    <section className="flex flex-wrap justify-center gap-4 p-4">
      {metrics.map((stat) => (
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

export default MetricsCards
