import prisma from "@/lib/prisma"
import { NextResponse } from "next/server"

const allowed = ["PENDING", "REVIEWED", "APPROVED", "REJECTED"]

export async function PATCH(req, { params }) {
  try {
    const { id } = await params
    const body = await req.json()
    const { status } = body || {}

    if (!allowed.includes(status)) {
      return NextResponse.json({ error: "Status inválido" }, { status: 400 })
    }

    const exists = await prisma.listingRequest.findUnique({
      where: { id },
      select: { id: true },
    })
    if (!exists) {
      return NextResponse.json({ error: "Not found" }, { status: 404 })
    }

    const updated = await prisma.listingRequest.update({
      where: { id },
      data: { status },
      select: { id: true, status: true, updatedAt: true },
    })

    return NextResponse.json({ ok: true, listing: updated }, { status: 200 })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}