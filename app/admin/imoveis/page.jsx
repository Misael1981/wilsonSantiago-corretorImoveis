import HeaderAdmin from "../components/HeaderAdmin"
import SubTitleImoveis from "./components/SubTitleImoveis"
import SummaryCards from "./components/SummaryCards"

export default function Imoveis() {
  return (
    <div>
      <HeaderAdmin label="Imóveis" />
      <SubTitleImoveis />
      <SummaryCards />
    </div>
  )
}
