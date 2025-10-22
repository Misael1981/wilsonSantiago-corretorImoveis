import prisma from "@/lib/prisma"

export async function GET() {
  try {
    const tags = await prisma.tag.findMany({
      orderBy: { name: "asc" },
      select: { id: true, name: true, slug: true, color: true },
    })
    return new Response(JSON.stringify(tags), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    })
  } catch (err) {
    console.error("GET /api/tags error:", err)
    return new Response("Internal Server Error", { status: 500 })
  }
}