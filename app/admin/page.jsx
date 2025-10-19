import prisma from "@/lib/prisma"
export const dynamic = "force-dynamic"
import HeaderAdmin from "./components/HeaderAdmin"
import Overview from "./components/Overview"
import QuickActions from "./components/QuickActions"
import Statistics from "./components/Statistics"

export default async function AdminPage() {
  const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)

  const [
    propertiesCount,
    usersCount,
    newUsersLast30Days,
    listingRequestsCount,
    propertyRequestsPendingCount,
  ] = await Promise.all([
    prisma.property.count(),
    prisma.user.count(),
    prisma.user.count({ where: { createdAt: { gte: thirtyDaysAgo } } }),
    prisma.listingRequest.count(),
    prisma.propertyRequest.count({ where: { status: "PENDING" } }),
  ])

  // Montar dados do gráfico: novos usuários por mês (últimos 6 meses)
  const now = new Date()
  const months = Array.from({ length: 6 }, (_, i) => {
    const date = new Date(now.getFullYear(), now.getMonth() - (5 - i), 1)
    const start = new Date(date.getFullYear(), date.getMonth(), 1)
    const end = new Date(date.getFullYear(), date.getMonth() + 1, 1)
    const label = new Intl.DateTimeFormat("pt-BR", { month: "long" }).format(date)
    return { start, end, label: label.charAt(0).toUpperCase() + label.slice(1) }
  })

  const usersPerMonthCounts = await Promise.all(
    months.map((m) =>
      prisma.user.count({
        where: { createdAt: { gte: m.start, lt: m.end } },
      }),
    ),
  )

  const usersPerMonthChartData = months.map((m, idx) => ({
    month: m.label, // ex.: "Abril", "Maio"
    desktop: usersPerMonthCounts[idx], // mantém a chave esperada pelo gráfico
  }))

  return (
    <div>
      <HeaderAdmin label="Painel Principal" />
      <Overview
        propertiesCount={propertiesCount}
        usersCount={usersCount}
        newUsersLast30Days={newUsersLast30Days}
        listingRequestsCount={listingRequestsCount}
        propertyRequestsPendingCount={propertyRequestsPendingCount}
      />
      <QuickActions />
      <Statistics chartData={usersPerMonthChartData} />
    </div>
  )
}
