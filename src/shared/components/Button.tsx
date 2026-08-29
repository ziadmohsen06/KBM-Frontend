import type { ButtonHTMLAttributes, ReactNode } from 'react'

type Variant = 'primary' | 'secondary' | 'outline' | 'danger-outline' | 'ghost'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  children: ReactNode
}

const variantClasses: Record<Variant, string> = {
  primary: 'bg-accent text-white hover:bg-accent-hover border border-transparent',
  secondary:
    'bg-bg-card-alt text-text-primary border border-border hover:bg-border/60',
  outline:
    'bg-transparent text-text-primary border border-border hover:border-accent hover:text-accent',
  'danger-outline':
    'bg-transparent text-red-500 border border-red-500/50 hover:bg-red-500/10',
  ghost: 'bg-transparent text-text-primary hover:bg-bg-card-alt border border-transparent',
}

export default function Button({
  variant = 'primary',
  className = '',
  children,
  ...rest
}: ButtonProps) {
  return (
    <button
      className={`inline-flex items-center justify-center gap-1.5 rounded-lg px-4 py-2 text-sm font-medium transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ${variantClasses[variant]} ${className}`}
      {...rest}
    >
      {children}
    </button>
  )
}
