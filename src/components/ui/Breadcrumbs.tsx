import { cn } from '@/lib/utils';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';

export interface Crumb {
  name: string;
  href: string;
}

/** Visual breadcrumb trail. Pair with <BreadcrumbJsonLd> for SEO. */
export function Breadcrumbs({ items, className }: { items: Crumb[]; className?: string }) {
  return (
    <nav aria-label='Breadcrumb' className={cn('text-xs font-medium', className)}>
      <ol className='flex flex-wrap items-center gap-1.5 text-[var(--color-text-secondary)]'>
        {items.map((item, i) => {
          const last = i === items.length - 1;
          return (
            <li key={item.href} className='flex items-center gap-1.5'>
              {last ? (
                <span aria-current='page' className='font-semibold text-[var(--color-gold)]'>
                  {item.name}
                </span>
              ) : (
                <Link href={item.href} className='transition-colors hover:text-[var(--color-gold)]'>
                  {item.name}
                </Link>
              )}
              {!last && <ChevronRight size={13} className='text-[var(--color-gold)]/50' aria-hidden='true' />}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
