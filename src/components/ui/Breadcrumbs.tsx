import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface Crumb {
  name: string;
  href: string;
}

/** Visual breadcrumb trail. Pair with <BreadcrumbJsonLd> for SEO. */
export function Breadcrumbs({ items, className }: { items: Crumb[]; className?: string }) {
  return (
    <nav aria-label="Breadcrumb" className={cn('text-sm', className)}>
      <ol className="flex flex-wrap items-center gap-1.5 text-muted">
        {items.map((item, i) => {
          const last = i === items.length - 1;
          return (
            <li key={item.href} className="flex items-center gap-1.5">
              {last ? (
                <span aria-current="page" className="text-ink">
                  {item.name}
                </span>
              ) : (
                <Link href={item.href} className="transition-colors hover:text-ink">
                  {item.name}
                </Link>
              )}
              {!last && <ChevronRight size={14} className="text-line" aria-hidden="true" />}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
