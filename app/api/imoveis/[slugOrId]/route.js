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

  const { slugOrId } = params;

  // Resolve o imóvel por id ou slug
  const found = await prisma.property.findFirst({
    where: {
      OR: [{ id: slugOrId }, { slug: slugOrId }],
    },
    select: { id: true },
  });

  if (!found) {
    return NextResponse.json({ message: "Imóvel não encontrado" }, { status: 404 });
  }

  const body = await req.json();

  // Helpers de sanitização
  const setIfPresent = (obj, key, value) => {
    if (value !== undefined) obj[key] = value;
  };
  const parseIntOrUndef = (v) => {
    if (v === "" || v === null || v === undefined) return undefined;
    const n = Number(v);
    return Number.isFinite(n) ? n : undefined;
  };
  const parseStringOrUndef = (v) => {
    if (v === "" || v === null || v === undefined) return undefined;
    return typeof v === "string" ? v.trim() : String(v);
  };
  const parseBoolOrUndef = (v) => {
    if (v === null || v === undefined) return undefined;
    if (v === true || v === false) return v;
    if (typeof v === "string") {
      if (v.toLowerCase() === "true") return true;
      if (v.toLowerCase() === "false") return false;
    }
    return undefined;
  };

  // Monte apenas campos válidos
  const data = {};
  setIfPresent(data, "title", parseStringOrUndef(body.title));
  setIfPresent(data, "description", parseStringOrUndef(body.description));
  setIfPresent(data, "price", parseIntOrUndef(body.price));
  setIfPresent(data, "city", parseStringOrUndef(body.city));
  setIfPresent(data, "featured", parseBoolOrUndef(body.featured));

  // Quartos/Banheiros: só atualiza se vier número válido
  setIfPresent(data, "bedrooms", parseIntOrUndef(body.bedrooms));
  setIfPresent(data, "bathrooms", parseIntOrUndef(body.bathrooms));

  // Endereço e afins
  setIfPresent(data, "address", parseStringOrUndef(body.address));
  setIfPresent(data, "number", parseStringOrUndef(body.number));
  setIfPresent(data, "complement", parseStringOrUndef(body.complement));
  setIfPresent(data, "zipCode", parseStringOrUndef(body.zipCode));
  setIfPresent(data, "state", parseStringOrUndef(body.state));
  setIfPresent(data, "youtubeId", parseStringOrUndef(body.youtubeId));

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
  });

  return NextResponse.json(updated);
}
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"