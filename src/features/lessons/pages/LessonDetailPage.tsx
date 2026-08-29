import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, Download, ExternalLink, Share2, Plus } from 'lucide-react'
import Breadcrumb from '../../../shared/components/Breadcrumb'
import Button from '../../../shared/components/Button'
import Avatar from '../../../shared/components/Avatar'
import StarRating from '../../../shared/components/StarRating'
import FallbackBanner from '../../../shared/components/FallbackBanner'
import { useLesson } from '../hooks/useLesson'

const bannerColor: Record<string, string> = {
  blue: 'bg-gradient-to-r from-blue-700 via-blue-500 to-sky-400',
  orange: 'bg-gradient-to-r from-orange-700 via-orange-500 to-amber-400',
  green: 'bg-gradient-to-r from-emerald-700 via-emerald-500 to-green-400',
}

export default function LessonDetailPage() {
  const { id } = useParams<{ id: string }>()
  const { lesson, loading, isFallback } = useLesson(id)

  if (!lesson && loading) {
    return <div className="mx-auto max-w-7xl px-4 py-16 text-center text-text-muted sm:px-6 lg:px-8">Loading...</div>
  }

  if (!lesson) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-16 text-center sm:px-6 lg:px-8">
        <p className="text-text-muted">Lesson not found.</p>
        <Link to="/lessons" className="mt-4 inline-block text-accent">
          Back to Lessons
        </Link>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <Breadcrumb
        items={[{ label: 'Home', to: '/' }, { label: 'Lessons Learned', to: '/lessons' }, { label: 'Lesson Details' }]}
      />

      {isFallback && (
        <div className="mt-4">
          <FallbackBanner />
        </div>
      )}

      <div className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="flex flex-col gap-6 lg:col-span-2">
          <div className="overflow-hidden rounded-xl border border-border bg-bg-card">
            <div className={`h-2 w-full ${bannerColor[lesson.categoryColor]}`} />
            <div className="p-6">
              <h1 className="text-2xl font-bold text-text-primary sm:text-3xl">{lesson.title}</h1>
              <p className="mt-2 text-sm italic text-text-muted">Project: {lesson.projectName}</p>

              <div className="mt-6 flex flex-col gap-4 border-t border-border pt-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-3">
                  <Avatar initials={lesson.authorInitials} color={lesson.authorAvatarColor} />
                  <div>
                    <p className="text-xs text-text-muted">Author</p>
                    <p className="text-sm font-medium text-text-primary">{lesson.authorName}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  {lesson.rating !== undefined ? (
                    <StarRating rating={lesson.rating} reviewCount={lesson.reviewCount} showNumeric />
                  ) : (
                    <span className="text-sm text-text-muted">No reviews yet</span>
                  )}
                  <button className="flex items-center gap-1 text-sm text-text-muted transition-colors hover:text-accent cursor-pointer">
                    <Share2 size={14} /> Share
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-border bg-bg-card p-6">
            <h2 className="text-xs font-bold uppercase tracking-wide text-text-muted">Value Proposition</h2>
            <p className="mt-2 italic text-text-primary">{lesson.valueProposition}</p>
          </div>

          <div className="rounded-xl border border-border bg-bg-card p-6">
            <h2 className="text-xs font-bold uppercase tracking-wide text-text-muted">Description</h2>
            <div className="mt-2 flex flex-col gap-3 text-sm leading-relaxed text-text-primary">
              {lesson.description.split('\n\n').map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>
          </div>

          <Link to="/lessons" className="self-start">
            <Button variant="outline">
              <ArrowLeft size={15} /> Back to Lessons
            </Button>
          </Link>
        </div>

        <div className="flex flex-col gap-6">
          <div className="rounded-xl border border-border bg-bg-card p-5">
            <h3 className="text-xs font-bold uppercase tracking-wide text-text-muted">Attachments</h3>
            <div className="mt-3 flex flex-col gap-2">
              {lesson.attachments.length === 0 && <p className="text-sm text-text-muted">No attachments.</p>}
              {lesson.attachments.map((file) => (
                <div
                  key={file.name}
                  className="flex items-center justify-between gap-2 rounded-lg border border-border p-3"
                >
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-text-primary">{file.name}</p>
                    <p className="text-xs text-text-muted">
                      {file.size} &middot; {file.type}
                    </p>
                  </div>
                  <button
                    aria-label="Download"
                    className="shrink-0 text-text-muted transition-colors hover:text-accent cursor-pointer"
                  >
                    <Download size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-border bg-bg-card p-5">
            <h3 className="text-xs font-bold uppercase tracking-wide text-text-muted">Quick Links</h3>
            <div className="mt-3 flex flex-col gap-2">
              {lesson.quickLinks.length === 0 && <p className="text-sm text-text-muted">No quick links.</p>}
              {lesson.quickLinks.map((link) => (
                <a
                  key={link.label}
                  href="#"
                  className="flex items-center gap-2 text-sm text-text-primary transition-colors hover:text-accent"
                >
                  <ExternalLink size={14} className="text-text-muted" />
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-border bg-bg-card p-5">
            <h3 className="text-xs font-bold uppercase tracking-wide text-text-muted">Keywords</h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {lesson.keywords.map((kw) => (
                <span
                  key={kw}
                  className="rounded-full bg-bg-card-alt px-3 py-1 text-xs font-medium text-text-muted"
                >
                  #{kw}
                </span>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-accent/30 bg-accent/10 p-5">
            <h3 className="font-bold text-text-primary">Have a similar lesson?</h3>
            <p className="mt-1 text-sm text-text-muted">
              Sharing your experience helps our engineering community grow stronger.
            </p>
            <Link to="/lessons/create" className="mt-4 block">
              <Button variant="primary" className="w-full">
                <Plus size={15} /> Create Lesson
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
