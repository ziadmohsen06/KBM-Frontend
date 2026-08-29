export default function PlaceholderPage({ title }: { title: string }) {
  return (
    <div className="mx-auto max-w-3xl px-4 py-24 text-center sm:px-6">
      <h1 className="text-2xl font-bold text-text-primary">{title}</h1>
      <p className="mt-2 text-sm text-text-muted">This section is coming soon.</p>
    </div>
  )
}
