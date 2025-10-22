"use client"

import { useEffect, useRef, useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "@/components/ui/sonner"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu"

const DialogCreatePost = () => {
  const router = useRouter()
  const fileRef = useRef(null)
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [uploading, setUploading] = useState(false)

  const [form, setForm] = useState({
    title: "",
    excerpt: "",
    imageUrl: "",
    content: "",
    published: false,
    metaTitle: "",
    metaDescription: "",
  })
  const [tags, setTags] = useState([])
  const [selectedTagIds, setSelectedTagIds] = useState([])

  const update = (key, val) => setForm((f) => ({ ...f, [key]: val }))
  const toggleTag = (id) =>
    setSelectedTagIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    )

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const res = await fetch("/api/tags")
        if (!res.ok) throw new Error(await res.text())
        const data = await res.json()
        setTags(Array.isArray(data) ? data : data.tags || [])
      } catch (err) {
        console.error(err)
        toast.error("Falha ao carregar tags")
      }
    }
    fetchTags()
  }, [])

  const handleUpload = async (file) => {
    if (!file) return
    setUploading(true)
    try {
      const fd = new FormData()
      fd.append("file", file)
      fd.append("folder", "articles_images")
      const res = await fetch("/api/uploads/image", {
        method: "POST",
        body: fd,
      })
      if (!res.ok) {
        const msg = await res.text()
        throw new Error(msg || "Falha no upload")
      }
      const json = await res.json()
      const url = json?.urls?.[0]
      if (!url) throw new Error("Upload não retornou URL")
      update("imageUrl", url)
      toast.success("Imagem enviada!")
    } catch (err) {
      console.error(err)
      toast.error(err.message || "Erro no upload")
    } finally {
      setUploading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.title.trim() || !form.content.trim()) {
      toast.error("Título e conteúdo são obrigatórios")
      return
    }
    setLoading(true)
    try {
      const res = await fetch("/api/articles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          tags: selectedTagIds, // envia IDs das tags selecionadas
        }),
      })
      if (!res.ok) {
        const msg = await res.text()
        throw new Error(msg || "Falha ao criar post")
      }
      toast.success("Post criado com sucesso!")
      setOpen(false)
      router.refresh()
      setForm({
        title: "",
        excerpt: "",
        imageUrl: "",
        content: "",
        published: false,
        metaTitle: "",
        metaDescription: "",
      })
      setSelectedTagIds([])
    } catch (err) {
      toast.error(err.message || "Erro ao criar post")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-gradient-wilson-blue px-6 py-4 text-lg text-white">
          + Novo Post
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Novo Post</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label>Título</Label>
            <Input
              value={form.title}
              onChange={(e) => update("title", e.target.value)}
              placeholder="Título do post"
              required
            />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <Label>Resumo (excerpt)</Label>
              <Input
                value={form.excerpt}
                onChange={(e) => update("excerpt", e.target.value)}
                placeholder="Resumo curto (opcional)"
              />
            </div>

            <div>
              <Label>Imagem</Label>
              <div className="flex items-center gap-2">
                <Input
                  readOnly
                  value={form.imageUrl}
                  placeholder="URL da imagem (upload abaixo)"
                />
                <Button
                  type="button"
                  variant="outline"
                  disabled={uploading}
                  onClick={() => fileRef.current?.click()}
                >
                  {uploading ? "Enviando..." : "Upload"}
                </Button>
                <input
                  type="file"
                  accept="image/*"
                  ref={fileRef}
                  className="hidden"
                  onChange={(e) => handleUpload(e.target.files?.[0])}
                />
              </div>
            </div>

            {form.imageUrl ? (
              <div className="sm:col-span-2">
                <img
                  src={form.imageUrl}
                  alt="Prévia da imagem"
                  className="h-36 w-full rounded object-cover"
                />
              </div>
            ) : null}
          </div>

          <div>
            <Label>Conteúdo</Label>
            <Textarea
              value={form.content}
              onChange={(e) => update("content", e.target.value)}
              placeholder="Conteúdo do artigo"
              rows={8}
              required
            />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="flex items-center gap-2">
              <Switch
                checked={form.published}
                onCheckedChange={(v) => update("published", v)}
                id="published"
              />
              <Label htmlFor="published">Publicado</Label>
            </div>

            <div>
              <Label>Tags</Label>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">
                    {selectedTagIds.length
                      ? `Selecionadas (${selectedTagIds.length})`
                      : "Selecionar tags"}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  {tags.map((t) => (
                    <DropdownMenuCheckboxItem
                      key={t.id}
                      checked={selectedTagIds.includes(t.id)}
                      onCheckedChange={() => toggleTag(t.id)}
                    >
                      {t.name}
                    </DropdownMenuCheckboxItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
              {selectedTagIds.length > 0 && (
                <div className="mt-2 text-sm text-muted-foreground">
                  {tags
                    .filter((t) => selectedTagIds.includes(t.id))
                    .map((t) => t.name)
                    .join(", ")}
                </div>
              )}
            </div>

            <div>
              <Label>Meta Title</Label>
              <Input
                value={form.metaTitle}
                onChange={(e) => update("metaTitle", e.target.value)}
                placeholder="Meta Title (opcional)"
              />
            </div>

            <div className="sm:col-span-2">
              <Label>Meta Description</Label>
              <Input
                value={form.metaDescription}
                onChange={(e) => update("metaDescription", e.target.value)}
                placeholder="Meta Description (opcional)"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancelar
            </Button>
            <Button type="submit" disabled={loading || uploading}>
              {loading ? "Salvando..." : "Salvar"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default DialogCreatePost