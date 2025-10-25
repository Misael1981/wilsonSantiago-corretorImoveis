import { NextResponse } from "next/server"

export const dynamic = "force-dynamic"

async function fetchJson(url) {
  const res = await fetch(url, { next: { revalidate: 0 } })
  const data = await res.json().catch(() => ({}))
  if (!res.ok) {
    throw new Error(
      data?.error?.message ||
        data?.message ||
        "Erro ao acessar a API do YouTube",
    )
  }
  return data
}

async function resolveChannelId(handle, key) {
  //  Se for o canal do Wilson, já devolve o ID direto
  if (handle === "@wilsonrodrigosantiago7266") {
    return "UCwbgOL4403cNA7UTA7P5VtA"
  }

  // Caso contrário, tenta buscar pelo nome (uso genérico)
  const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=channel&q=${encodeURIComponent(
    handle,
  )}&key=${key}`
  const data = await fetchJson(url)
  const item = data?.items?.[0]
  return item?.snippet?.channelId ?? null
}

async function fetchChannelVideos(channelId, key, maxResults = 6) {
  const url = `https://www.googleapis.com/youtube/v3/search?key=${key}&channelId=${channelId}&part=snippet,id&order=date&maxResults=${maxResults}`
  const data = await fetchJson(url)

  return (
    data.items
      ?.filter((i) => i.id.kind === "youtube#video")
      ?.map((item) => ({
        id: item.id.videoId,
        title: item.snippet.title,
        description: item.snippet.description,
        thumbnail: item.snippet.thumbnails.medium.url,
        publishedAt: item.snippet.publishedAt,
      })) ?? []
  )
}

export async function GET(req) {
  const { searchParams } = new URL(req.url)
  const key = process.env.YOUTUBE_API_KEY
  if (!key)
    return NextResponse.json(
      { error: "Missing YOUTUBE_API_KEY" },
      { status: 500 },
    )

  try {
    const handle = searchParams.get("handle")
    const list = searchParams.get("list")
    const maxResults = Number(searchParams.get("maxResults") || 6)

    const channelId = await resolveChannelId(handle, key)
    if (!channelId)
      return NextResponse.json(
        { error: "Canal não encontrado" },
        { status: 404 },
      )

    if (list) {
      const videos = await fetchChannelVideos(channelId, key, maxResults)
      return NextResponse.json({ videos })
    }

    return NextResponse.json({ channelId })
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
