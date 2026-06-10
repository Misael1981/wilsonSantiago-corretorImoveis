"use server"

import { db } from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export async function deleteUser(userId: string) {
  try {
    await db.user.delete({
      where: {
        id: userId,
      },
    })

    revalidatePath("/admin/usuarios")

    return {
      success: true,
    }
  } catch (error) {
    console.error("Erro ao deletar usuário:", error)

    return {
      success: false,
      message: "Erro ao deletar cargo",
    }
  }
}
