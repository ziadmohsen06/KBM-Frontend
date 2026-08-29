import type { InputHTMLAttributes, ReactNode } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  icon?: ReactNode
}

export default function Input({ label, icon, className = '', id, ...rest }: InputProps) {
  return (
    <label className="flex w-full flex-col gap-1.5" htmlFor={id}>
      {label && <span className="text-sm font-medium text-text-primary">{label}</span>}
      <div className="relative flex items-center">
        {icon && <span className="pointer-events-none absolute left-3 text-text-muted">{icon}</span>}
        <input
          id={id}
          className={`w-full rounded-lg border border-border bg-bg-card px-3 py-2.5 text-sm text-text-primary placeholder:text-text-muted outline-none transition-colors focus:border-accent ${icon ? 'pl-9' : ''} ${className}`}
          {...rest}
        />
      </div>
    </label>
  )
}
