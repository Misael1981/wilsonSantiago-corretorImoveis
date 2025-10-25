"use client"

import { CheckCheck } from "lucide-react"
import ThirdTitle from "../ThirdTitle"
import { Button } from "../ui/button"
import Image from "next/image"
import { useState } from "react"
import DialogOrderYourProperty from "../DialogOrderYourProperty"

const items = [
  "Rápido e eficiente, sem compromisso algum, um de nossos agentes entrará em contato com você para te ajudar a encontrar o imóvel ideal.",

  "Preencha o formulário, e veja que o sonho é possível!",
]

const BannerContactUs = () => {
  const [dialogOpen, setDialogOpen] = useState(false)
  const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP
  const wa = (msg) =>
    `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`
  return (
    <section className="boxed p-4">
      <div className="shadow-custom-deep lg:flex lg:items-stretch">
        <div className="bg-gradient-wilson-blue flex flex-col justify-between space-y-4 rounded-t-md p-4 lg:flex-2 lg:rounded-l-md lg:rounded-tr-none">
          <ThirdTitle title="Encomende seu imóvel" />
          <h4 className="text-xl font-semibold text-white/70">
            Não encontrou o imóvel que está procurando?
          </h4>
          <p className="text-white/70">
            Preencha o formulário abaixo e um de nossos agentes entrará em
            contato com você para te ajudar a encontrar o imóvel ideal.
          </p>
          <ul className="space-y-2">
            {items.map((item, index) => (
              <li key={index} className="text-md text-white/70">
                <CheckCheck className="text-wilson-golden mr-2 inline-block h-5 w-5" />
                {item}
              </li>
            ))}
          </ul>
          <Button
            className="bg-gradient-wilson-golden w-[50%] font-bold text-blue-950"
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              setDialogOpen(true)
            }}
          >
            Encomende seu imóvel
          </Button>
        </div>
        <div className="relative h-[350px] lg:w-[400px] lg:flex-1">
          <Image
            src="/assets/banner-contato.jpg"
            alt="banner-contact-us"
            fill
            className="rounded-b-md object-cover lg:rounded-r-md lg:rounded-bl-none"
            sizes="(max-width: 1024px) 100vw, 400px"
          />
        </div>
      </div>
      <DialogOrderYourProperty open={dialogOpen} onOpenChange={setDialogOpen} />
    </section>
  )
}

export default BannerContactUs
