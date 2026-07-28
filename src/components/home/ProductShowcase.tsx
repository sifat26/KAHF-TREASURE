import type { Product } from '@/data/products';
import { Section, SectionHeader } from '@/components/ui/Section';
import { ButtonLink } from '@/components/ui/Button';
import { ProductGrid } from '@/components/product/ProductGrid';
import { ProductRail } from '@/components/product/ProductRail';

/**
 * Reusable homepage product section. Grid on desktop, horizontal rail on mobile
 * to keep the page compact. Used for Best Sellers / New Arrivals / Featured.
 */
export function ProductShowcase({
  eyebrow,
  title,
  description,
  products,
  viewAllHref,
  viewAllLabel = 'View all',
  surface,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  products: Product[];
  viewAllHref?: string;
  viewAllLabel?: string;
  surface?: boolean;
}) {
  if (products.length === 0) return null;

  return (
    <Section className={surface ? 'bg-surface-2' : 'bg-canvas'}>
      <SectionHeader
        align="left"
        eyebrow={eyebrow}
        title={title}
        description={description}
        action={
          viewAllHref ? (
            <ButtonLink href={viewAllHref} variant="link">
              {viewAllLabel} →
            </ButtonLink>
          ) : undefined
        }
      />

      {/* Desktop grid */}
      <div className="hidden sm:block">
        <ProductGrid products={products.slice(0, 4)} />
      </div>
      {/* Mobile rail */}
      <div className="sm:hidden">
        <ProductRail products={products.slice(0, 8)} />
      </div>
    </Section>
  );
}
