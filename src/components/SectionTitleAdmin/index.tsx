"use client"

type SectionTitleAdminProps = {
  label: string
  description?: string
  actionButton: React.ReactNode
}

const SectionTitleAdmin = ({
  label,
  description,
  actionButton,
}: SectionTitleAdminProps) => {
  return (
    <section className="flex w-full flex-wrap items-center justify-between gap-4 p-4">
      <div>
        <h2 className="text-center text-2xl font-bold text-gray-800 lg:text-start">
          {label}
        </h2>
        <p className="text-center text-gray-600 lg:text-start">{description}</p>
      </div>
      <div className="flex w-full justify-center lg:w-fit lg:justify-end">
        {actionButton}
      </div>
    </section>
  )
}

export default SectionTitleAdmin
