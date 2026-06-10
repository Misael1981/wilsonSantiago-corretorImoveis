import { FaInstagram } from "react-icons/fa"
import { Button } from "../ui/button"

const ActionForInstagram = () => {
  return (
    <div className="flex justify-center">
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
            <span className="text-lg font-semibold">Nos siga no Instagram</span>
          </div>
        </a>
      </Button>
    </div>
  )
}

export default ActionForInstagram
