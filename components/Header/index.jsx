import { Card, CardContent } from "../ui/card"
import ButtonMenuTrigger from "./components/ButtonMenuTrigger"
import HeaderDesktop from "./components/HeaderDesktop"

const Header = () => {
  return (
    <header className="bg-wilson-blue">
      <Card className="bg-wilson-blue w-full border-0 p-4">
        <CardContent className="p-0 text-white">
          <ButtonMenuTrigger />
          <HeaderDesktop />
        </CardContent>
      </Card>
    </header>
  )
}

export default Header
