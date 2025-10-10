"use client"

import { useState } from "react"
import { Play, Pause, Volume2, VolumeX, Maximize } from "lucide-react"

const VideoPlayer = ({ youtubeId, title, thumbnail, autoplay = false }) => {
  const [isPlaying, setIsPlaying] = useState(autoplay)
  const [showControls, setShowControls] = useState(true)

  if (isPlaying) {
    return (
      <iframe
        src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&rel=0&modestbranding=1&showinfo=0`}
        title={title}
        className="h-full w-full rounded-lg"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    )
  }

  return (
    <div
      className="group relative h-full w-full cursor-pointer overflow-hidden rounded-lg"
      onClick={() => setIsPlaying(true)}
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
    >
      {/* Thumbnail */}
      <img
        src={thumbnail}
        alt={title}
        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

      {/* Play Button */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-red-600 text-white shadow-2xl transition-all duration-300 group-hover:scale-110 group-hover:bg-red-700">
          <Play className="ml-1 h-8 w-8 fill-current" />
        </div>
      </div>

      {/* Video Info */}
      <div className="absolute right-0 bottom-0 left-0 p-4 text-white">
        <h4 className="line-clamp-2 font-semibold">{title}</h4>
      </div>
    </div>
  )
}

export default VideoPlayer
