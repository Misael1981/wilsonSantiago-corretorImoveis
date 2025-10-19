"use client"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { TrendingUp } from "lucide-react"
import { CartesianGrid, LabelList, Line, LineChart, XAxis } from "recharts"

const chartData = [
  { month: "Abril", desktop: 186 },
  { month: "Maio", desktop: 305 },
  { month: "Junho", desktop: 237 },
  { month: "Julho", desktop: 73 },
  { month: "Set", desktop: 209 },
  { month: "Out", desktop: 214 },
]
const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "var(--chart-1)",
  },
}

const Statistics = () => {
  return (
    <section className="flex w-full justify-center p-4">
      <div className="w-full">
        <h2 className="text-2xl font-bold">Estatísticas</h2>
        <div className="my-4 flex items-center justify-center gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Fluxo de novos usuários</CardTitle>
              <CardDescription>
                <p className="leading-none text-gray-400">
                  <span className="text-sm capitalize">
                    {format(new Date(), "EEEE, dd", { locale: ptBR })}
                  </span>
                  <span className="text-sm">&nbsp;de&nbsp;</span>
                  <span className="text-sm capitalize">
                    {format(new Date(), "MMMM", { locale: ptBR })}
                  </span>
                </p>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig}>
                <LineChart
                  accessibilityLayer
                  data={chartData}
                  margin={{
                    top: 20,
                    left: 12,
                    right: 12,
                  }}
                >
                  <CartesianGrid vertical={false} />
                  <XAxis
                    dataKey="month"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                    tickFormatter={(value) => value.slice(0, 3)}
                  />
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent indicator="line" />}
                  />
                  <Line
                    dataKey="desktop"
                    type="natural"
                    stroke="var(--color-desktop)"
                    strokeWidth={2}
                    dot={{
                      fill: "var(--color-desktop)",
                    }}
                    activeDot={{
                      r: 6,
                    }}
                  >
                    <LabelList
                      position="top"
                      offset={12}
                      className="fill-foreground"
                      fontSize={12}
                    />
                  </Line>
                </LineChart>
              </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col items-start gap-2 text-sm">
              <div className="flex gap-2 leading-none font-medium">
                Tendência de alta de 5,2% neste mês{" "}
                <TrendingUp className="h-4 w-4" />
              </div>
              <div className="text-muted-foreground leading-none">
                Mostrando o total de novos usuários dos últimos 6 meses
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </section>
  )
}

export default Statistics
