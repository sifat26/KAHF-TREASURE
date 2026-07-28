import * as React from 'react';
import { cn } from '@/lib/utils';

const fieldBase =
  'w-full rounded-[var(--radius-input)] border border-line bg-canvas px-4 text-sm text-ink-soft placeholder:text-muted/70 transition-colors duration-200 focus:border-ink focus:outline-none focus-visible:outline-none disabled:opacity-60';

export const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => (
    <input ref={ref} className={cn(fieldBase, 'h-11', className)} {...props} />
  ),
);
Input.displayName = 'Input';

export const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ className, ...props }, ref) => (
  <textarea ref={ref} className={cn(fieldBase, 'py-3 resize-none min-h-28', className)} {...props} />
));
Textarea.displayName = 'Textarea';

export const Select = React.forwardRef<
  HTMLSelectElement,
  React.SelectHTMLAttributes<HTMLSelectElement>
>(({ className, ...props }, ref) => (
  <select
    ref={ref}
    className={cn(fieldBase, 'h-11 appearance-none bg-canvas pr-10', className)}
    {...props}
  />
));
Select.displayName = 'Select';

/** Labelled field wrapper with error/description slots. */
export function Field({
  label,
  htmlFor,
  required,
  error,
  description,
  children,
  className,
}: {
  label: string;
  htmlFor?: string;
  required?: boolean;
  error?: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn('flex flex-col gap-1.5', className)}>
      <label
        htmlFor={htmlFor}
        className="text-xs font-medium uppercase tracking-[0.14em] text-muted"
      >
        {label}
        {required && <span className="ml-1 text-[var(--color-gold-deep)]">*</span>}
      </label>
      {children}
      {description && !error && <p className="text-xs text-muted">{description}</p>}
      {error && (
        <p className="text-xs text-[var(--color-error)]" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
