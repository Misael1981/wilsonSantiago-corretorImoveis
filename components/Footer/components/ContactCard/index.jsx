"use client"

import { Button } from "@/components/ui/button"
import { FaWhatsapp, FaInstagram } from "react-icons/fa"
import { toast } from "sonner"
import { MdEmail } from "react-icons/md"

const linksContact = [
  {
    name: "WhatsApp - Vendas",
    href: "https://wa.me/5535999415176?text=Olá! Tenho interesse em conhecer os imóveis disponíveis.",
    icon: <FaWhatsapp className="mr-2 h-5 w-5 text-green-500" />,
    value: "(35) 99941-5176",
  },
  {
    name: "Email",
    href: "mailto:santiagowilsonrodrigo@gmail.com",
    icon: <MdEmail className="mr-2 h-5 w-5 text-violet-600" />,
    value: "santiagowilsonrodrigo@gmail.com",
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/santiagowilsonrodrigo/",
    icon: <FaInstagram className="mr-2 h-5 w-5 text-pink-500" />,
    value: "@santiagowilsonrodrigo",
  },
]

const ContactCard = () => {
  const handleCopyClick = (value) => {
    navigator.clipboard.writeText(value)
    toast.success("Copiado para a área de transferência")
  }
  return (
    <div className="w-full space-y-2 lg:max-w-[400px]">
      <h3 className="text-wilson-golden mb-4 text-lg font-semibold">Contato</h3>
      <ul className="space-y-2">
        {linksContact.map((item) => (
          <li key={item.name} className="flex items-center justify-between">
            <a
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-sm font-semibold text-white/80 transition-colors hover:text-white"
            >
              {item.icon}
              <span className="text-white">{item.name}:</span>
              <span className="ml-1 text-gray-400">{item.value}</span>
            </a>
            <Button
              onClick={() => handleCopyClick(item.value)}
              className="bg-wilson-golden hover:bg-wilson-golden/90 text-wilson-blue text-sm font-semibold transition-colors"
            >
              Copiar
            </Button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ContactCard
