import { Container } from '@/components/ui/Container';
import { DataIcon } from '@/components/ui/DataIcon';

/**
 * TrustBar — 5-column trust strip immediately below hero matching the reference image.
 */
export function TrustBar() {
  const points = [
    {
      icon: 'droplet',
      title: 'ALCOHOL-FREE',
      sub: '100% Safe & Pure',
    },
    {
      icon: 'sparkles',
      title: 'PREMIUM OILS',
      sub: 'Imported Quality',
    },
    {
      icon: 'clock',
      title: 'LONG LASTING',
      sub: 'Fragrance That Stays',
    },
    {
      icon: 'truck',
      title: 'FAST DELIVERY',
      sub: 'Across Bangladesh',
    },
    {
      icon: 'badge-check',
      title: 'TRUSTED BRAND',
      sub: 'Loved by Thousands',
    },
  ];

  return (
    <div
      style={{
        borderTop: '1px solid var(--color-border)',
        borderBottom: '1px solid var(--color-border)',
        background: 'var(--color-surface)',
      }}
    >
      <Container className='grid grid-cols-2 gap-4 sm:gap-6 py-6 sm:py-8 md:grid-cols-3 lg:grid-cols-5'>
        {points.map((point, index) => (
          <div
            key={point.title}
            className={`flex flex-col items-center gap-1.5 sm:gap-2 text-center ${
              index === 4 ? 'col-span-2 sm:col-span-1' : ''
            }`}
          >
            <span className='flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center text-[var(--color-gold)]'>
              <DataIcon name={point.icon} size={20} />
            </span>
            <div>
              <p className='text-[0.65rem] sm:text-[0.7rem] font-bold uppercase tracking-[0.16em] sm:tracking-[0.18em] text-[var(--color-text-primary)]'>
                {point.title}
              </p>
              <p className='mt-0.5 text-[0.62rem] sm:text-[0.68rem] text-[var(--color-muted)]'>{point.sub}</p>
            </div>
          </div>
        ))}
      </Container>
    </div>
  );
}
