import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import prisma from "@/lib/prisma"
import { NextResponse } from "next/server"

export async function POST(req) {
  try {
    const session = await getServerSession(authOptions)
    if (!session || session.user?.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await req.json()
    const {
      title,
      address,
      number,
      complement,
      neighborhood,
      city,
      state,
      zipCode,
      price,
      area,
      bedrooms,
      bathrooms,
      garageSpaces,
      type,
      status,
      imageUrls,
      featured,
      description,
    } = body

    // Campos obrigatórios (endereço NÃO é mais obrigatório)
    const hasRequired =
      title &&
      neighborhood &&
      city &&
      state &&
      typeof price !== "undefined" &&
      typeof bedrooms !== "undefined" &&
      typeof bathrooms !== "undefined" &&
      type
    if (!hasRequired) {
      return NextResponse.json(
        { error: "Campos obrigatórios faltando" },
        { status: 400 }
      )
    }

    const data = {
      title: String(title).trim(),
      // endereço opcional → salva vazio se não vier
      address: address ? String(address).trim() : "",
      number: number ? String(number).trim() : null,
      complement: complement ? String(complement).trim() : null,
      neighborhood: String(neighborhood).trim(),
      city: String(city).trim(),
      state: String(state).trim(),
      zipCode: zipCode ? String(zipCode).trim() : null,
      price: parseFloat(price),
      area: area != null ? parseFloat(area) : null,
      bedrooms: parseInt(bedrooms, 10),
      bathrooms: parseInt(bathrooms, 10),
      garageSpaces: garageSpaces != null ? parseInt(garageSpaces, 10) : 0,
      type,
      status:
        status &&
        ["ACTIVE", "PENDING", "SOLD", "SPECIAL_CONDITION", "INACTIVE", "RESERVED"].includes(status)
          ? status
          : undefined,
      imageUrls: Array.isArray(imageUrls)
        ? imageUrls.filter((x) => typeof x === "string")
        : [],
      featured: typeof featured === "boolean" ? featured : false,
      createdById: session.user.id,
      // descrição opcional: salva somente se vier
      description: description ? String(description).trim() : undefined,
    }

    // Geração do codRef via JavaScript (começando em 1000)
    const created = await prisma.$transaction(async (tx) => {
      // Busca o maior codRef atual
      const maxResult = await tx.property.aggregate({
        _max: { codRef: true }
      })
      
      // Define o próximo codRef (mínimo 1000)
      const nextCodeRef = Math.max((maxResult._max.codRef || 0) + 1, 1000)
      
      // Cria o imóvel com o codRef gerado
      return tx.property.create({
        data: { ...data, codRef: nextCodeRef },
        select: {
          id: true,
          title: true,
          city: true,
          status: true,
          price: true,
          createdAt: true,
          codRef: true,
        },
      })
    })

    return NextResponse.json(created, { status: 201 })
  } catch (err) {
    console.error("POST /api/imoveis error:", err)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}