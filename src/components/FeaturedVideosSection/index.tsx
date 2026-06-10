import SubTitle from "../SubTitle"
import { getVideoFeatured } from "@/data/get-videoFeatured"
import VideoCard from "./components/VideoCard"

const FeaturedVideosSection = async () => {
  const videoProperties = await getVideoFeatured()

  return (
    <>
      {videoProperties.length > 0 && (
        <section className="boxed p-4" id="highlights space-y-6">
          <SubTitle title="Novidades & Lançamentos" />

          <div className="scrollbar-none mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4 lg:grid lg:grid-cols-2 lg:gap-8 lg:overflow-visible">
            {videoProperties.map((propertie) => (
              <div
                key={propertie.id}
                className="w-[85vw] shrink-0 snap-start sm:w-[60%] md:w-[45%] lg:w-full"
              >
                <VideoCard propertie={propertie} />
              </div>
            ))}
          </div>
        </section>
      )}
    </>
  )
}

export default FeaturedVideosSection
