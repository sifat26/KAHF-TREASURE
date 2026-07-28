import type { Product } from '@/data/products';
import { Droplets, Wind, Sun, CalendarClock, User } from 'lucide-react';

/**
 * Fragrance profile — notes pyramid + attribute grid.
 * Only renders fields that exist on the product (graceful degradation until
 * the business supplies the full data set described in PRODUCT_CATALOG.md).
 */
export function ProductAttributes({ product }: { product: Product }) {
  const hasNotes = product.topNotes || product.middleNotes || product.baseNotes;
  const attributes: { icon: React.ReactNode; label: string; value?: string }[] = [
    { icon: <Droplets size={18} />, label: 'Longevity', value: product.longevity },
    { icon: <Wind size={18} />, label: 'Projection', value: product.projection },
    { icon: <Sun size={18} />, label: 'Best Season', value: product.season?.join(', ') },
    { icon: <CalendarClock size={18} />, label: 'Occasion', value: product.occasion?.join(', ') },
    {
      icon: <User size={18} />,
      label: 'Gender',
      value: product.gender ? capitalize(product.gender) : undefined,
    },
    {
      icon: <Droplets size={18} />,
      label: 'Fragrance Family',
      value: product.family ? capitalize(product.family) : undefined,
    },
  ].filter((a) => a.value);

  return (
    <div className="flex flex-col gap-10">
      {/* Notes */}
      {hasNotes ? (
        <div>
          <h2 className="font-display text-2xl text-ink">Fragrance Notes</h2>
          <span className="gold-rule my-4 block w-12" aria-hidden="true" />
          <dl className="grid gap-4 sm:grid-cols-3">
            <NoteColumn title="Top" notes={product.topNotes} />
            <NoteColumn title="Heart" notes={product.middleNotes} />
            <NoteColumn title="Base" notes={product.baseNotes} />
          </dl>
        </div>
      ) : (
        <p className="rounded-[var(--radius-card)] border border-dashed border-line bg-surface p-5 text-sm text-muted">
          Detailed fragrance notes for this scent are being added. Message us on WhatsApp for a full
          description and recommendations.
        </p>
      )}

      {/* Attributes */}
      {attributes.length > 0 && (
        <div>
          <h2 className="font-display text-2xl text-ink">Details</h2>
          <span className="gold-rule my-4 block w-12" aria-hidden="true" />
          <dl className="grid grid-cols-2 gap-4 sm:grid-cols-3">
            {attributes.map((attr) => (
              <div
                key={attr.label}
                className="rounded-[var(--radius-card)] border border-line bg-canvas p-4"
              >
                <dt className="flex items-center gap-2 text-xs uppercase tracking-[0.12em] text-muted">
                  <span className="text-[var(--color-gold-deep)]">{attr.icon}</span>
                  {attr.label}
                </dt>
                <dd className="mt-1.5 font-medium text-ink">{attr.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      )}
    </div>
  );
}

function NoteColumn({ title, notes }: { title: string; notes?: string[] }) {
  return (
    <div className="rounded-[var(--radius-card)] border border-line bg-canvas p-5 text-center">
      <dt className="text-xs uppercase tracking-[0.16em] text-[var(--color-gold-deep)]">{title}</dt>
      <dd className="mt-2 text-sm text-ink-soft">
        {notes && notes.length > 0 ? notes.join(' · ') : <span className="text-muted">—</span>}
      </dd>
    </div>
  );
}

function capitalize(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}
