import { db } from "@/lib/prisma"

export async function getUsersChartData() {
  try {
    const now = new Date()

    const months = Array.from({ length: 6 }, (_, i) => {
      const date = new Date(now.getFullYear(), now.getMonth() - (5 - i), 1)
      const start = new Date(date.getFullYear(), date.getMonth(), 1)
      const end = new Date(
        date.getFullYear(),
        date.getMonth() + 1,
        0,
        23,
        59,
        59,
      )

      const label = new Intl.DateTimeFormat("pt-BR", { month: "long" }).format(
        date,
      )
      return {
        start,
        end,
        label: label.charAt(0).toUpperCase() + label.slice(1),
      }
    })

    const counts = await Promise.all(
      months.map((m) =>
        db.user.count({
          where: { createdAt: { gte: m.start, lte: m.end } },
        }),
      ),
    )

    return months.map((m, idx) => ({
      month: m.label,
      desktop: counts[idx],
    }))
  } catch (error) {
    console.error("Erro ao gerar dados do gráfico:", error)
    return []
  }
}
