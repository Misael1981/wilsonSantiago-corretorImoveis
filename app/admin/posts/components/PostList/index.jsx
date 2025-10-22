"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Edit, MoreHorizontal, Trash2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { toast } from "@/components/ui/sonner"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { useState } from "react"

function PostList({ posts }) {
  const router = useRouter()
  const [editDialogOpen, setEditDialogOpen] = useState(false)
  const [editingPost, setEditingPost] = useState(null)
  const [updating, setUpdating] = useState(false)
  const [updateForm, setUpdateForm] = useState({
    published: false,
    featured: false,
  })

  const formatDate = (date) =>
    new Date(date).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    })

  const handleEdit = (post) => {
    setEditingPost(post)
    setUpdateForm({
      published: !!post.published,
      featured: !!post.featured,
    })
    setEditDialogOpen(true)
  }

  const handleDelete = async (post) => {
    try {
      setUpdating(true)
      const res = await fetch(`/api/articles/${post.id}`, { method: "DELETE" })
      if (!res.ok) {
        const msg = await res.text()
        throw new Error(msg || "Falha ao excluir o post")
      }
      toast.success("Post excluído")
      router.refresh()
    } catch (err) {
      toast.error(err.message || "Erro ao excluir")
    } finally {
      setUpdating(false)
    }
  }

  const submitUpdate = async () => {
    if (!editingPost) return
    try {
      setUpdating(true)
      const res = await fetch(`/api/articles/${editingPost.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updateForm),
      })
      if (!res.ok) {
        const msg = await res.text()
        throw new Error(msg || "Falha ao atualizar")
      }
      toast.success("Post atualizado")
      setEditDialogOpen(false)
      setEditingPost(null)
      router.refresh()
    } catch (err) {
      toast.error(err.message || "Erro ao atualizar")
    } finally {
      setUpdating(false)
    }
  }
  return (
    <section className="w-full p-4">
      <div className="mb-4 pl-4">
        <h2 className="text-2xl font-semibold">Lista de artigos publicados</h2>
        <span className="text-muted-foreground text-sm">
          Total: {posts?.length ?? 0}
        </span>
      </div>
      <div className="space-y-4">
        {posts.map((post) => (
          <Card key={post.id}>
            <CardContent>
              <div className="flex items-center justify-between gap-2">
                <div className="flex w-fit flex-col truncate">
                  <h2 className="truncate text-lg font-semibold">
                    {post.title}
                  </h2>
                  <p className="text-muted-foreground text-sm">
                    {post.publishedAt ? formatDate(post.publishedAt) : "—"}
                  </p>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      className="border-accent border"
                      variant="ghost"
                      size="sm"
                    >
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem
                      className="cursor-pointer"
                      onClick={() => handleEdit(post)}
                    >
                      <Edit className="mr-2 h-4 w-4" />
                      Editar Status
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="text-destructive cursor-pointer"
                      onClick={() => handleDelete(post)}
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      Excluir
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Editar Post</DialogTitle>
          </DialogHeader>

          {editingPost ? (
            <div className="space-y-4">
              <div className="text-sm">
                <div className="font-semibold">{editingPost.title}</div>
                <div className="text-muted-foreground">
                  slug: {editingPost.slug ?? "—"}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Switch
                  id="published"
                  checked={updateForm.published}
                  onCheckedChange={(v) =>
                    setUpdateForm((f) => ({ ...f, published: v }))
                  }
                />
                <Label htmlFor="published">Publicado</Label>
              </div>

              <div className="flex items-center gap-2">
                <Switch
                  id="featured"
                  checked={updateForm.featured}
                  onCheckedChange={(v) =>
                    setUpdateForm((f) => ({ ...f, featured: v }))
                  }
                />
                <Label htmlFor="featured">Destaque</Label>
              </div>

              <div className="flex justify-end gap-2">
                <Button
                  variant="outline"
                  onClick={() => setEditDialogOpen(false)}
                >
                  Cancelar
                </Button>
                <Button onClick={submitUpdate} disabled={updating}>
                  {updating ? "Salvando..." : "Salvar"}
                </Button>
              </div>
            </div>
          ) : null}
        </DialogContent>
      </Dialog>
    </section>
  )
}

export default PostList
