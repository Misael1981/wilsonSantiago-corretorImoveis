import { Play, Eye, Calendar, MapPin, Home, Bed, Bath, Car } from "lucide-react"

const VideoCard = ({
  highlight,
  activeVideo,
  setActiveVideo,
  formatViews,
  formatDate,
}) => {
  return (
    <div className="group overflow-hidden rounded-2xl bg-white shadow-lg transition-all duration-300 hover:shadow-2xl">
      {/* Video Container */}
      <div className="relative aspect-video overflow-hidden">
        {activeVideo === highlight.id ? (
          <iframe
            src={`https://www.youtube.com/embed/${highlight.youtubeId}?autoplay=1&rel=0&modestbranding=1`}
            title={highlight.title}
            className="h-full w-full"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <div
            className="relative h-full w-full cursor-pointer"
            onClick={() => setActiveVideo(highlight.id)}
          >
            <img
              src={highlight.thumbnail}
              alt={highlight.title}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />

            {/* Play Button Overlay */}
            <div className="absolute inset-0 flex items-center justify-center bg-black/20 transition-all duration-300 group-hover:bg-black/30">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-600 text-white shadow-lg transition-all duration-300 group-hover:scale-110">
                <Play className="ml-1 h-6 w-6 fill-current" />
              </div>
            </div>

            {/* Tags */}
            <div className="absolute top-4 left-4 flex flex-wrap gap-2">
              {highlight.tags.map((tag, index) => (
                <span
                  key={index}
                  className="bg-wilson-golden text-wilson-blue rounded-full px-3 py-1 text-xs font-semibold"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Views Counter */}
            <div className="absolute right-4 bottom-4 flex items-center gap-1 rounded-full bg-black/70 px-3 py-1 text-white">
              <Eye className="h-3 w-3" />
              <span className="text-xs font-medium">
                {formatViews(highlight.views)}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Title */}
        <h3 className="text-wilson-blue mb-3 line-clamp-2 text-xl font-bold">
          {highlight.title}
        </h3>

        {/* Description */}
        <p className="mb-4 line-clamp-3 text-gray-600">
          {highlight.description}
        </p>

        {/* Price */}
        <div className="mb-4">
          <span className="text-2xl font-bold text-green-600">
            {highlight.price}
          </span>
        </div>

        {/* Location */}
        <div className="mb-4 flex items-center gap-2 text-gray-600">
          <MapPin className="h-4 w-4" />
          <span className="text-sm">{highlight.location}</span>
        </div>

        {/* Specs */}
        <div className="mb-4 flex flex-wrap gap-4 text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <Bed className="h-4 w-4" />
            <span>{highlight.specs.bedrooms} quartos</span>
          </div>
          <div className="flex items-center gap-1">
            <Bath className="h-4 w-4" />
            <span>{highlight.specs.bathrooms} banheiros</span>
          </div>
          <div className="flex items-center gap-1">
            <Car className="h-4 w-4" />
            <span>{highlight.specs.garage} vagas</span>
          </div>
          <div className="flex items-center gap-1">
            <Home className="h-4 w-4" />
            <span>{highlight.specs.area}</span>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between border-t pt-4">
          <div className="flex items-center gap-1 text-xs text-gray-500">
            <Calendar className="h-3 w-3" />
            <span>{formatDate(highlight.publishedAt)}</span>
          </div>

          <button className="bg-wilson-blue hover:bg-wilson-blue-light rounded-lg px-4 py-2 text-sm font-semibold text-white transition-colors">
            Ver Detalhes
          </button>
        </div>
      </div>
    </div>
  )
}

export default VideoCard
