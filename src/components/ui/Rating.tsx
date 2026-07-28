import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

/** Gold star rating (read-only). */
export function Rating({
  value,
  count,
  size = 16,
  className,
}: {
  value: number;
  count?: number;
  size?: number;
  className?: string;
}) {
  const full = Math.round(value);
  return (
    <div className={cn('flex items-center gap-1.5', className)}>
      <div className="flex" role="img" aria-label={`Rated ${value} out of 5`}>
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            size={size}
            className={cn(
              i < full ? 'fill-[var(--color-gold)] text-[var(--color-gold)]' : 'fill-none text-line',
            )}
            strokeWidth={1.5}
          />
        ))}
      </div>
      {typeof count === 'number' && (
        <span className="text-xs text-muted">({count})</span>
      )}
    </div>
  );
}
