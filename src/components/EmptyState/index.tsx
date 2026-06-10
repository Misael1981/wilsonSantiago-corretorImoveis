type EmptyStateProps = {
  description: string
}

const EmptyState = ({ description }: EmptyStateProps) => {
  return (
    <div className="h-[30vh] w-full p-4 lg:p-8">
      <div className="flex h-full items-center justify-center rounded-lg border-2 border-dashed border-zinc-300">
        <p className="text-muted-foreground text-lg">{description}</p>
      </div>
    </div>
  )
}

export default EmptyState
