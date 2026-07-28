import { ButtonLink } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { ProductBottle } from '@/components/ui/ProductBottle';
import { site } from '@/data/site';
import { getBestSellers, getFeatured } from '@/lib/products';

/**
 * Hero — full-width luxury banner (BRAND_GUIDELINES.md » Banner Style:
 * large imagery, elegant type, minimal text, one clear CTA).
 * Uses a warm vignette + layered bottle illustrations in place of the
 * (not-yet-available) lifestyle photography.
 */
export function Hero() {
  const showcase = [...getFeatured(), ...getBestSellers()].slice(0, 3);

  return (
    <section className="relative overflow-hidden lux-vignette">
      <Container className="relative grid items-center gap-10 py-16 lg:grid-cols-2 lg:gap-8 lg:py-24">
        {/* Copy */}
        <div className="relative z-10 max-w-xl">
          <span className="eyebrow mb-5 block">{site.type}</span>
          <h1 className="font-display text-4xl leading-[1.05] text-ink sm:text-5xl lg:text-6xl">
            Luxury in Every Drop
          </h1>
          <p className="mt-6 max-w-md text-base leading-relaxed text-muted sm:text-lg">
            Authentic, long-lasting, alcohol-free attar — crafted with premium imported oils for
            everyday elegance and special occasions.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-3">
            <ButtonLink href="/shop" variant="primary" size="lg">
              Shop the Collection
            </ButtonLink>
            <ButtonLink href="/collections" variant="secondary" size="lg">
              Explore Collections
            </ButtonLink>
          </div>

          {/* Quiet trust line */}
          <p className="mt-10 text-xs uppercase tracking-[0.18em] text-muted">
            Alcohol-Free · Premium Imported Oils · Long-Lasting
          </p>
        </div>

        {/* Visual */}
        <div className="relative">
          <div className="relative mx-auto grid max-w-md grid-cols-2 gap-4">
            {showcase[0] && (
              <div className="col-span-2 overflow-hidden rounded-[var(--radius-image)] border border-line bg-canvas shadow-[var(--shadow-soft)]">
                <ProductBottle
                  name={showcase[0].name}
                  family={showcase[0].family}
                  className="aspect-[16/10] w-full"
                />
              </div>
            )}
            {showcase.slice(1, 3).map((p) => (
              <div
                key={p.slug}
                className="overflow-hidden rounded-[var(--radius-image)] border border-line bg-canvas shadow-[var(--shadow-card)]"
              >
                <ProductBottle name={p.name} family={p.family} className="aspect-square w-full" compact />
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
