import { Separator } from "@/components/ui/separator"

const FooterBlog = () => {
  return (
    <footer className="footer">
      <Separator className="my-4" />
      <p className="text-center text-gray-600">
        &copy; {new Date().getFullYear()} Misael Borges - Desenvolvedor
        full-stack. Proibida a reprodução total ou parcial sem autorização.
      </p>
    </footer>
  )
}

export default FooterBlog
