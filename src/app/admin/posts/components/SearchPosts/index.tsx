import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { SearchIcon } from "lucide-react"

const SearchPosts = () => {
  return (
    <div className="flex w-full justify-center">
      <div className="flex w-full max-w-3xl items-center gap-2">
        <Input placeholder="Busque pelo Título do Artigo" />
        <Button type="submit" className="bg-gradient-wilson-blue text-white">
          <SearchIcon className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}

export default SearchPosts
