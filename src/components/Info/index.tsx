type InfoProps = {
  label: string
  value: string
}

export function Info({ label, value }: InfoProps) {
  return (
    <div className="rounded-lg border p-3">
      <span className="text-muted-foreground text-xs">{label}</span>

      <p className="font-medium">{value}</p>
    </div>
  )
}
