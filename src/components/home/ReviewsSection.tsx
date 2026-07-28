import { Section, SectionHeader } from '@/components/ui/Section';
import { Rating } from '@/components/ui/Rating';
import { RevealGroup, RevealItem } from '@/components/ui/Reveal';
import { reviews, REVIEWS_ARE_PLACEHOLDER } from '@/data/reviews';

/** Customer reviews. Renders placeholder data until real reviews are supplied. */
export function ReviewsSection() {
  return (
    <Section className="bg-surface-2">
      <SectionHeader
        eyebrow="Loved by customers"
        title="What our customers say"
        description="Real experiences from the KAHF Treasure community."
      />

      {REVIEWS_ARE_PLACEHOLDER && (
        <p className="mx-auto mb-8 max-w-xl rounded-lg border border-dashed border-line bg-canvas px-4 py-2 text-center text-xs text-muted">
          {/* Visible only until genuine reviews are added. */}
          Placeholder testimonials — to be replaced with verified customer reviews before launch.
        </p>
      )}

      <RevealGroup className="grid gap-6 md:grid-cols-3">
        {reviews.map((review) => (
          <RevealItem key={review.id}>
            <figure className="flex h-full flex-col rounded-[var(--radius-card)] border border-line bg-canvas p-7 shadow-[var(--shadow-card)]">
              <Rating value={review.rating} />
              <blockquote className="mt-4 flex-1">
                <p className="font-display text-lg leading-snug text-ink">“{review.title}”</p>
                <p className="mt-2 text-sm leading-relaxed text-muted">{review.body}</p>
              </blockquote>
              <figcaption className="mt-6 border-t border-line pt-4 text-sm">
                <span className="font-medium text-ink">{review.name}</span>
                {review.location && <span className="text-muted"> · {review.location}</span>}
                {review.productName && (
                  <span className="mt-0.5 block text-xs text-muted">on {review.productName}</span>
                )}
              </figcaption>
            </figure>
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  );
}
