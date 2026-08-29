import type { ReactNode } from 'react'

export default function NumberedSection({
  number,
  title,
  children,
}: {
  number: number
  title: string
  children: ReactNode
}) {
  return (
    <div className="rounded-xl border border-border bg-bg-card p-6">
      <div className="mb-5 flex items-center gap-3">
        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent text-sm font-bold text-white">
          {number}
        </span>
        <h2 className="text-base font-bold text-text-primary">{title}</h2>
      </div>
      {children}
    </div>
  )
}
