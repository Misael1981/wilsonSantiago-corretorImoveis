import { Card, CardContent } from "../ui/card"
import ButtonMenuTrigger from "./components/ButtonMenuTrigger"

const Header = () => {
  return (
    <header className="bg-wilson-blue">
      <Card className="bg-wilson-blue w-full border-0 p-4">
        <CardContent className="p-0 text-white">
          <ButtonMenuTrigger />
        </CardContent>
      </Card>
    </header>
  )
}

export default Header
