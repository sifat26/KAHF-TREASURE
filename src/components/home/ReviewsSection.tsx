import { Section, SectionHeader } from '@/components/ui/Section';
import { Rating } from '@/components/ui/Rating';
import { RevealGroup, RevealItem } from '@/components/ui/Reveal';
import { reviews, REVIEWS_ARE_PLACEHOLDER } from '@/data/reviews';

/**
 * ReviewsSection — editorial review cards.
 * Large gold quote glyph, dark card surface, generous padding.
 */
export function ReviewsSection() {
  return (
    <Section style={{ background: 'var(--color-background)' }}>
      <SectionHeader
        eyebrow="Loved by customers"
        title="What our customers say"
        description="Real experiences from the KAHF Treasure community."
      />

      {REVIEWS_ARE_PLACEHOLDER && (
        <p
          className="mx-auto mb-10 max-w-xl rounded-[12px] px-4 py-2.5 text-center text-xs"
          style={{
            border: '1px dashed var(--color-border)',
            background: 'var(--color-card)',
            color: 'var(--color-muted)',
          }}
        >
          Placeholder testimonials — to be replaced with verified customer reviews before launch.
        </p>
      )}

      <RevealGroup className="grid gap-5 md:grid-cols-3">
        {reviews.map((review) => (
          <RevealItem key={review.id}>
            <figure
              className="flex h-full flex-col rounded-[20px] p-8"
              style={{
                background: 'var(--color-card)',
                border: '1px solid var(--color-border)',
                boxShadow: 'var(--shadow-card)',
              }}
            >
              {/* Large decorative quote glyph */}
              <span
                aria-hidden="true"
                className="mb-4 block font-serif text-5xl leading-none select-none"
                style={{
                  color: 'var(--color-accent)',
                  opacity: 0.35,
                  fontFamily: 'Georgia, serif',
                }}
              >
                &ldquo;
              </span>

              <Rating value={review.rating} />

              <blockquote className="mt-4 flex-1">
                <p
                  className="font-display text-xl leading-snug"
                  style={{ color: 'var(--color-text-primary)' }}
                >
                  &ldquo;{review.title}&rdquo;
                </p>
                <p
                  className="mt-3 text-sm leading-[1.8]"
                  style={{ color: 'var(--color-text-secondary)' }}
                >
                  {review.body}
                </p>
              </blockquote>

              <figcaption
                className="mt-7 pt-5 text-sm"
                style={{ borderTop: '1px solid var(--color-border)' }}
              >
                <span
                  className="block font-semibold"
                  style={{ color: 'var(--color-text-primary)' }}
                >
                  {review.name}
                </span>
                {review.location && (
                  <span
                    className="text-xs"
                    style={{ color: 'var(--color-muted)' }}
                  >
                    {review.location}
                  </span>
                )}
                {review.productName && (
                  <span
                    className="mt-1 block text-xs"
                    style={{ color: 'var(--color-accent)', opacity: 0.8 }}
                  >
                    on {review.productName}
                  </span>
                )}
              </figcaption>
            </figure>
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  );
}
