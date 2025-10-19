import prisma from "@/lib/prisma"
export const dynamic = "force-dynamic"
import HeaderAdmin from "./components/HeaderAdmin"
import Overview from "./components/Overview"
import QuickActions from "./components/QuickActions"
import Statistics from "./components/Statistics"

export default async function AdminPage() {
  const [propertiesCount, usersCount, pendingOrdersCount] = await Promise.all([
    prisma.property.count(),
    prisma.user.count(),
    prisma.contact.count({ where: { status: "PENDING" } }),
  ])
  return (
    <div>
      <HeaderAdmin label="Painel Principal" />
      <Overview
        propertiesCount={propertiesCount}
        usersCount={usersCount}
        pendingOrdersCount={pendingOrdersCount}
      />
      <QuickActions />
      <Statistics />
    </div>
  )
}
