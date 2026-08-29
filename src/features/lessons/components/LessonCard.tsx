import { Link } from 'react-router-dom'
import { Cpu, Zap, Wrench, ArrowRight } from 'lucide-react'
import Badge from '../../../shared/components/Badge'
import Avatar from '../../../shared/components/Avatar'
import StarRating from '../../../shared/components/StarRating'
import type { Lesson } from '../types'

const bannerGradient: Record<Lesson['categoryColor'], string> = {
  blue: 'from-blue-700 via-blue-500 to-sky-400',
  orange: 'from-orange-700 via-orange-500 to-amber-400',
  green: 'from-emerald-700 via-emerald-500 to-green-400',
}

const bannerIcon: Record<Lesson['categoryColor'], typeof Cpu> = {
  blue: Cpu,
  orange: Zap,
  green: Wrench,
}

export default function LessonCard({ lesson }: { lesson: Lesson }) {
  const Icon = bannerIcon[lesson.categoryColor]

  return (
    <div className="flex flex-col overflow-hidden rounded-xl border border-border bg-bg-card">
      <div
        className={`relative flex h-36 flex-col items-center justify-center gap-2 bg-gradient-to-br ${bannerGradient[lesson.categoryColor]} text-white`}
      >
        <Badge color={lesson.categoryColor} className="absolute left-3 top-3">
          {lesson.categoryLabel}
        </Badge>
        <Icon size={32} strokeWidth={1.5} />
        <span className="text-xs font-medium text-white/90">{lesson.caption}</span>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-4">
        <h3 className="line-clamp-2 min-h-[2.7em] text-base font-bold leading-snug text-text-primary">
          {lesson.title}
        </h3>

        <div className="flex items-center gap-2 text-sm text-text-muted">
          <Avatar initials={lesson.authorInitials} color={lesson.authorAvatarColor} size="sm" />
          <span>{lesson.authorName}</span>
        </div>

        {lesson.rating !== undefined ? (
          <StarRating rating={lesson.rating} reviewCount={lesson.reviewCount} />
        ) : (
          <span className="text-sm text-text-muted">No reviews yet</span>
        )}

        <Link
          to={`/lessons/${lesson.id}`}
          className="mt-auto flex items-center justify-center gap-1.5 rounded-lg border border-border py-2 text-sm font-medium text-text-primary transition-colors hover:border-accent hover:text-accent"
        >
          Open Lesson <ArrowRight size={15} />
        </Link>
      </div>
    </div>
  )
}
