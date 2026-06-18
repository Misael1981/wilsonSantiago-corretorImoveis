export default function RealEstateMap() {
  const endereco = "Avenida Abreu Lima, 149 - Centro - Pouso Alegre - MG"

  const urlEndereco = encodeURIComponent(endereco)

  // URL de Embed oficial do Google Maps usando a busca por texto (q=)
  // z=16 controla o Zoom (quanto maior, mais perto)
  const mapSrc = `https://maps.google.com/maps?q=${urlEndereco}&t=&z=16&ie=UTF8&iwloc=&output=embed`

  return (
    <section>
      <div className="h-50 w-full overflow-hidden rounded-2xl border border-gray-200 shadow-lg">
        <iframe
          title="Localização da Imobiliária no Google Maps"
          width="100%"
          height="100%"
          frameBorder="0"
          scrolling="no"
          src={mapSrc}
          loading="lazy"
          allowFullScreen
        />
      </div>
    </section>
  )
}
