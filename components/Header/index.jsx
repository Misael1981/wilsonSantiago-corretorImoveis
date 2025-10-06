import { Card, CardContent } from "../ui/card"
import ButtonMenuTrigger from "./components/ButtonMenuTrigger"

const Header = () => {
  return (
    <Card className="bg-wilson-blue w-full p-4">
      <CardContent className="p-0 text-white">
        <ButtonMenuTrigger />
      </CardContent>
    </Card>
  )
}

export default Header
