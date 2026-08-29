type AvatarColor = 'orange' | 'green' | 'blue' | 'purple'

const colorClasses: Record<AvatarColor, string> = {
  orange: 'bg-orange-500',
  green: 'bg-emerald-500',
  blue: 'bg-blue-500',
  purple: 'bg-purple-500',
}

export default function Avatar({
  initials,
  color = 'blue',
  size = 'md',
}: {
  initials: string
  color?: AvatarColor
  size?: 'sm' | 'md' | 'lg'
}) {
  const sizeClasses = {
    sm: 'h-7 w-7 text-xs',
    md: 'h-9 w-9 text-sm',
    lg: 'h-11 w-11 text-base',
  }[size]

  return (
    <span
      className={`inline-flex shrink-0 items-center justify-center rounded-full font-semibold text-white ${colorClasses[color]} ${sizeClasses}`}
    >
      {initials}
    </span>
  )
}
