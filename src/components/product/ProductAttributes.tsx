import type { Product } from '@/data/products';
import { familyLabel, genderLabel } from '@/lib/format';
import { CalendarClock, Droplets, Sun, User, Wind } from 'lucide-react';

/**
 * Fragrance profile — notes pyramid + attribute grid.
 * Only renders fields that exist on the product (graceful degradation until
 * the business supplies the full data set described in PRODUCT_CATALOG.md).
 */
export function ProductAttributes({ product }: { product: Product }) {
  const hasNotes = product.topNotes || product.middleNotes || product.baseNotes;
  const attributes: { icon: React.ReactNode; label: string; value?: string }[] = [
    { icon: <Droplets size={18} />, label: 'স্থায়িত্ব', value: product.longevity },
    { icon: <Wind size={18} />, label: 'ছড়ানোর ক্ষমতা', value: product.projection },
    { icon: <Sun size={18} />, label: 'যে ঋতুতে ভালো', value: product.season?.join(', ') },
    { icon: <CalendarClock size={18} />, label: 'উপলক্ষ', value: product.occasion?.join(', ') },
    {
      icon: <User size={18} />,
      label: 'কাদের জন্য',
      value: product.gender ? genderLabel(product.gender) : undefined,
    },
    {
      icon: <Droplets size={18} />,
      label: 'সুবাসের ধরন',
      value: product.family ? familyLabel(product.family) : undefined,
    },
  ].filter((a) => a.value);

  return (
    <div className='flex flex-col gap-10'>
      {/* Notes */}
      {hasNotes ? (
        <div>
          <h2 className='font-display text-2xl text-ink'>সুবাসের নোট</h2>
          <span className='gold-rule my-4 block w-12' aria-hidden='true' />
          <dl className='grid gap-4 sm:grid-cols-3'>
            <NoteColumn title='উপরের নোট' notes={product.topNotes} />
            <NoteColumn title='মধ্যের নোট' notes={product.middleNotes} />
            <NoteColumn title='শেষের নোট' notes={product.baseNotes} />
          </dl>
        </div>
      ) : (
        <p
          className='border border-dashed border-line bg-surface p-5 text-sm text-muted'
          style={{ borderRadius: 'var(--radius-card)' }}
        >
          এই সুগন্ধির বিস্তারিত নোট আমরা যোগ করছি। পুরো বর্ণনা আর পরামর্শের জন্য WhatsApp-এ মেসেজ করুন।
        </p>
      )}

      {/* Attributes */}
      {attributes.length > 0 && (
        <div>
          <h2 className='font-display text-2xl text-ink'>বিস্তারিত</h2>
          <span className='gold-rule my-4 block w-12' aria-hidden='true' />
          <dl className='grid grid-cols-2 gap-4 sm:grid-cols-3'>
            {attributes.map((attr) => (
              <div
                key={attr.label}
                className='border border-line bg-surface/80 p-4'
                style={{ borderRadius: 'var(--radius-card)', boxShadow: 'var(--shadow-card)' }}
              >
                <dt className='flex items-center gap-2 text-xs tracking-[0.06em] text-muted'>
                  <span style={{ color: 'var(--color-gold-deep)' }}>{attr.icon}</span>
                  {attr.label}
                </dt>
                <dd className='mt-1.5 font-medium text-ink'>{attr.value}</dd>
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
    <div
      className='border border-line bg-surface/80 p-5 text-center'
      style={{ borderRadius: 'var(--radius-card)', boxShadow: 'var(--shadow-card)' }}
    >
      <dt className='text-xs tracking-[0.06em]' style={{ color: 'var(--color-gold-deep)' }}>
        {title}
      </dt>
      <dd className='mt-2 text-sm text-ink-soft'>
        {notes && notes.length > 0 ? notes.join(' · ') : <span className='text-muted'>—</span>}
      </dd>
    </div>
  );
}
