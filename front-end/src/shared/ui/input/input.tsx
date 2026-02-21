import { cn } from '@shared/utils'
import { InputProps } from './types'

// TODO: Move label, error, and other related UI elements
// to a separate component (Field component probably)

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
          'file:text-foreground/60 font-mono text-foreground placeholder:text-foreground/40 dark:bg-white/80 border-transparent h-9 w-full min-w-0 rounded-md border bg-white/80 px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-white/80 file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
          'focus-visible:border-white/80 focus-visible:ring-white/80 focus-visible:ring-1',
          'aria-invalid:text-red-50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
          className,
        )}
        {...props}
      />
      {error && (
        <p className="text-destructive text-sm block -mt-1">{error.message}</p>
      )}
    </div>
  )
}
