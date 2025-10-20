import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import cloudinary from "@/lib/cloudinary"
import { NextResponse } from "next/server"

export const runtime = "nodejs"

export async function POST(req) {
  try {
    const session = await getServerSession(authOptions)
    if (!session || session.user?.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const formData = await req.formData()
    const files = formData.getAll("file")
    if (!files || files.length === 0) {
      return NextResponse.json({ error: "Nenhum arquivo enviado" }, { status: 400 })
    }

    const folder = formData.get("folder") || process.env.CLOUDINARY_UPLOAD_FOLDER || "properties"

    const uploadPromises = files.map(async (file) => {
      const arrayBuffer = await file.arrayBuffer()
      const buffer = Buffer.from(arrayBuffer)
      const base64 = buffer.toString("base64")
      const dataUri = `data:${file.type};base64,${base64}`

      const result = await cloudinary.uploader.upload(dataUri, {
        folder,
        resource_type: "image",
        overwrite: true,
      })

      return result.secure_url
    })

    const urls = await Promise.all(uploadPromises)
    return NextResponse.json({ urls }, { status: 200 })
  } catch (err) {
    console.error("Cloudinary upload error:", err)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}