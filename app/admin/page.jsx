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
      <Statistics />
    </div>
  )
}
