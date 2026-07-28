import { Section, SectionHeader } from '@/components/ui/Section';
import { DataIcon } from '@/components/ui/DataIcon';
import { RevealGroup, RevealItem } from '@/components/ui/Reveal';
import { trustPoints } from '@/data/site';

/** Why Choose Us — full trust grid (BUSINESS_REQUIREMENTS » Trust Building). */
export function WhyChooseUs() {
  return (
    <Section className="bg-canvas">
      <SectionHeader
        eyebrow="Why KAHF Treasure"
        title="A promise in every bottle"
        description="Premium fragrance, thoughtfully sourced and honestly priced."
      />
      <RevealGroup className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {trustPoints.map((point) => (
          <RevealItem key={point.title}>
            <div className="h-full rounded-[var(--radius-card)] border border-line bg-canvas p-7 transition-shadow duration-300 hover:shadow-[var(--shadow-card-hover)]">
              <span className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-surface text-[var(--color-gold-deep)]">
                <DataIcon name={point.icon} size={24} />
              </span>
              <h3 className="font-display text-xl text-ink">{point.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{point.description}</p>
            </div>
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  );
}
