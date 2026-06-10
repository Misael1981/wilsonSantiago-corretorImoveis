import HeaderAdmin from "@/components/HeaderAdmin"
import SubTitleUsers from "./components/SubTitleUsers"
import { getUsers } from "@/data/get-users"
import { calculateUserMetrics } from "@/helpers/user-metrics"
import StatsCards from "./components/StatsCards"
import FilterSearch from "./components/FilterSearch"
import UserCard from "./components/UserCard"

type UsuariosPageProps = {
  searchParams: Promise<{
    q?: string
    role?: string
  }>
}

export default async function UsuariosPage({
  searchParams,
}: UsuariosPageProps) {
  const params = await searchParams

  const q = typeof params.q === "string" ? params.q.toLowerCase() : ""
  const role = typeof params.role === "string" ? params.role : "ALL"

  const allUsers = await getUsers()

  const filteredUsers = allUsers.filter((user) => {
    const matchesSearch = q
      ? user.name?.toLowerCase().includes(q) ||
        user.email?.toLowerCase().includes(q)
      : true

    const matchesRole = role !== "ALL" ? user.role === role : true

    return matchesSearch && matchesRole
  })

  const metrics = calculateUserMetrics(allUsers)

  return (
    <div className="mx-auto max-w-5xl p-4">
      <HeaderAdmin label="Gerenciamento de Usuários" />

      <SubTitleUsers />

      <StatsCards metrics={metrics} />

      <FilterSearch />

      <section className="mt-8">
        <h2 className="mb-4 text-xl font-semibold">Lista de Usuários</h2>
        <div className="space-y-4">
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user) => <UserCard key={user.id} user={user} />)
          ) : (
            <p className="text-muted-foreground text-sm">
              Nenhum usuário encontrado com esses filtros.
            </p>
          )}
        </div>
      </section>
    </div>
  )
}
