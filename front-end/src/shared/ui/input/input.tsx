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
  Icon,
  error,
  ...props
}: InputProps) {
  return (
    <div className="relative">
      {label && (
        <label htmlFor={id || name} className="text-sm mb-1.5 block opacity-70">
          {label}
        </label>
      )}

      {Icon && (
        <Icon size={16} className="absolute bottom-2.5 left-3 opacity-50" />
      )}

      <input
        id={id || name}
        name={name}
        type={type}
        data-slot="input"
        aria-invalid={!!error}
        className={cn(
          'file:text-foreground/60 font-mono text-foreground placeholder:text-foreground/40 border-transparent h-9 w-full min-w-0 rounded-md border bg-[#ececec] px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-white/80 file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
          'focus-visible:border-white/80 focus-visible:ring-white/80 focus-visible:ring-1',
          'aria-invalid:text-red-50 aria-invalid:ring-destructive/20 aria-invalid:border-destructive',
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
