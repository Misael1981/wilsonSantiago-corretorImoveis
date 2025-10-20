import prisma from "@/lib/prisma"
export const dynamic = "force-dynamic"
import HeaderAdmin from "../components/HeaderAdmin"
import SubTitleUsers from "./components/SubTitleUsers"
import StatsCards from "./components/StatsCards"
import FiltersSearch from "./components/FiltersSearch"
import UserList from "./components/UserList"

export default async function Usuarios({ searchParams }) {
  const params = await searchParams

  const q = typeof params?.q === "string" ? params.q : ""
  const role = typeof params?.role === "string" ? params.role : undefined
  const verified =
    typeof params?.verified === "string" ? params.verified : undefined

  const where = { AND: [] }
  if (q) {
    where.AND.push({
      OR: [
        { name: { contains: q, mode: "insensitive" } },
        { email: { contains: q, mode: "insensitive" } },
      ],
    })
  }
  if (role === "ADMIN") {
    where.AND.push({ role: "ADMIN" })
  }
  if (verified === "true") {
    where.AND.push({ NOT: { emailVerified: null } })
  }
  if (verified === "false") {
    where.AND.push({ emailVerified: null })
  }

  const now = new Date()
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)

  const [users, totalUsers, adminCount, verifiedCount, newUsersThisMonth] =
    await Promise.all([
      prisma.user.findMany({
        where: where.AND.length ? where : undefined,
        orderBy: { createdAt: "desc" },
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          isActive: true,
          createdAt: true,
          phone: true,
        },
      }),
      prisma.user.count(),
      prisma.user.count({ where: { role: "ADMIN" } }),
      prisma.user.count({ where: { NOT: { emailVerified: null } } }),
      prisma.user.count({ where: { createdAt: { gte: startOfMonth } } }),
    ])

  return (
    <>
      <HeaderAdmin label="Usuários" />
      <SubTitleUsers />
      <StatsCards
        totalUsers={totalUsers}
        adminCount={adminCount}
        verifiedCount={verifiedCount}
        newUsersThisMonth={newUsersThisMonth}
      />
      <FiltersSearch q={q} role={role} verified={verified} />
      <UserList users={users} />
    </>
  )
}
