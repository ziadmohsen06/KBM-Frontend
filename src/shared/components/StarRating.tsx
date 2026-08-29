function Star({ fill }: { fill: number }) {
  const id = `star-clip-${Math.random().toString(36).slice(2)}`
  return (
    <svg viewBox="0 0 20 20" className="h-4 w-4 shrink-0">
      <defs>
        <clipPath id={id}>
          <rect x="0" y="0" width={20 * fill} height="20" />
        </clipPath>
      </defs>
      <path
        d="M10 1.5l2.6 5.27 5.82.85-4.21 4.1 1 5.8L10 14.9l-5.21 2.62 1-5.8-4.21-4.1 5.82-.85z"
        className="fill-none stroke-1"
        style={{ stroke: '#f5a623' }}
      />
      <path
        d="M10 1.5l2.6 5.27 5.82.85-4.21 4.1 1 5.8L10 14.9l-5.21 2.62 1-5.8-4.21-4.1 5.82-.85z"
        style={{ fill: '#f5a623' }}
        clipPath={`url(#${id})`}
      />
    </svg>
  )
}

export default function StarRating({
  rating,
  reviewCount,
  showNumeric = false,
  size = 'md',
}: {
  rating: number
  reviewCount?: number
  showNumeric?: boolean
  size?: 'sm' | 'md'
}) {
  const stars = Array.from({ length: 5 }, (_, i) => {
    const fill = Math.max(0, Math.min(1, rating - i))
    return <Star key={i} fill={fill} />
  })

  return (
    <div className={`inline-flex items-center gap-1 ${size === 'sm' ? 'text-xs' : 'text-sm'}`}>
      <div className="flex items-center gap-0.5">{stars}</div>
      {showNumeric && <span className="font-semibold text-text-primary">{rating.toFixed(1)}</span>}
      {reviewCount !== undefined && (
        <span className="text-text-muted">({reviewCount}{showNumeric ? ' reviews' : ''})</span>
      )}
    </div>
  )
}
