import Image from "next/image"
import ButtonsSearch from "./components/ButtonsSearch"
import InputsSearch from "./components/InputsSearch"

const WelcomeSection = () => {
  return (
    <section>
      <div
        className="bg-gradient-wilson-blue relative z-40 flex flex-col items-center justify-center rounded-b-[80px] py-12 shadow-2xl"
        style={{
          boxShadow:
            "0 10px 25px -3px rgba(0, 0, 0, 1.5), 0 4px 6px -2px rgba(0, 0, 0, 0.6)",
        }}
      >
        <Image
          src="/icons/logo-vertical.svg"
          alt="Imagem de boas-vindas"
          width={220}
          height={150}
        />
      </div>
      <div className="bg-wilson-golden text-wilson-blue -mt-18 space-y-4 px-4 pt-24 pb-4">
        <h1
          className="font-title text-center text-3xl font-bold drop-shadow-lg"
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
