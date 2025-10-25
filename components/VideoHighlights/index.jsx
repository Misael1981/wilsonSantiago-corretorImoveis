"use client"

import { useEffect, useState } from "react"
import SubTitle from "../SubTitle"
import { Button } from "../ui/button"
import VideoCard from "./components/VideoCard"

const formatViews = (views) =>
  views >= 1_000_000
    ? `${(views / 1_000_000).toFixed(1)} mi`
    : views >= 1_000
      ? `${(views / 1_000).toFixed(1)} mil`
      : views

const formatDate = (isoString) => {
  const date = new Date(isoString)
  return date.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  })
}

const VideoHighlights = ({ highlights = [] }) => {
  const [activeVideo, setActiveVideo] = useState(null)
  const [videos, setVideos] = useState([])

  useEffect(() => {
    const handle = "@wilsonrodrigosantiago7266"
    fetch(
      `/api/videos?handle=${encodeURIComponent(handle)}&list=1&maxResults=6`,
    )
      .then((res) => res.json())
      .then((data) => {
        console.log("🎥 API data:", data)
        setVideos(Array.isArray(data?.videos) ? data.videos : [])
      })
      .catch((err) => {
        console.error("Erro ao carregar vídeos:", err)
        setVideos([])
      })
  }, [])

  const videoHighlights = videos.map((v) => ({
    id: v.id,
    title: v.title,
    description: v.description,
    youtubeId: v.id,
    thumbnail: v.thumbnail,
    price: "",
    location: "",
    specs: { bedrooms: 0, bathrooms: 0, garage: 0, area: "" },
    tags: [],
    publishedAt: v.publishedAt,
    views: v.views ?? 0,
  }))

  const highlightsData =
    videoHighlights.length > 0
      ? videoHighlights
      : highlights.length > 0
        ? highlights
        : []

  return (
    <section className="boxed p-4 lg:mt-8" id="highlights">
      <SubTitle title="Novidades & Lançamentos" />

      <div className="mt-8">
        {/* Mobile Carousel */}
        <div className="mt-8 flex gap-4 overflow-auto lg:hidden [&::-webkit-scrollbar]:hidden">
          {highlightsData.map((highlight) => (
            <div
              key={highlight.id}
              className="w-[500px] max-w-[100%] flex-shrink-0"
            >
              <VideoCard
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

      <div className="rounded-2xl p-8 text-center text-white">
        <Button className="bg-gradient-wilson-golden hover:text-blue-750 text-blue-950 transition-colors">
          Confira outras novidades
        </Button>
      </div>
    </section>
  )
}

export default VideoHighlights
