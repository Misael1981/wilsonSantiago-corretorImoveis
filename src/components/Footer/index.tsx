import AdressCard from "./components/AdressCard"
import ContactCard from "./components/ContactCard"
import InstitutionalCard from "./components/InstitutionalCard"

const Footer = () => {
  return (
    <footer className="bg-wilson-blue mt-4 w-full space-y-4 p-4 pb-2 lg:mt-6 lg:px-8 lg:pt-8">
      <div className="flex flex-wrap justify-between gap-8">
        <InstitutionalCard />
        <AdressCard />
        <ContactCard />
      </div>

      <div>
        <p className="text-center text-white/50">
          © 2025 Misael Borges - Desenvolvedor full-stack. Proibida a reprodução
          total ou parcial sem autorização.
        </p>
      </div>
    </footer>
  )
}

export default Footer
