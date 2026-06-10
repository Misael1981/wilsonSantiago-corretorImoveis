import { db } from "@/lib/prisma"

export async function getCustomers() {
  try {
    const customers = await db.customer.findMany({
      where: {
        isActive: true,
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 4,
      select: {
        id: true,
        name: true,
        testimonial: true,
        photo: true,
        rating: true,
        occupation: true,
        location: true,
        createdAt: true,
      },
    })

    return customers
  } catch (error) {
    console.error("Erro ao buscar usuários:", error)
    return []
  }
}
