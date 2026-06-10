"use client"

import Image from "next/image"
import dynamic from "next/dynamic"
import NavMenu from "./components/NavMenu"
import WelcomeUser from "./components/HeaderMobile/components/WelcomeUser"
import ButtonLogin from "./components/HeaderMobile/components/ButtonLogin"

const HeaderMobile = dynamic(() => import("./components/HeaderMobile"), {
  ssr: false,
})

const Header = () => {
  return (
    <header className="bg-wilson-blue w-full p-4 text-white">
      <HeaderMobile />
      <div className="bg-wilson-blue hidden lg:block">
        <div className="flex items-center justify-between">
          <div className="relative h-10 w-30">
            <Image
              src="/icons/logo-horizontal.svg"
              alt="Logo Wilson Corretor Imóveis"
              fill
              className="object-contain"
            />
          </div>
          <NavMenu />
          <div className="flex items-center gap-2">
            <WelcomeUser />
            <ButtonLogin />
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
