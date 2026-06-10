"use server"

import { auth } from "@/lib/auth"
import { db } from "@/lib/prisma"
import { revalidatePath } from "next/cache"

interface OnboardingData {
  phone: string
  message?: string
}

export async function updateOnboardingDataAction({
  phone,
  message,
}: OnboardingData) {
  const session = await auth()

  if (!session?.user?.id) {
    throw new Error("Não autorizado. Faça login para continuar.")
  }

  const userId = session.user.id

  try {
    await db.user.update({
      where: { id: userId },
      data: {
        phone: phone.trim(),
        preferences: message?.trim() || null,
      },
    })

    revalidatePath("/")

    return { success: true }
  } catch (error) {
    console.error("Erro ao salvar onboarding no Prisma:", error)
    return { success: false, error: "Erro interno ao salvar os dados." }
  }
}
