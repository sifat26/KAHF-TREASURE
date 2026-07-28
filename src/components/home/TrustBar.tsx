import { Container } from '@/components/ui/Container';
import { DataIcon } from '@/components/ui/DataIcon';
import { trustPoints } from '@/data/site';

/** Compact trust strip shown directly under the hero. */
export function TrustBar() {
  const points = trustPoints.slice(0, 4);
  return (
    <div className="border-y border-line bg-canvas">
      <Container className="grid grid-cols-2 gap-x-6 gap-y-6 py-8 md:grid-cols-4">
        {points.map((point) => (
          <div key={point.title} className="flex items-center gap-3">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-surface text-[var(--color-gold-deep)]">
              <DataIcon name={point.icon} />
            </span>
            <div className="min-w-0">
              <p className="text-sm font-medium text-ink">{point.title}</p>
              <p className="truncate text-xs text-muted">{point.description}</p>
            </div>
          </div>
        ))}
      </Container>
    </div>
  );
}
