import { Star } from 'lucide-react'

interface ReviewSummaryProps {
  title: string
  projectName: string
  industry: string
  section: string
  description: string
  fileCount: number
  status: string
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-0.5">
      <span className="text-xs text-text-muted">{label}</span>
      <span className={`text-sm ${value ? 'text-text-primary' : 'text-text-muted italic'}`}>
        {value || 'Not provided'}
      </span>
    </div>
  )
}

function SectionLabel({ children }: { children: string }) {
  return <h3 className="text-xs font-bold uppercase tracking-wide text-text-muted">{children}</h3>
}

export default function ReviewSummary({
  title,
  projectName,
  industry,
  section,
  description,
  fileCount,
  status,
}: ReviewSummaryProps) {
  return (
    <div className="flex flex-col gap-5 rounded-xl border border-border bg-bg-card p-5">
      <div className="flex items-center gap-2">
        <Star size={16} className="text-amber-400" fill="currentColor" />
        <h2 className="text-sm font-bold text-text-primary">Review Summary</h2>
      </div>

      <div className="flex flex-col gap-3">
        <SectionLabel>Basic Information</SectionLabel>
        <Field label="Lesson Title" value={title} />
        <Field label="Project Name" value={projectName} />
        <Field label="Industry" value={industry} />
        <Field label="Section" value={section} />
      </div>

      <div className="flex flex-col gap-3 border-t border-border pt-4">
        <SectionLabel>Lesson Content</SectionLabel>
        <Field label="Description" value={description} />
      </div>

      <div className="flex flex-col gap-3 border-t border-border pt-4">
        <SectionLabel>Attachments</SectionLabel>
        <Field label="Files" value={`${fileCount} item${fileCount !== 1 ? 's' : ''}`} />
        <Field label="Status" value={status} />
      </div>

      <div className="rounded-lg bg-bg-card-alt p-3 text-xs text-text-muted">
        All changes are saved as you type. You can save draft or submit when ready.
      </div>
    </div>
  )
}
