"use server"

import { db } from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export async function deletePost(postId: string) {
  try {
    await db.article.delete({
      where: {
        id: postId,
      },
    })

    revalidatePath("/admin/posts")

    return {
      success: true,
    }
  } catch (error) {
    console.error("Error deleting post:", error)
    throw new Error("Failed to delete post")
  }
}
