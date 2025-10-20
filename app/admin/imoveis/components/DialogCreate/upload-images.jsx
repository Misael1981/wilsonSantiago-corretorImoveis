"use client"

import { useState, useRef } from "react"
import { Upload } from "lucide-react"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"

export default function UploadImagens({ onUploaded }) {
  const [files, setFiles] = useState([])
  const [uploading, setUploading] = useState(false)
  const fileInputRef = useRef(null)

  const MAX_FILES = 10
  const MAX_SIZE = 5 * 1024 * 1024 // 5MB

  const handleFilesChange = (e) => {
    const selected = Array.from(e.target.files || [])
    if (selected.length === 0) return

    const invalidType = selected.some((f) => !f.type.startsWith("image/"))
    if (invalidType) {
      toast.error("Apenas imagens são permitidas.")
      return
    }
    const tooLarge = selected.some((f) => f.size > MAX_SIZE)
    if (tooLarge) {
      toast.error("Cada imagem deve ter no máximo 5MB.")
      return
    }

    const combined = [...files, ...selected]
    if (combined.length > MAX_FILES) {
      toast.error(`Máximo de ${MAX_FILES} fotos.`)
      setFiles(combined.slice(0, MAX_FILES))
      return
    }
    setFiles(combined)
  }

  const uploadImages = async () => {
    if (files.length === 0) {
      toast.error("Selecione pelo menos uma imagem")
      return
    }

    setUploading(true)
    try {
      const formData = new FormData()
      files.forEach((file) => formData.append("file", file))
      formData.append("folder", "properties")

      const res = await fetch("/api/uploads/image", {
        method: "POST",
        body: formData,
      })

      if (!res.ok) {
        if (res.status === 401) {
          toast.error("Você não tem permissão para enviar imagens.")
        } else {
          const text = await res.text()
          toast.error(text || "Erro ao enviar imagens")
        }
        return
      }

      const data = await res.json()
      const urls = Array.isArray(data.urls) ? data.urls : []

      if (typeof onUploaded === "function") {
        onUploaded(urls)
      }

      setFiles([])
      toast.success("Imagens enviadas com sucesso!")
    } catch (err) {
      console.error(err)
      toast.error("Falha no upload das imagens.")
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-gray-900">Fotos do Imóvel</h3>

      <div
        className="mb-4 cursor-pointer rounded-lg border-2 border-dashed border-gray-300 p-6 text-center"
        onClick={() => fileInputRef.current?.click()}
        role="button"
        tabIndex={0}
      >
        <Upload className="mx-auto h-12 w-12 text-gray-400" />
        <p className="mt-2 text-sm text-gray-600">
          Clique para adicionar fotos ou arraste aqui
        </p>
        <p className="text-xs text-gray-500">
          PNG, JPG até 5MB cada (máximo 10 fotos)
        </p>

        <input
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          id="fotos"
          ref={fileInputRef}
          onChange={handleFilesChange}
        />

        <Button
          type="button"
          variant="outline"
          className="mt-3"
          onClick={uploadImages}
          disabled={uploading || files.length === 0}
        >
          {uploading ? "Enviando..." : "Enviar imagens"}
        </Button>

        {files.length > 0 && (
          <div className="mt-4 grid grid-cols-3 gap-2">
            {files.slice(0, 6).map((file, index) => (
              <div key={index} className="relative">
                <img
                  src={URL.createObjectURL(file)}
                  alt={`Preview ${index + 1}`}
                  className="h-20 w-20 rounded object-cover"
                />
              </div>
            ))}

            {files.length > 6 && (
              <div className="flex h-20 w-20 items-center justify-center rounded bg-gray-100 text-sm text-gray-500">
                +{files.length - 6}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
