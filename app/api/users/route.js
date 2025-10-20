import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import prisma from "@/lib/prisma"

export async function POST(req) {
  try {
    const session = await getServerSession(authOptions)
    if (!session || session.user?.role !== "ADMIN") {
      return new Response("Unauthorized", { status: 401 })
    }

    const body = await req.json()
    const { name, email, phone, role, isActive, image } = body

    if (!name || typeof name !== "string") {
      return new Response("Nome é obrigatório", { status: 400 })
    }

    const data = {
      name: name.trim(),
      email: typeof email === "string" ? email.trim() : null,
      phone: typeof phone === "string" ? phone.trim() : null,
      image: typeof image === "string" ? image.trim() : null,
      isActive: typeof isActive === "boolean" ? isActive : true,
      role: typeof role === "string" && ["USER", "ADMIN"].includes(role) ? role : "USER",
    }

    const created = await prisma.user.create({
      data,
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        image: true,
        role: true,
        isActive: true,
        createdAt: true,
      },
    })

    return new Response(JSON.stringify(created), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    })
  } catch (err) {
    // Tratamento de e-mail duplicado
    if (err?.code === "P2002") {
      return new Response("Email já cadastrado", { status: 400 })
    }
    console.error("POST /api/users error:", err)
    return new Response("Internal Server Error", { status: 500 })
  }
}