export default function Footer() {
  return (
    <footer className="border-t border-border bg-bg-page">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-6 sm:flex-row sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-1 sm:items-start">
          <span className="text-base font-bold tracking-tight text-text-primary">Advansys</span>
          <p className="text-xs text-text-muted">
            &copy; 2026 Advansys Intelligent Solutions. All rights reserved.
          </p>
        </div>
        <div className="flex items-center gap-6 text-xs text-text-muted">
          <a href="#" className="transition-colors hover:text-text-primary">
            Privacy Policy
          </a>
          <a href="#" className="transition-colors hover:text-text-primary">
            Terms of Service
          </a>
          <a href="#" className="transition-colors hover:text-text-primary">
            Support
          </a>
        </div>
      </div>
    </footer>
  )
}
