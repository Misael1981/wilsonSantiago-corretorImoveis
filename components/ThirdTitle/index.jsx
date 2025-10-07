import Image from "next/image"

const ThirdTitle = ({ title }) => {
  return (
    <div className="flex items-end gap-2">
      <Image
        src="/icons/logo-building.svg"
        alt="title"
        width={50}
        height={20}
      />
      <h3 className="text-wilson-golden text-2xl font-bold">{title}</h3>
    </div>
  )
}

export default ThirdTitle
