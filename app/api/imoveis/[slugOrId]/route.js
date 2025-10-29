import prisma from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function GET(req, { params }) {
  const p = await params
  const { slugOrId } = p

  try {
    const property = await prisma.property.findFirst({
      where: { OR: [{ id: slugOrId }, { slug: slugOrId }] },
      select: { id: true, slug: true, title: true },
    })

    if (!property) {
      return NextResponse.json({ error: "Not found" }, { status: 404 })
    }

    return NextResponse.json(property, { status: 200 })
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}

export async function DELETE(req, { params }) {
  const session = await getServerSession(authOptions)
  if (!session || session.user?.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { slugOrId } = await params
  try {
    const found = await prisma.property.findFirst({
      where: { OR: [{ id: slugOrId }, { slug: slugOrId }] },
      select: { id: true },
    })
    if (!found) {
      return NextResponse.json({ error: "Not found" }, { status: 404 })
    }

    await prisma.property.delete({ where: { id: found.id } })
    return NextResponse.json({ ok: true }, { status: 200 })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}

export async function PUT(req, { params }) {
  const session = await getServerSession(authOptions)
  if (!session || session.user?.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { slugOrId } = await params
  try {
    const body = await req.json()
    const found = await prisma.property.findFirst({
      where: { OR: [{ id: slugOrId }, { slug: slugOrId }] },
      select: { id: true },
    })
    if (!found) {
      return NextResponse.json({ error: "Not found" }, { status: 404 })
    }

    const allowed = [
      "title",
      "type",
      "status",
      "price",
      "address",
      "number",
      "complement",
      "neighborhood",
      "city",
      "state",
      "zipCode",
      "bedrooms",
      "bathrooms",
      "garageSpaces",
      "area",
      "imageUrls",
      "featured",
      "description", // permite atualizar a descrição
    ]
    const data = Object.fromEntries(
      Object.entries(body).filter(([k]) => allowed.includes(k))
    )

    const updated = await prisma.property.update({
      where: { id: found.id },
      data,
      select: {
        id: true,
        slug: true,
        title: true,
        type: true,
        status: true,
        price: true,
        city: true,
        featured: true,
      },
    })
    return NextResponse.json(updated, { status: 200 })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"