import { ButtonLink } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { Reveal } from '@/components/ui/Reveal';
import { brandStory } from '@/data/site';

/** Brand story — mission/vision narrative (BUSINESS_REQUIREMENTS » Content). */
export function BrandStory() {
  return (
    <section className="bg-surface-2">
      <Container className="grid items-center gap-12 py-20 lg:grid-cols-2 lg:py-28">
        <Reveal>
          <span className="eyebrow mb-4 block">Our Story</span>
          <h2 className="font-display text-3xl leading-tight text-ink sm:text-4xl">
            Crafted for those who appreciate the art of fragrance
          </h2>
          <span className="gold-rule my-6 block w-16" aria-hidden="true" />
          <p className="mb-4 leading-relaxed text-muted">{brandStory.mission}</p>
          <p className="leading-relaxed text-muted">{brandStory.vision}</p>
          <ButtonLink href="/about" variant="link" className="mt-6">
            Read more about us →
          </ButtonLink>
        </Reveal>

        <Reveal delay={0.1}>
          <ul className="grid grid-cols-2 gap-4">
            {brandStory.values.slice(0, 6).map((value) => (
              <li
                key={value}
                className="rounded-[var(--radius-card)] border border-line bg-canvas p-5 text-center shadow-[var(--shadow-card)]"
              >
                <span className="font-display text-lg text-ink">{value}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </Container>
    </section>
  );
}
