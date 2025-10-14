// GalleryImages (component)
"use client"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"
import { useState, useRef } from "react"

const GalleryImages = ({ property }) => {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const images = Array.isArray(property?.imageUrls) ? property.imageUrls : []
  const mainSrc = images[selectedIndex] ?? images[0]
  const thumbsRef = useRef(null)

  const scrollByAmount = (amount) => {
    if (!thumbsRef.current) return
    thumbsRef.current.scrollBy({ left: amount, behavior: "smooth" })
  }
  const handlePrev = () => scrollByAmount(-240)
  const handleNext = () => scrollByAmount(240)
  return (
    <div className="col-span-2 h-full">
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-md">
        {mainSrc ? (
          <Image
            src={mainSrc}
            alt={property.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 66vw, 66vw"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center rounded-md bg-gray-100 text-sm text-gray-500">
            Sem imagem disponível
          </div>
        )}
      </div>

      {/* Carrossel de miniaturas com setas */}
      <div className="relative mt-3">
        <div
          ref={thumbsRef}
          className="flex snap-x snap-mandatory gap-2 overflow-x-auto scroll-smooth rounded-md [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {images.map((url, i) => (
            <button
              type="button"
              key={i}
              onClick={() => setSelectedIndex(i)}
              className={`relative aspect-square w-24 shrink-0 snap-start overflow-hidden rounded-md ring-1 ring-transparent transition hover:opacity-90 ${
                i === selectedIndex ? "ring-2 ring-blue-600" : ""
              }`}
              aria-label={`Selecionar imagem ${i + 1}`}
              title={`Selecionar imagem ${i + 1}`}
            >
              <Image
                src={url}
                alt={`${property.title} ${i + 1}`}
                fill
                className="object-cover"
              />
            </button>
          ))}
        </div>

        {/* Botões Prev/Next */}
        <Button
          type="button"
          onClick={handlePrev}
          className="absolute top-1/2 left-2 z-10 h-7 w-7 -translate-y-1/2 rounded-full bg-white/80 p-2 shadow hover:bg-white"
          aria-label="Anterior"
          title="Anterior"
        >
          <span className="text-xl text-gray-700">
            <ChevronLeft />
          </span>
        </Button>
        <Button
          type="button"
          onClick={handleNext}
          className="absolute top-1/2 right-2 z-10 h-7 w-7 -translate-y-1/2 rounded-full bg-white/80 p-2 shadow hover:bg-white"
          aria-label="Próximo"
          title="Próximo"
        >
          <span className="text-xl text-gray-700">
            <ChevronRight />
          </span>
        </Button>
      </div>
    </div>
  )
}

export default GalleryImages
