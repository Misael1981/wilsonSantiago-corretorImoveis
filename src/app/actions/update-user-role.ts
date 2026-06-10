"use server"

import { Role } from "@/generated/prisma"
import { db } from "@/lib/prisma"
import { revalidatePath } from "next/cache"

type UpdateUserRoleProps = {
  userId: string
  role: Role
}

export async function updateUserRole({ userId, role }: UpdateUserRoleProps) {
  try {
    await db.user.update({
      where: {
        id: userId,
      },
      data: {
        role,
      },
    })

    revalidatePath("/admin/usuarios")

    return {
      success: true,
    }
  } catch (error) {
    console.error("Erro ao atualizar cargo do usuário:", error)

    return {
      success: false,
      message: "Erro ao atualizar cargo",
    }
  }
}
