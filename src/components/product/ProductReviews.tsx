import { Rating } from '@/components/ui/Rating';
import { reviews, REVIEWS_ARE_PLACEHOLDER } from '@/data/reviews';

/** Compact reviews list for the product page. Placeholder-labelled until real. */
export function ProductReviews({ productName }: { productName: string }) {
  // Prefer reviews tagged to this product, else show a general sample.
  const relevant = reviews.filter((r) => r.productName === productName);
  const list = relevant.length > 0 ? relevant : reviews.slice(0, 2);
  const avg = list.reduce((s, r) => s + r.rating, 0) / list.length;

  return (
    <section aria-label='Customer reviews'>
      <div className='flex flex-wrap items-center justify-between gap-3'>
        <h2 className='font-display text-2xl text-ink'>Customer Reviews</h2>
        <Rating value={avg} count={list.length} />
      </div>
      <span className='gold-rule my-4 block w-12' aria-hidden='true' />

      {REVIEWS_ARE_PLACEHOLDER && (
        <p className='mb-5 rounded-[var(--radius-card)] border border-dashed border-line bg-surface/80 px-4 py-2 text-xs text-muted'>
          Placeholder reviews — to be replaced with verified customer feedback before launch.
        </p>
      )}

      <ul className='flex flex-col gap-5'>
        {list.map((review) => (
          <li
            key={review.id}
            className='rounded-[var(--radius-card)] border border-line bg-surface/80 p-5 shadow-[var(--shadow-card)]'
          >
            <div className='flex items-center justify-between gap-3'>
              <span className='font-medium text-ink'>{review.name}</span>
              <Rating value={review.rating} size={14} />
            </div>
            <p className='mt-2 font-display text-lg text-ink'>“{review.title}”</p>
            <p className='mt-1 text-sm leading-relaxed text-muted'>{review.body}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
