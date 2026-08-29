import { UploadCloud } from 'lucide-react'

export default function UploadDropzone({
  title,
  hint,
  label,
}: {
  title: string
  hint: string
  label: string
}) {
  return (
    <label className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-border p-6 text-center transition-colors hover:border-accent">
      <input type="file" className="hidden" />
      <UploadCloud size={22} className="text-text-muted" />
      <p className="text-sm font-medium text-text-primary">{title}</p>
      <p className="text-xs text-text-muted">{hint}</p>
      <p className="text-xs text-text-muted">{label}</p>
    </label>
  )
}
