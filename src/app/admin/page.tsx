import HeaderAdmin from "@/components/HeaderAdmin"
import { getOverviewCounts } from "@/data/get-overview-counts"
import Overview from "./components/Overview"
import QuickActions from "./components/QuickActions"
import { getUsersChartData } from "@/data/get-users-chart-data"
import Statistics from "./components/Statistics"

export default async function AdminPage() {
  const [overviewData, chartData] = await Promise.all([
    getOverviewCounts(),
    getUsersChartData(),
  ])

  return (
    <div className="mx-auto max-w-5xl p-4">
      <HeaderAdmin label="Painel Principal" />
      <Overview data={overviewData} />
      <QuickActions />
      <Statistics chartData={chartData} />
    </div>
  )
}
