"use client"

import { Heart, MessageCircle, Share2 } from "lucide-react"
import { useState } from "react"

type CustomersCardProps = {
  customer: {
    name: string
    id: string
    createdAt: Date
    testimonial: string
    photo: string | null
    rating: number
    occupation: string | null
    location: string | null
  }
}

const CustomersCard = ({ customer }: CustomersCardProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [likes, setLikes] = useState(customer?.rating || 0)
  const [isLiked, setIsLiked] = useState(false)

  const handleLike = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation() // Evita abrir o modal
    setIsLiked(!isLiked)
    setLikes(isLiked ? likes - 1 : likes + 1)
  }

  const openModal = () => setIsModalOpen(true)
  const closeModal = () => setIsModalOpen(false)

  return (
    <>
      <div
        className="aspect-square h-75 cursor-pointer rounded-lg bg-cover bg-center transition-transform hover:scale-105 lg:h-62 lg:w-62"
        style={{
          backgroundImage: `url('${customer?.photo || "/assets/cliente.jpg"}')`,
        }}
        onClick={openModal}
      >
        <div className="flex h-full w-full flex-col justify-end rounded-lg bg-black/20">
          <div className="h-[30%] w-full rounded-lg bg-black/50 backdrop-blur-sm">
            <div className="flex flex-col gap-2 p-3">
              <h2 className="text-center text-sm font-bold text-white sm:text-base lg:text-lg">
                {customer?.name || "Nome do cliente"}
              </h2>
              <div className="flex items-center justify-between text-white">
                <div className="flex items-center gap-2 sm:gap-3">
                  <button
                    onClick={handleLike}
                    className={`transition-colors ${isLiked ? "text-red-500" : "text-white hover:text-red-400"}`}
                  >
                    <Heart fill={isLiked ? "currentColor" : "none"} size={18} />
                  </button>
                  <span className="text-xs sm:text-sm">{likes}</span>
                  <MessageCircle
                    size={18}
                    className="transition-colors hover:text-blue-400"
                  />
                </div>
                <Share2
                  size={18}
                  className="transition-colors hover:text-green-400"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 🎭 MODAL COM DEPOIMENTO - Z-index mais alto */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-9999 flex items-center justify-center bg-black/80 backdrop-blur-sm"
          onClick={closeModal}
        >
          <div
            className="relative max-h-[90vh] max-w-[90vw] overflow-hidden rounded-xl bg-white shadow-2xl md:max-w-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Botão fechar */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-black/50 text-white transition-colors hover:bg-black/70"
            >
              ✕
            </button>

            {/* Imagem */}
            <div
              className="h-64 w-full bg-contain bg-center md:h-80"
              style={{
                backgroundImage: `url('${customer?.photo || "/assets/cliente.jpg"}')`,
              }}
            ></div>

            {/* Conteúdo do depoimento */}
            <div className="p-6">
              <div className="mb-4 flex items-center gap-3">
                <div
                  className="h-12 w-12 rounded-full bg-cover bg-center"
                  style={{
                    backgroundImage: `url('${customer?.photo || "/assets/cliente.jpg"}')`,
                  }}
                ></div>
                <div>
                  <h3 className="font-bold text-gray-900">
                    {customer?.name || "Nome do cliente"}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {customer?.location || "Localização"}
                  </p>
                </div>
              </div>

              <blockquote className="mb-4 text-gray-700">
                {customer?.testimonial || "Depoimento do cliente..."}
              </blockquote>

              {/* Ações do modal */}
              <div className="flex items-center justify-between border-t pt-4">
                <div className="flex items-center gap-4">
                  <button
                    onClick={handleLike}
                    className={`flex items-center gap-2 transition-colors ${isLiked ? "text-red-500" : "text-gray-600 hover:text-red-400"}`}
                  >
                    <Heart fill={isLiked ? "currentColor" : "none"} size={20} />
                    <span className="hidden sm:inline-block">
                      {likes} curtidas
                    </span>
                  </button>
                  <button className="flex items-center gap-2 text-gray-600 transition-colors hover:text-blue-400">
                    <MessageCircle size={20} />
                    <span className="hidden sm:inline-block">Comentar</span>
                  </button>
                </div>
                <button className="flex items-center gap-2 text-gray-600 transition-colors hover:text-green-400">
                  <Share2 size={20} />
                  <span className="hidden sm:inline-block">Compartilhar</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default CustomersCard
