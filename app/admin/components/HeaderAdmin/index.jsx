const HeaderAdmin = ({ label = "" }) => {
  return (
    <header className="w-full p-4">
      <h1 className="text-center text-3xl font-bold">
        Dashboard Administrativo - {label}
      </h1>
    </header>
  )
}

export default HeaderAdmin
