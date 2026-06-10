"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { signIn, signOut } from "next-auth/react"
import { FaGoogle } from "react-icons/fa"
import { LogIn, LogOut } from "lucide-react"
import { useUser } from "@/hooks/useUser"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { updateOnboardingDataAction } from "@/app/actions/update-onboarding-data"
import { formatPhoneNumber } from "@/helpers/format-phone-number"

const ButtonLogin = () => {
  const { isLogged, user } = useUser()
  const [showModal, setShowModal] = useState(false)
  const [phone, setPhone] = useState("")
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!isLogged || !user) return

    const alreadyShown = localStorage.getItem(`onboarding_shown_${user.email}`)

    if (!user.phone && !alreadyShown) {
      localStorage.setItem(`onboarding_shown_${user.email}`, "true")
      const timer = setTimeout(() => setShowModal(true), 0)
      return () => clearTimeout(timer)
    }
  }, [isLogged, user])

  const handleClick = () => {
    if (isLogged) {
      signOut()
    } else {
      signIn("google")
    }
  }

  const handleSaveOnboarding = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!phone.trim()) return

    setLoading(true)
    try {
      await updateOnboardingDataAction({ phone, message })

      setShowModal(false)
    } catch (error) {
      console.error("Erro ao salvar dados de integração:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      {/* 📱 MOBILE (até 1024px) */}
      <div className="lg:hidden">
        {!isLogged ? (
          <Button
            className="bg-gradient-wilson-golden w-full text-lg text-blue-950"
            onClick={handleClick}
          >
            <FaGoogle size={16} className="mr-2 size-4" />
            Google
          </Button>
        ) : (
          <Button
            className="w-full bg-red-700 text-white hover:bg-red-800"
            onClick={handleClick}
          >
            Sair da conta
            <LogOut size={16} className="ml-2 size-4" />
          </Button>
        )}
      </div>

      {/* 💻 DESKTOP (1024px+) */}
      <div className="hidden lg:block">
        <Button
          onClick={handleClick}
          className={
            isLogged
              ? "bg-red-700 text-white hover:bg-red-800"
              : "bg-gradient-wilson-golden text-blue-950"
          }
          title={isLogged ? "Sair da conta" : "Entrar com Google"}
          aria-label={isLogged ? "Sair da conta" : "Entrar com Google"}
        >
          {isLogged ? (
            <LogOut size={16} className="size-4" />
          ) : (
            <LogIn size={16} className="size-4" />
          )}
        </Button>
      </div>

      {/* 🚪 POPUP DE PRIMEIRO LOGIN (SHADCN DIALOG) */}
      <Dialog
        open={showModal}
        onOpenChange={(open) => {
          if (!user?.phone) return
          setShowModal(open)
        }}
      >
        <DialogContent className="border-slate-800 bg-slate-900 text-white sm:max-w-105">
          <DialogHeader>
            <DialogTitle className="text-wilson-golden text-xl font-bold">
              Seja bem-vindo ao Portal Pioneiro!
            </DialogTitle>
            <DialogDescription className="text-slate-400">
              Falta bem pouquinho para liberar seu acesso. Só precisamos de mais
              alguns dados para o Wilson te atender melhor.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSaveOnboarding} className="mt-2 space-y-4">
            <div className="space-y-1">
              <label className="text-sm font-medium text-slate-300">
                Seu WhatsApp / Telefone *
              </label>
              <Input
                type="tel"
                required
                placeholder="(35) 99999-9999"
                value={phone}
                onChange={(e) => setPhone(formatPhoneNumber(e.target.value))}
                className="focus-visible:ring-wilson-golden border-slate-800 bg-slate-950 text-white placeholder:text-slate-600"
              />
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium text-slate-300">
                O que você está procurando no momento?
              </label>
              <Textarea
                placeholder="Ex: Procuro uma casa para comprar no centro ou terreno de até 150k..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={3}
                className="focus-visible:ring-wilson-golden resize-none border-slate-800 bg-slate-950 text-white placeholder:text-slate-600"
              />
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="bg-gradient-wilson-golden w-full font-semibold text-blue-950"
            >
              {loading ? "Salvando..." : "Concluir Cadastro e Acessar"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default ButtonLogin
