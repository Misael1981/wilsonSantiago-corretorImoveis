import Image from "next/image"
import NavMenu from "../NavMenu"
import ButtonLogin from "../ButtonLogin"
import WelcomeUser from "@/components/WelcomeUser"

const HeaderDesktop = () => {
  return (
    <div className="bg-wilson-blue hidden lg:block">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Image
            src="/icons/logo-horizontal.svg"
            alt="Logo Wilson Corretor Imóveis"
            width={120}
            height={20}
          />
        </div>
        <NavMenu />
        <div className="flex items-center gap-2">
          <WelcomeUser />
          <ButtonLogin />
        </div>
      </div>
    </div>
  )
}

export default HeaderDesktop
