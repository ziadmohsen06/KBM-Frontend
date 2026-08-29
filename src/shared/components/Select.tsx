import type { SelectHTMLAttributes } from 'react'

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  placeholder?: string
  options?: string[]
  idOptions?: { id: string; name: string }[]
}

export default function Select({ label, placeholder, options, idOptions, className = '', id, ...rest }: SelectProps) {
  return (
    <label className="flex w-full flex-col gap-1.5" htmlFor={id}>
      {label && <span className="text-sm font-medium text-text-primary">{label}</span>}
      <select
        id={id}
        defaultValue={rest.value === undefined ? '' : undefined}
        className={`w-full appearance-none rounded-lg border border-border bg-bg-card bg-[url('data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2020%2020%22%20fill%3D%22%2394a3b8%22%3E%3Cpath%20d%3D%22M5.5%207.5l4.5%205%204.5-5z%22%2F%3E%3C%2Fsvg%3E')] bg-[right_0.75rem_center] bg-no-repeat px-3 py-2.5 pr-9 text-sm text-text-primary outline-none transition-colors focus:border-accent ${className}`}
        {...rest}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {idOptions
          ? idOptions.map((opt) => (
              <option key={opt.id} value={opt.id}>
                {opt.name}
              </option>
            ))
          : options?.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
      </select>
    </label>
  )
}
