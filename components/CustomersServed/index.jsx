import SubTitle from "../SubTitle"
import CustomersCard from "./components/CustomersCard"

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
    </section>
  )
}

export default CustomersServed
