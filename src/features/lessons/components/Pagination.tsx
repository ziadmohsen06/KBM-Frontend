import { ChevronLeft, ChevronRight } from 'lucide-react'

function buildPageList(current: number, total: number): (number | '...')[] {
  if (total <= 5) return Array.from({ length: total }, (_, i) => i + 1)
  const pages = new Set([1, 2, total - 1, total, current - 1, current, current + 1])
  const sorted = [...pages].filter((p) => p >= 1 && p <= total).sort((a, b) => a - b)

  const result: (number | '...')[] = []
  sorted.forEach((p, i) => {
    if (i > 0 && p - (sorted[i - 1] as number) > 1) result.push('...')
    result.push(p)
  })
  return result
}

export default function Pagination({
  page,
  totalPages,
  onPageChange,
}: {
  page: number
  totalPages: number
  onPageChange: (page: number) => void
}) {
  const pages = buildPageList(page, totalPages)

  return (
    <div className="flex items-center justify-center gap-1.5">
      <button
        aria-label="Previous page"
        disabled={page === 1}
        onClick={() => onPageChange(Math.max(1, page - 1))}
        className="flex h-8 w-8 items-center justify-center rounded-lg border border-border text-text-muted transition-colors hover:border-accent hover:text-accent disabled:opacity-40 disabled:hover:border-border disabled:hover:text-text-muted cursor-pointer disabled:cursor-not-allowed"
      >
        <ChevronLeft size={15} />
      </button>
      {pages.map((p, i) =>
        p === '...' ? (
          <span key={`ellipsis-${i}`} className="px-1 text-sm text-text-muted">
            ...
          </span>
        ) : (
          <button
            key={p}
            onClick={() => onPageChange(p)}
            className={`flex h-8 w-8 items-center justify-center rounded-lg text-sm font-medium transition-colors cursor-pointer ${
              page === p
                ? 'bg-accent text-white'
                : 'text-text-muted hover:bg-bg-card-alt hover:text-text-primary'
            }`}
          >
            {p}
          </button>
        ),
      )}
      <button
        aria-label="Next page"
        disabled={page === totalPages}
        onClick={() => onPageChange(Math.min(totalPages, page + 1))}
        className="flex h-8 w-8 items-center justify-center rounded-lg border border-border text-text-muted transition-colors hover:border-accent hover:text-accent disabled:opacity-40 disabled:hover:border-border disabled:hover:text-text-muted cursor-pointer disabled:cursor-not-allowed"
      >
        <ChevronRight size={15} />
      </button>
    </div>
  )
}
