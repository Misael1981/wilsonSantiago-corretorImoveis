import prisma from "@/lib/prisma"
import { NextResponse } from "next/server"

const mapTipoToPropertyType = (tipo) => {
  const t = (tipo || "").toLowerCase()
  if (t === "casa") return "CASA"
  if (t === "apartamento") return "APARTAMENTO"
  if (t === "chacara") return "CHACARA"
  if (t === "terreno") return "TERRENO"
  if (t === "comercial") return "LOJA" // ajuste para SALA_COMERCIAL se preferir
  return "CASA"
}

export async function POST(req) {
  try {
    const body = await req.json()
    const {
      nome,
      telefone,
      tipo,
      cidade,
      bairro,
      precoMin,
      precoMax,
      descricao,
    } = body || {}

    // Validações básicas
    if (!nome || !telefone || !tipo || !cidade) {
      return NextResponse.json(
        { error: "Campos obrigatórios ausentes" },
        { status: 400 },
      )
    }
    const min = precoMin ? parseFloat(precoMin) : null
    const max = precoMax ? parseFloat(precoMax) : null
    if (min !== null && max !== null && min > max) {
      return NextResponse.json(
        { error: "Preço mínimo não pode ser maior que o máximo" },
        { status: 400 },
      )
    }

    const created = await prisma.propertyRequest.create({
      data: {
        name: nome,
        phone: telefone,
        type: mapTipoToPropertyType(tipo),
        city: cidade,
        neighborhood: bairro || null,
        minPrice: min,
        maxPrice: max,
        description: descricao || null,
        source: "dialog-order-property",
        // status: PENDING (default via enum)
      },
      select: { id: true, status: true, createdAt: true },
    })

    return NextResponse.json({ ok: true, request: created }, { status: 201 })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}