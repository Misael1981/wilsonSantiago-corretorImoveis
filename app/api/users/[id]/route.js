import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import prisma from "@/lib/prisma"

export async function PATCH(req, { params }) {
  try {
    const session = await getServerSession(authOptions)
    if (!session || session.user?.role !== "ADMIN") {
      return new Response("Unauthorized", { status: 401 })
    }

    const id = params.id
    const body = await req.json()
    const { name, phone, role, isActive } = body

    const data = {}
    if (typeof name === "string") data.name = name
    if (typeof phone === "string") data.phone = phone
    if (typeof isActive === "boolean") data.isActive = isActive
    if (typeof role === "string" && ["USER", "ADMIN"].includes(role)) {
      data.role = role
    }

    const updated = await prisma.user.update({
      where: { id },
      data,
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        role: true,
        isActive: true,
        createdAt: true,
      },
    })

    return new Response(JSON.stringify(updated), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    })
  } catch (err) {
    console.error("PATCH /api/users/[id] error:", err)
    return new Response("Internal Server Error", { status: 500 })
  }
}

export async function DELETE(req, { params }) {
  try {
    const session = await getServerSession(authOptions)
    if (!session || session.user?.role !== "ADMIN") {
      return new Response("Unauthorized", { status: 401 })
    }

    const id = params.id
    // Evitar excluir a própria conta
    if (session.user?.id === id) {
      return new Response("Não é possível excluir sua própria conta.", { status: 400 })
    }

    await prisma.user.delete({ where: { id } })
    return new Response(null, { status: 204 })
  } catch (err) {
    console.error("DELETE /api/users/[id] error:", err)
    return new Response("Internal Server Error", { status: 500 })
  }
}