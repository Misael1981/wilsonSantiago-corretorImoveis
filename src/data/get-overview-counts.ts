import { db } from "@/lib/prisma"

export async function getOverviewCounts() {
  try {
    const thirtyDaysAgo = new Date()
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)

    const [
      propertiesCount,
      usersCount,
      newUsersLast30Days,
      listingRequestsCount,
      propertyRequestsPendingCount,
    ] = await Promise.all([
      db.property.count(),
      db.user.count(),
      db.user.count({ where: { createdAt: { gte: thirtyDaysAgo } } }),
      db.listingRequest.count(),
      db.propertyRequest.count({ where: { status: "PENDING" } }),
    ])

    return {
      propertiesCount,
      usersCount,
      newUsersLast30Days,
      listingRequestsCount,
      propertyRequestsPendingCount,
    }
  } catch (error) {
    console.error("Erro ao buscar contadores do dashboard:", error)
    return {
      propertiesCount: 0,
      usersCount: 0,
      newUsersLast30Days: 0,
      listingRequestsCount: 0,
      propertyRequestsPendingCount: 0,
    }
  }
}
