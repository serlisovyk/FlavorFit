import { cn } from '@shared/utils'
import { InputProps } from './types'

export function Input({
  className,
  id,
  name,
  type,
  label,
  labelClassName,
  error,
  ...props
}: InputProps) {
  return (
    <div>
      {label && (
        <label
          className={cn(!labelClassName ? 'sr-only' : labelClassName)}
          htmlFor={id || name}
        >
          {label}
        </label>
      )}
      <input
        id={id || name}
        name={name}
        type={type}
        data-slot="input"
        aria-invalid={!!error}
        className={cn(
          'file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
          'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
          'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
          error && 'border-red-500 focus-visible:ring-red-500/50',
          className,
        )}
        {...props}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
    </div>
  )
}
