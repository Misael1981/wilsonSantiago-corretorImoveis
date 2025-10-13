"use client"

import { useState } from "react"
import SubTitle from "../SubTitle"
import { Button } from "../ui/button"
import VideoCard from "./components/VideoCard"

const VideoHighlights = ({ highlights = [] }) => {
  const [activeVideo, setActiveVideo] = useState(null)

  // Funções utilitárias
  const formatViews = (views) => {
    if (views >= 1000000) {
      return `${(views / 1000000).toFixed(1)}M`
    } else if (views >= 1000) {
      return `${(views / 1000).toFixed(1)}K`
    }
    return views.toString()
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    })
  }

  // Dados de exemplo para demonstração
  const defaultHighlights = [
    {
      id: 1,
      title: "LANÇAMENTO EXCLUSIVO - Casa Moderna no Centro",
      description:
        "Conheça esta incrível casa de 3 dormitórios com acabamento de primeira linha. Localização privilegiada e preço imperdível!",
      youtubeId: "dQw4w9WgXcQ", // Substitua pelo ID real do seu vídeo
      thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
      price: "R$ 450.000",
      location: "Centro, Pouso Alegre - MG",
      specs: {
        bedrooms: 3,
        bathrooms: 2,
        garage: 2,
        area: "120m²",
      },
      tags: ["LANÇAMENTO", "DESTAQUE"],
      publishedAt: "2024-01-15",
      views: 1250,
    },
    {
      id: 2,
      title: "OPORTUNIDADE ÚNICA - Apartamento Vista Panorâmica",
      description:
        "Apartamento no último andar com vista deslumbrante da cidade. Acabamento premium e área de lazer completa.",
      youtubeId: "dQw4w9WgXcQ", // Substitua pelo ID real do seu vídeo
      thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
      price: "R$ 320.000",
      location: "Bairro Nobre, Pouso Alegre - MG",
      specs: {
        bedrooms: 2,
        bathrooms: 1,
        garage: 1,
        area: "85m²",
      },
      tags: ["PROMOÇÃO", "VISTA PANORÂMICA"],
      publishedAt: "2024-01-10",
      views: 890,
    },
  ]

  const highlightsData = highlights.length > 0 ? highlights : defaultHighlights

  return (
    <section className="boxed p-4" id="highlights">
      <SubTitle title="Novidades & Lançamentos" />

      {/* Desktop: Grid 2 colunas | Mobile: Carrossel horizontal */}
      <div className="mt-8">
        {/* Mobile Carousel */}
        <div className="mt-8 flex gap-4 overflow-auto lg:hidden [&::-webkit-scrollbar]:hidden">
          {highlightsData.map((highlight) => (
            <div
              key={highlight.id}
              className="w-[500px] max-w-[100%] flex-shrink-0"
            >
              <VideoCard
                key={highlight.id}
                highlight={highlight}
                activeVideo={activeVideo}
                setActiveVideo={setActiveVideo}
                formatViews={formatViews}
                formatDate={formatDate}
              />
            </div>
          ))}
        </div>

        {/* Desktop Grid */}
        <div className="hidden gap-8 lg:grid lg:grid-cols-2">
          {highlightsData.map((highlight) => (
            <VideoCard
              key={highlight.id}
              highlight={highlight}
              activeVideo={activeVideo}
              setActiveVideo={setActiveVideo}
              formatViews={formatViews}
              formatDate={formatDate}
            />
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <div className="rounded-2xl p-8 text-center text-white">
        <Button className="bg-gradient-wilson-golden hover:text-blue-750 text-blue-950 transition-colors">
          Confira outras novidades
        </Button>
      </div>
    </section>
  )
}

export default VideoHighlights
