"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { toast } from "sonner"
import UploadImagens from "./upload-images"
const PROPERTY_TYPES = [
  "CASA",
  "APARTAMENTO",
  "TERRENO",
  "LOJA",
  "CHACARA",
  "SITIO",
  "GALPAO",
  "SALA_COMERCIAL",
]

const PROPERTY_STATUSES = [
  "ACTIVE",
  "PENDING",
  "SOLD",
  "SPECIAL_CONDITION",
  "INACTIVE",
  "RESERVED",
]

export default function DialogCreate({ open, onOpenChange, onSubmit, initialData, dialogTitle = "Novo Imóvel", submitText = "Criar Imóvel" }) {
  const [form, setForm] = useState({
    title: "",
    type: "CASA",
    status: "ACTIVE",
    price: "",
    address: "",
    number: "",
    complement: "",
    neighborhood: "",
    city: "",
    state: "",
    zipCode: "",
    bedrooms: "",
    bathrooms: "",
    garageSpaces: "0",
    area: "",
    imageUrlsText: "",
    imageUrls: [],
    featured: false,
  })

  const parseNumbers = (v, isInt = false) => {
    const n = isInt ? parseInt(v, 10) : parseFloat(v)
    return Number.isFinite(n) ? n : undefined
  }

  // Upload de fotos (Cloudinary)
  const fileInputRef = useRef(null)
  const [files, setFiles] = useState([])
  const [uploading, setUploading] = useState(false)
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

  const handleChooseFiles = () => {
    fileInputRef.current?.click()
  }

  const uploadImages = async () => {
    if (files.length === 0) {
      toast.error("Selecione imagens antes de enviar.")
      return
    }
    setUploading(true)
    try {
      const fd = new FormData()
      files.forEach((f) => fd.append("file", f))
      fd.append("folder", "properties")

      const res = await fetch("/api/uploads/image", {
        method: "POST",
        body: fd,
      })
      if (!res.ok) {
        const text = await res.text()
        throw new Error(text || "Falha ao enviar imagens")
      }
      const data = await res.json()
      const urls = Array.isArray(data.urls) ? data.urls : []
      setForm((prev) => ({
        ...prev,
        imageUrls: [...(prev.imageUrls || []), ...urls],
      }))
      setFiles([])
      toast.success("Imagens enviadas com sucesso!")
    } catch (err) {
      console.error(err)
      toast.error("Erro ao enviar imagens.")
    } finally {
      setUploading(false)
    }
  }

  const handleSave = () => {
    const required = [
      form.title,
      form.address,
      form.neighborhood,
      form.city,
      form.state,
      form.price,
      form.bedrooms,
      form.bathrooms,
      form.type,
    ]
    if (required.some((x) => !x || String(x).trim() === "")) {
      return
    }

    const imageUrls =
      form.imageUrlsText
        .split(",")
        .map((s) => s.trim())
        .filter((s) => s.length > 0) || []

    onSubmit({
      ...form,
      price: parseNumbers(form.price),
      area: form.area ? parseNumbers(form.area) : undefined,
      bedrooms: parseNumbers(form.bedrooms, true),
      bathrooms: parseNumbers(form.bathrooms, true),
      garageSpaces:
        form.garageSpaces !== "" ? parseNumbers(form.garageSpaces, true) : 0,
      imageUrls,
    })
  }

  useEffect(() => {
    if (!initialData) return
    setForm((prev) => ({
      ...prev,
      title: initialData.title || "",
      type: initialData.type || prev.type,
      status: initialData.status || prev.status,
      price: initialData.price != null ? String(initialData.price) : "",
      address: initialData.address || "",
      number: initialData.number || "",
      complement: initialData.complement || "",
      neighborhood: initialData.neighborhood || "",
      city: initialData.city || "",
      state: initialData.state || "",
      zipCode: initialData.zipCode || "",
      bedrooms: initialData.bedrooms != null ? String(initialData.bedrooms) : "",
      bathrooms: initialData.bathrooms != null ? String(initialData.bathrooms) : "",
      garageSpaces: initialData.garageSpaces != null ? String(initialData.garageSpaces) : "0",
      area: initialData.area != null ? String(initialData.area) : "",
      imageUrlsText: "",
      imageUrls: Array.isArray(initialData.imageUrls) ? initialData.imageUrls : [],
      featured: !!initialData.featured,
    }))
  }, [initialData])

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] max-w-3xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{dialogTitle}</DialogTitle>
          <DialogDescription>Preencha os dados do imóvel</DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="title">Título *</Label>
              <Input
                id="title"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                placeholder="Ex.: Casa ampla com quintal"
              />
            </div>
            <div className="space-y-2">
              <Label>Tipo *</Label>
              <Select
                value={form.type}
                onValueChange={(v) => setForm({ ...form, type: v })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o tipo" />
                </SelectTrigger>
                <SelectContent>
                  {PROPERTY_TYPES.map((t) => (
                    <SelectItem key={t} value={t}>
                      {t}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="address">Endereço *</Label>
            <Input
              id="address"
              value={form.address}
              onChange={(e) => setForm({ ...form, address: e.target.value })}
              placeholder="Rua Exemplo"
            />
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="number">Número</Label>
              <Input
                id="number"
                value={form.number}
                onChange={(e) => setForm({ ...form, number: e.target.value })}
                placeholder="123"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="complement">Complemento</Label>
              <Input
                id="complement"
                value={form.complement}
                onChange={(e) =>
                  setForm({ ...form, complement: e.target.value })
                }
                placeholder="Apto 101"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="zipCode">CEP</Label>
              <Input
                id="zipCode"
                value={form.zipCode}
                onChange={(e) => setForm({ ...form, zipCode: e.target.value })}
                placeholder="00000-000"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="neighborhood">Bairro *</Label>
              <Input
                id="neighborhood"
                value={form.neighborhood}
                onChange={(e) =>
                  setForm({ ...form, neighborhood: e.target.value })
                }
                placeholder="Centro"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="city">Cidade *</Label>
              <Input
                id="city"
                value={form.city}
                onChange={(e) => setForm({ ...form, city: e.target.value })}
                placeholder="Montes Claros"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="state">Estado *</Label>
              <Input
                id="state"
                value={form.state}
                onChange={(e) => setForm({ ...form, state: e.target.value })}
                placeholder="MG"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
            <div className="space-y-2">
              <Label htmlFor="price">Preço *</Label>
              <Input
                id="price"
                type="number"
                value={form.price}
                onChange={(e) => setForm({ ...form, price: e.target.value })}
                placeholder="350000"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="area">Área (m²)</Label>
              <Input
                id="area"
                type="number"
                value={form.area}
                onChange={(e) => setForm({ ...form, area: e.target.value })}
                placeholder="150"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="bedrooms">Quartos *</Label>
              <Input
                id="bedrooms"
                type="number"
                value={form.bedrooms}
                onChange={(e) => setForm({ ...form, bedrooms: e.target.value })}
                placeholder="3"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="bathrooms">Banheiros *</Label>
              <Input
                id="bathrooms"
                type="number"
                value={form.bathrooms}
                onChange={(e) =>
                  setForm({ ...form, bathrooms: e.target.value })
                }
                placeholder="2"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="garageSpaces">Vagas</Label>
              <Input
                id="garageSpaces"
                type="number"
                value={form.garageSpaces}
                onChange={(e) =>
                  setForm({ ...form, garageSpaces: e.target.value })
                }
                placeholder="1"
              />
            </div>
            <div className="flex items-center gap-2 pt-6">
              <Switch
                id="featured"
                checked={form.featured}
                onCheckedChange={(checked) =>
                  setForm({ ...form, featured: checked })
                }
              />
              <Label htmlFor="featured">Destaque</Label>
            </div>
          </div>
          <div className="space-y-2">
            <Label>Status</Label>
            <Select
              value={form.status}
              onValueChange={(v) => setForm({ ...form, status: v })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione o status" />
              </SelectTrigger>
              <SelectContent>
                {PROPERTY_STATUSES.map((s) => (
                  <SelectItem key={s} value={s}>
                    {s}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <UploadImagens
              onUploaded={(urls) =>
                setForm((prev) => ({
                  ...prev,
                  imageUrls: [...(prev.imageUrls || []), ...urls],
                }))
              }
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button onClick={handleSave}>{submitText}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
