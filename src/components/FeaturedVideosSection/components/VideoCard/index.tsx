"use client"

import { formatDate } from "@/helpers/format-date"
import { Calendar, Play } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"

type VideoCardProps = {
  propertie: {
    id: string
    createdAt: Date
    title: string
    codRef: number
    youtubeUrl: string | null
    youtubeId: string | null
    videoFeatured: boolean
    slug: string | null
  }
}

const VideoCard = ({ propertie }: VideoCardProps) => {
  const [isPlaying, setIsPlaying] = useState(false)

  const videoId = propertie.youtubeId

  if (!videoId) return null

  const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`

  const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`

  return (
    <div className="group overflow-hidden rounded-2xl bg-white shadow-lg transition-all duration-300 hover:shadow-2xl">
      <div className="relative aspect-video overflow-hidden bg-slate-900">
        {isPlaying ? (
          <iframe
            src={embedUrl}
            title={propertie.title}
            className="h-full w-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <div
            onClick={() => setIsPlaying(true)}
            className="relative h-full w-full cursor-pointer select-none"
          >
            {/* Imagem de Capa do Vídeo */}
            <Image
              src={thumbnailUrl}
              alt={`Capa do vídeo: ${propertie.title}`}
              width={1280}
              height={720}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />

            {/* Play Button Overlay */}
            <div className="absolute inset-0 flex items-center justify-center bg-black/30 transition-all duration-300 group-hover:bg-black/40">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-600 text-white shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:bg-red-700">
                <Play className="ml-1 h-6 w-6 fill-current" />{" "}
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="p-6">
        <span className="mb-1 block text-xs font-semibold text-slate-400">
          Ref: #{propertie.codRef}
        </span>
        <h3 className="text-wilson-blue line-clamp-2 text-lg font-bold">
          {propertie.title}
        </h3>
      </div>

      <div className="flex items-center justify-between border-t p-4">
        <div className="flex items-center gap-1 text-xs text-gray-500">
          <Calendar className="h-3 w-3" />
          <span>{formatDate(propertie.createdAt)}</span>
        </div>
        <Link
          href={`/imoveis/${propertie.slug}`}
          className="bg-wilson-blue hover:bg-wilson-blue-light rounded-lg px-4 py-2 text-sm font-semibold text-white transition-colors"
        >
          Ver Detalhes
        </Link>
      </div>
    </div>
  )
}

export default VideoCard
