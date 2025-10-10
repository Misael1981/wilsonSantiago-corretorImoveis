import InstitutionalCard from "./components/InstitutionalCard"
import ContactCard from "./components/ContactCard"
import AdressCard from "./components/AdressCard"

const Footer = () => {
  return (
    <footer className="bg-wilson-blue w-full px-4 pt-4 pb-1">
      <div className="mb-8 flex flex-wrap justify-between gap-8">
        <InstitutionalCard />
        <ContactCard />
        <AdressCard />
      </div>
      <p className="text-center text-white/50">
        © 2025 Misael Borges - Desenvolvedor full-stack. Proibida a reprodução
        total ou parcial sem autorização.
      </p>
    </footer>
  )
}

export default Footer
