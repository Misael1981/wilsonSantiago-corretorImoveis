"use client"

import { useState } from "react"
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import AnimatedContent from "@/components/AnimatedContent"
import Link from "next/link"
import { ArrowLeft, Upload, X } from "lucide-react"
import { toast } from "sonner"

export default function CadastrarImovel() {
  const [selectedFiles, setSelectedFiles] = useState([])
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    telefone: "",
    cidade: "",
    titulo: "",
    descricao: "",
    valor: "",
    area: "",
    quartos: "",
    tipo: "",
    fotos: [],
  })

  const [errors, setErrors] = useState({})

  // Validação
  const validateForm = () => {
    const newErrors = {}

    if (!formData.nome.trim()) newErrors.nome = "Nome é obrigatório"
    if (!formData.email.includes("@")) newErrors.email = "Email inválido"
    if (!formData.telefone.trim()) newErrors.telefone = "Telefone é obrigatório"
    if (!formData.valor || formData.valor <= 0)
      newErrors.valor = "Valor deve ser maior que zero"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Máscara de telefone
  const formatPhone = (value) => {
    return value
      .replace(/\D/g, "")
      .replace(/(\d{2})(\d)/, "($1) $2")
      .replace(/(\d{5})(\d)/, "$1-$2")
      .replace(/(-\d{4})\d+?$/, "$1")
  }

  const handleInputChange = (field, value) => {
    if (field === "telefone") {
      value = formatPhone(value)
    }
    setFormData((prev) => ({ ...prev, [field]: value }))
    // Remove erro quando usuário corrige
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) {
      toast.error("Por favor, corrija os erros no formulário")
      return
    }

    setLoading(true)

    try {
      // Chamada pra API aqui

      // Simulação de envio
      await new Promise((resolve) => setTimeout(resolve, 2000))

      toast.success(
        "Imóvel cadastrado com sucesso! Entraremos em contato em breve.",
      )

      // Reset form
      setFormData({
        nome: "",
        email: "",
        telefone: "",
        cidade: "",
        titulo: "",
        descricao: "",
        valor: "",
        area: "",
        quartos: "",
        tipo: "",
        fotos: [],
      })
    } catch (error) {
      toast.error("Erro ao cadastrar imóvel. Tente novamente.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-gradient-wilson-blue">
      <AnimatedContent>
        <div className="mb-8 p-4">
          <Link
            href="/"
            className="flex items-center gap-2 text-gray-100 hover:text-gray-900"
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar
          </Link>
        </div>

        <div className="flex min-h-screen items-center justify-center px-4 pb-10">
          <Card className="w-full max-w-2xl border border-slate-200 shadow-xl">
            <CardHeader>
              <CardTitle className="text-center text-2xl font-semibold text-slate-800">
                Cadastrar seu Imóvel
              </CardTitle>
              <p className="text-center text-sm text-gray-600">
                Preencha os dados abaixo e entraremos em contato
              </p>
            </CardHeader>

            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-6">
                {/* Dados Pessoais */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-gray-900">
                    Dados Pessoais
                  </h3>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <Label htmlFor="nome">Nome completo *</Label>
                      <Input
                        id="nome"
                        value={formData.nome}
                        onChange={(e) =>
                          handleInputChange("nome", e.target.value)
                        }
                        placeholder="Seu nome completo"
                        className={errors.nome ? "border-red-500" : ""}
                      />
                      {errors.nome && (
                        <p className="text-sm text-red-500">{errors.nome}</p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="email">E-mail *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) =>
                          handleInputChange("email", e.target.value)
                        }
                        placeholder="seuemail@exemplo.com"
                        className={errors.email ? "border-red-500" : ""}
                      />
                      {errors.email && (
                        <p className="text-sm text-red-500">{errors.email}</p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="telefone">Telefone/WhatsApp *</Label>
                      <Input
                        id="telefone"
                        value={formData.telefone}
                        onChange={(e) =>
                          handleInputChange("telefone", e.target.value)
                        }
                        placeholder="(11) 99999-9999"
                        maxLength={15}
                        className={errors.telefone ? "border-red-500" : ""}
                      />
                      {errors.telefone && (
                        <p className="text-sm text-red-500">
                          {errors.telefone}
                        </p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="cidade">Cidade *</Label>
                      <Input
                        id="cidade"
                        value={formData.cidade}
                        onChange={(e) =>
                          handleInputChange("cidade", e.target.value)
                        }
                        placeholder="Ex: Pouso Alegre"
                      />
                    </div>
                  </div>
                </div>

                {/* Dados do Imóvel */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-gray-900">
                    Dados do Imóvel
                  </h3>

                  <div>
                    <Label htmlFor="tipo">Tipo de Imóvel *</Label>
                    <Select
                      value={formData.tipo}
                      onValueChange={(value) =>
                        handleInputChange("tipo", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o tipo" />
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

                  <div>
                    <Label htmlFor="titulo">Título do Anúncio *</Label>
                    <Input
                      id="titulo"
                      value={formData.titulo}
                      onChange={(e) =>
                        handleInputChange("titulo", e.target.value)
                      }
                      placeholder="Ex: Casa térrea com 3 quartos no centro"
                      maxLength={100}
                    />
                    <p className="mt-1 text-xs text-gray-500">
                      {formData.titulo.length}/100 caracteres
                    </p>
                  </div>

                  <div>
                    <Label htmlFor="descricao">Descrição Detalhada *</Label>
                    <Textarea
                      id="descricao"
                      value={formData.descricao}
                      onChange={(e) =>
                        handleInputChange("descricao", e.target.value)
                      }
                      placeholder="Descreva detalhes do imóvel: localização, características, diferenciais, estado de conservação, etc."
                      className="min-h-[120px]"
                      maxLength={500}
                    />
                    <p className="mt-1 text-xs text-gray-500">
                      {formData.descricao.length}/500 caracteres
                    </p>
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                    <div>
                      <Label htmlFor="valor">Valor (R$) *</Label>
                      <Input
                        id="valor"
                        type="number"
                        step="1000"
                        value={formData.valor}
                        onChange={(e) =>
                          handleInputChange("valor", e.target.value)
                        }
                        placeholder="350000"
                        className={errors.valor ? "border-red-500" : ""}
                      />
                      {errors.valor && (
                        <p className="text-sm text-red-500">{errors.valor}</p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="area">Área (m²)</Label>
                      <Input
                        id="area"
                        type="number"
                        value={formData.area}
                        onChange={(e) =>
                          handleInputChange("area", e.target.value)
                        }
                        placeholder="120"
                      />
                    </div>

                    <div>
                      <Label htmlFor="quartos">Quartos</Label>
                      <Input
                        id="quartos"
                        type="number"
                        min="0"
                        max="10"
                        value={formData.quartos}
                        onChange={(e) =>
                          handleInputChange("quartos", e.target.value)
                        }
                        placeholder="3"
                      />
                    </div>
                  </div>
                </div>

                {/* Upload de Fotos */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-gray-900">
                    Fotos do Imóvel
                  </h3>

                  <div className="mb-4 rounded-lg border-2 border-dashed border-gray-300 p-6 text-center">
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
                      ref={(input) => {
                        window.fotosInput = input // Referência global temporária
                      }}
                      onChange={(e) => {
                        const files = Array.from(e.target.files)
                        setSelectedFiles(files)
                        toast.success(`${files.length} foto(s) selecionada(s)`)
                      }}
                    />

                    <Button
                      type="button"
                      variant="outline"
                      className="mt-2"
                      onClick={() => {
                        document.getElementById("fotos").click()
                      }}
                    >
                      {selectedFiles.length > 0
                        ? `${selectedFiles.length} foto(s) selecionada(s)`
                        : "Selecionar Fotos"}
                    </Button>

                    {/* Preview das imagens */}
                    {selectedFiles.length > 0 && (
                      <div className="mt-4 grid grid-cols-3 gap-2">
                        {selectedFiles.slice(0, 6).map((file, index) => (
                          <div key={index} className="relative">
                            <img
                              src={URL.createObjectURL(file)}
                              alt={`Preview ${index + 1}`}
                              className="h-20 w-20 rounded object-cover"
                            />
                          </div>
                        ))}
                        {selectedFiles.length > 6 && (
                          <div className="flex h-20 w-20 items-center justify-center rounded bg-gray-100 text-sm text-gray-500">
                            +{selectedFiles.length - 6}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>

              <CardFooter className="flex flex-col gap-4">
                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-blue-600 hover:bg-blue-700"
                >
                  {loading ? "Enviando..." : "Cadastrar Imóvel"}
                </Button>

                <p className="text-center text-xs text-gray-500">
                  Ao cadastrar, você concorda com nossa{" "}
                  <Link
                    href="/politica-de-privacidade"
                    className="text-blue-600 hover:underline"
                  >
                    Política de Privacidade
                  </Link>
                </p>
              </CardFooter>
            </form>
          </Card>
        </div>
      </AnimatedContent>
    </div>
  )
}
