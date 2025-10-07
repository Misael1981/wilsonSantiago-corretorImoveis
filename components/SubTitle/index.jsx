const SubTitle = ({ title, className = "" }) => {
  return (
    <div className={`relative ${className}`}>
      <h2 className="font-title text-wilson-blue relative inline-block pb-4 text-2xl font-semibold">
        {title}
        <div className="bg-wilson-golden absolute bottom-2 left-0 h-1.5 w-12"></div>
        <div className="bg-wilson-blue absolute bottom-0 left-0 h-1.5 w-20"></div>
      </h2>
    </div>
  )
}

export default SubTitle
