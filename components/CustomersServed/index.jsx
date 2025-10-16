import SubTitle from "../SubTitle"
import { Button } from "../ui/button"
import CustomersCard from "./components/CustomersCard"
import { FaInstagram } from "react-icons/fa"

const CustomersServed = ({ customersData = [] }) => {
  return (
    <section className="boxed my-8 p-4">
      <SubTitle title="Nossa Galeria de Sucesso" />

      {/* Grid responsiva com espaçamento adequado */}
      <div className="flex items-center justify-center">
        <div className="mt-4 flex gap-4 overflow-auto [&::-webkit-scrollbar]:hidden">
          {customersData.map((customer) => (
            <div key={customer.id}>
              <CustomersCard customer={customer} />
            </div>
          ))}
        </div>
      </div>
      <div className="mt-4 flex items-center justify-center">
        <Button
          asChild
          className="gap-2 rounded-b-lg bg-[linear-gradient(45deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888)] px-5 py-2 font-medium text-white shadow-md transition-all hover:opacity-90"
        >
          <a
            href="https://www.instagram.com/wilson_santiago_corretor?igsh=MWFkMGt3dnV5NDMwcQ=="
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Nos siga no Instagram"
          >
            <div className="flex items-center justify-center gap-2">
              <FaInstagram size={32} />
              <span className="text-lg font-semibold">
                Nos siga no Instagram
              </span>
            </div>
          </a>
        </Button>
      </div>
    </section>
  )
}

export default CustomersServed
