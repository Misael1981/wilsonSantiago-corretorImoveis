import { Role } from "@/generated/prisma"

export type UserMetrics = {
  name: string | null
  id: string
  email: string | null
  phone: string | null
  role: Role
  isActive: boolean
  createdAt: Date
}
