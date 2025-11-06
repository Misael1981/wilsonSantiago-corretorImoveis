"use client"

import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api"

export default function MapLocation({ lat, lng }) {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
  })

  if (!isLoaded || lat == null || lng == null) return null

  return (
    <GoogleMap
      mapContainerStyle={{ width: "100%", height: "180px" }}
      center={{ lat, lng }}
      zoom={15}
    >
      <Marker position={{ lat, lng }} />
    </GoogleMap>
  )
}
