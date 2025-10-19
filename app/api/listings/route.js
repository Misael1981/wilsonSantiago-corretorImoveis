import prisma from "@/lib/prisma"
import { NextResponse } from "next/server"

const mapTipoToPropertyType = (tipo) => {
  const t = (tipo || "").toLowerCase()
  if (t === "casa") return "CASA"
  if (t === "apartamento") return "APARTAMENTO"
  if (t === "chacara") return "CHACARA"
  if (t === "terreno") return "TERRENO"
  if (t === "comercial") return "SALA_COMERCIAL"
  return "CASA"
}

export async function POST(req) {
  try {
    const body = await req.json()
    const {
      nome,
      email,
      telefone,
      cidade,
      titulo,
      descricao,
      valor,
      area,
      quartos,
      tipo,
      fotos,
    } = body || {}

    if (!nome || !telefone || !cidade || !titulo || !tipo) {
      return NextResponse.json(
        { error: "Campos obrigatórios ausentes" },
        { status: 400 },
      )
    }

    const created = await prisma.listingRequest.create({
      data: {
        name: nome,
        email: email ?? null,
        phone: telefone,
        city: cidade,
        state: null,
        type: mapTipoToPropertyType(tipo),
        title: titulo,
        description: descricao || null,
        price: valor ? parseFloat(valor) : null,
        area: area ? parseFloat(area) : null,
        bedrooms: quartos ? parseInt(quartos, 10) : null,
        imageUrls: Array.isArray(fotos) ? fotos : [],
        source: "cadastrar-imovel",
      },
      select: { id: true, status: true, createdAt: true },
    })

    return NextResponse.json({ ok: true, listing: created }, { status: 201 })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}
