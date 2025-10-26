"use client"

import React from "react"

const MapSection = () => {
  const mapsKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY
  const address = "Avenida Abreu Lima, 149 - Centro - Pouso Alegre - MG"
  const encodedAddress = encodeURIComponent(address)
  const embedSrc = `https://www.google.com/maps/embed/v1/place?q=${encodedAddress}&key=${mapsKey}`

  return (
    <section className="flex w-full flex-col items-center justify-center bg-gray-50 py-10">
      <h2 className="mb-6 text-center text-2xl font-semibold text-gray-900 md:text-3xl">
        Onde estamos
      </h2>

      <div className="h-[400px] w-full max-w-5xl overflow-hidden rounded-2xl border border-gray-200 shadow-lg">
        <iframe
          width="100%"
          height="100%"
          style={{ border: 0 }}
          loading="lazy"
          allowFullScreen
          src={embedSrc}
        ></iframe>
      </div>

      <p className="mt-4 text-center text-sm text-gray-700 md:text-base">
        Avenida Abreu Lima, 149 - Centro, Pouso Alegre - MG
      </p>
    </section>
  )
}

export default MapSection
