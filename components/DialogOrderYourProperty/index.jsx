"use client"

import { Button } from "../ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { useState } from "react"
import { toast } from "sonner"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select"
import { Textarea } from "../ui/textarea"

const DialogOrderYourProperty = ({ trigger }) => {
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState({
    nome: "",
    telefone: "",
    tipo: "",
    cidade: "",
    bairro: "",
    precoMin: "",
    precoMax: "",
    descricao: "",
  })

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // TODO: enviar para API real (ex: POST /api/encomendas)
    toast.success("Solicitação enviada! Entraremos em contato.")
    setOpen(false)
    setForm({
      nome: "",
      telefone: "",
      tipo: "",
      cidade: "",
      bairro: "",
      precoMin: "",
      precoMax: "",
      descricao: "",
    })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger ?? <Button variant="outline">Encomende seu Imóvel</Button>}
      </DialogTrigger>

      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-[520px]">
        <DialogHeader>
          <DialogTitle>Encomende seu Imóvel</DialogTitle>
          <DialogDescription>
            Conte rapidamente o que você procura e nós retornamos com opções.
          </DialogDescription>
        </DialogHeader>

        {/* ABERTURA DO FORM (faltava) */}
        <form onSubmit={handleSubmit} className="grid gap-4">
          {/* Dados de contato */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="grid gap-2">
              <Label htmlFor="nome">Nome</Label>
              <Input
                id="nome"
                name="nome"
                value={form.nome}
                onChange={(e) => handleChange("nome", e.target.value)}
                placeholder="Seu nome"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="telefone">Telefone/WhatsApp</Label>
              <Input
                id="telefone"
                name="telefone"
                value={form.telefone}
                onChange={(e) => handleChange("telefone", e.target.value)}
                placeholder="(35) 99999-9999"
                required
              />
            </div>
          </div>

        {/* Preferências do imóvel */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="grid gap-2">
            <Label htmlFor="tipo">Tipo de Imóvel</Label>
            <Select
              value={form.tipo}
              onValueChange={(v) => handleChange("tipo", v)}
            >
              <SelectTrigger id="tipo">
                <SelectValue placeholder="Selecione" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="casa">Casa</SelectItem>
                <SelectItem value="apartamento">Apartamento</SelectItem>
                <SelectItem value="chacara">Chácara</SelectItem>
                <SelectItem value="terreno">Terreno</SelectItem>
                <SelectItem value="comercial">Comercial</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="cidade">Cidade</Label>
            <Input
              id="cidade"
              name="cidade"
              value={form.cidade}
              onChange={(e) => handleChange("cidade", e.target.value)}
              placeholder="Ex: Pouso Alegre"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="grid gap-2">
            <Label htmlFor="bairro">Bairro</Label>
            <Input
              id="bairro"
              name="bairro"
              value={form.bairro}
              onChange={(e) => handleChange("bairro", e.target.value)}
              placeholder="Ex: Centro"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="precoMin">Preço mínimo (R$)</Label>
              <Input
                id="precoMin"
                name="precoMin"
                type="number"
                value={form.precoMin}
                onChange={(e) => handleChange("precoMin", e.target.value)}
                placeholder="Ex: 200000"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="precoMax">Preço máximo (R$)</Label>
              <Input
                id="precoMax"
                name="precoMax"
                type="number"
                value={form.precoMax}
                onChange={(e) => handleChange("precoMax", e.target.value)}
                placeholder="Ex: 500000"
              />
            </div>
          </div>
        </div>

        {/* Observações / descrição */}
        <div className="grid gap-2">
          <Label htmlFor="descricao">Descrição do imóvel desejado</Label>
          <Textarea
            id="descricao"
            name="descricao"
            value={form.descricao}
            onChange={(e) => handleChange("descricao", e.target.value)}
            placeholder="Ex: número de quartos, vagas, proximidade com escolas, bairro preferido, etc."
            className="min-h-[120px]"
          />
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="outline">
              Cancelar
            </Button>
          </DialogClose>
          <Button type="submit">Enviar</Button>
        </DialogFooter>
      </form>
    </DialogContent>
    </Dialog>
  )
}

export default DialogOrderYourProperty
