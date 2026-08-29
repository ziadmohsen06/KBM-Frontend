import type { ReactNode } from 'react'

type BadgeColor = 'blue' | 'orange' | 'green' | 'neutral'

const colorClasses: Record<BadgeColor, string> = {
  blue: 'bg-blue-500 text-white',
  orange: 'bg-orange-500 text-white',
  green: 'bg-emerald-500 text-white',
  neutral: 'bg-bg-card-alt text-text-muted border border-border',
}

export default function Badge({
  children,
  color = 'neutral',
  className = '',
}: {
  children: ReactNode
  color?: BadgeColor
  className?: string
}) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-semibold tracking-wide uppercase ${colorClasses[color]} ${className}`}
    >
      {children}
    </span>
  )
}
