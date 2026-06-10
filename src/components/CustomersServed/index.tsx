import { getCustomers } from "@/data/get-customers-served-data"
import SubTitle from "../SubTitle"
import CustomersCard from "./components/CustomersCard"
import ActionForInstagram from "../ActionForInstagram"

const CustomersServed = async () => {
  const customers = await getCustomers()
  return (
    <section className="boxed space-y-4">
      <SubTitle title="Nossa Galeria de Sucesso" />

      <div className="flex items-center justify-center">
        <div className="mt-4 flex gap-4 overflow-auto [&::-webkit-scrollbar]:hidden">
          {customers.map((customer) => (
            <div key={customer.id}>
              <CustomersCard customer={customer} />
            </div>
          ))}
        </div>
      </div>

      <ActionForInstagram />
    </section>
  )
}

export default CustomersServed
//ActionForInstagram
