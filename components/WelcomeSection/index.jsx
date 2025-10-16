import Image from "next/image"
import ButtonsSearch from "./components/ButtonsSearch"
import InputsSearch from "./components/InputsSearch"

const WelcomeSection = () => {
  return (
    <section className="w-full lg:flex lg:max-h-[50vh] lg:bg-[var(--wilson-golden)]">
      <div
        className="bg-gradient-wilson-blue relative z-40 flex flex-col items-center justify-center rounded-b-[80px] py-12 shadow-2xl lg:mt-8 lg:h-[50vh] lg:w-[30vw] lg:rounded-none lg:rounded-r-[80px] lg:p-12"
        style={{
          boxShadow:
            "0 10px 25px -3px rgba(0, 0, 0, 1.5), 0 4px 6px -2px rgba(0, 0, 0, 0.6)",
        }}
      >
        <Image
          src="/icons/logo-vertical.svg"
          alt="Imagem de boas-vindas"
          width={200}
          height={140}
        />
      </div>
      <div className="bg-wilson-golden text-wilson-blue -mt-18 space-y-4 px-4 pt-24 pb-4 lg:mt-0 lg:flex lg:flex-1 lg:flex-col lg:justify-center lg:pt-4">
        <h1
          className="font-title text-center text-3xl font-bold drop-shadow-lg xl:text-4xl"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Aqui é onde você pode encontrar o imóvel dos seus sonhos
        </h1>
        <ButtonsSearch />
        <InputsSearch />
      </div>
    </section>
  )
}

export default WelcomeSection
