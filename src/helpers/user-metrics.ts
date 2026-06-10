import { UserMetrics } from "@/dtos/data-for-admin.dto"

export const calculateUserMetrics = (users: UserMetrics[]) => {
  const now = new Date()
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)

  return {
    totalUsers: users.length,
    adminCount: users.filter((u) => u.role === "ADMIN").length,
    newUsersThisMonth: users.filter(
      (u) => new Date(u.createdAt) >= startOfMonth,
    ).length,
    active: users.filter((u) => u.isActive).length,
  }
}
