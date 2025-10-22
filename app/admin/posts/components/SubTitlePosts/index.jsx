import DialogCreatePost from "./DialogCreatePost"

const SubTitlePosts = () => {
  return (
    <section className="flex w-full flex-wrap items-center justify-between gap-4 p-4">
      <div className="w-full lg:w-fit">
        <h2 className="text-center text-2xl font-bold text-gray-800 lg:text-start">
          Gerenciar Posts
        </h2>
        <p className="text-center text-gray-600 lg:text-start">
          Gerencie posts, cadastre posts e edite novos posts
        </p>
      </div>
      <div className="flex w-full justify-center lg:w-fit lg:justify-end">
        <DialogCreatePost />
      </div>
    </section>
  )
}

export default SubTitlePosts
