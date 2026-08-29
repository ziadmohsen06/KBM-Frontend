import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

export default function Pagination() {
  const [page, setPage] = useState(1)
  const pages = [1, 2, 3, '...', 12]

  return (
    <div className="flex items-center justify-center gap-1.5">
      <button
        aria-label="Previous page"
        onClick={() => setPage((p) => Math.max(1, p - 1))}
        className="flex h-8 w-8 items-center justify-center rounded-lg border border-border text-text-muted transition-colors hover:border-accent hover:text-accent cursor-pointer"
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
            onClick={() => setPage(p as number)}
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
        onClick={() => setPage((p) => Math.min(12, p + 1))}
        className="flex h-8 w-8 items-center justify-center rounded-lg border border-border text-text-muted transition-colors hover:border-accent hover:text-accent cursor-pointer"
      >
        <ChevronRight size={15} />
      </button>
    </div>
  )
}
