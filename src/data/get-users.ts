import { db } from "@/lib/prisma"

export async function getUsers() {
  try {
    const users = await db.user.findMany({
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
    })

    return users
  } catch (error) {
    console.error("Erro ao buscar usuários:", error)
    return []
  }
}
