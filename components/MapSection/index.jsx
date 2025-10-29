"use client"

import { useEffect, useMemo, useState } from "react"
import "leaflet/dist/leaflet.css"
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"
import L from "leaflet"
import "leaflet/dist/leaflet.css"
// Correção dos ícones no Next (sem isso, o marker não aparece)
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png"
import markerIcon from "leaflet/dist/images/marker-icon.png"
import markerShadow from "leaflet/dist/images/marker-shadow.png"

delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x?.src || markerIcon2x,
  iconUrl: markerIcon?.src || markerIcon,
  shadowUrl: markerShadow?.src || markerShadow,
})

const DEFAULT_BRAZIL_CENTER = [-14.2350, -51.9253] // fallback seguro

export default function MapSection({
  address = "Avenida Abreu Lima, 149 - Centro - Pouso Alegre - MG",
  height = 400,
  className = "",
}) {
  const [coords, setCoords] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let active = true
    async function geocode() {
      try {
        const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          address
        )}&addressdetails=1&limit=1`
        const res = await fetch(url, {
          headers: {
            "Accept": "application/json",
          },
        })
        const data = await res.json()
        if (active && Array.isArray(data) && data.length > 0) {
          const first = data[0]
          const lat = parseFloat(first.lat)
          const lon = parseFloat(first.lon)
          setCoords([lat, lon])
        } else if (active) {
          setCoords(DEFAULT_BRAZIL_CENTER)
        }
      } catch (_) {
        if (active) setCoords(DEFAULT_BRAZIL_CENTER)
      } finally {
        if (active) setLoading(false)
      }
    }
    geocode()
    return () => {
      active = false
    }
  }, [address])

  const mapCenter = useMemo(() => coords || DEFAULT_BRAZIL_CENTER, [coords])

  return (
    <section className={`flex w/full flex-col items-center justify-center bg-gray-50 py-10 ${className}`}>
      <h2 className="mb-6 text-center text-2xl font-semibold text-gray-900 md:text-3xl">
        Onde estamos
      </h2>

      <div
        className="w-full max-w-5xl overflow-hidden rounded-2xl border border-gray-200 shadow-lg bg-white"
        style={{ height }}
      >
        {loading && (
          <div className="flex h-full items-center justify-center">
            <span className="text-sm text-gray-600">Carregando mapa...</span>
          </div>
        )}

        {!loading && (
          <MapContainer
            center={mapCenter}
            zoom={coords ? 16 : 4}
            scrollWheelZoom={true}
            style={{ height: "100%", width: "100%" }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contribuidores'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {coords && (
              <Marker position={coords}>
                <Popup>
                  {address}
                </Popup>
              </Marker>
            )}
          </MapContainer>
        )}
      </div>

      <p className="mt-4 text-center text-sm text-gray-700 md:text-base">
        {address}
      </p>
    </section>
  )
}
