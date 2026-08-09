import { ButtonLink } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { Reveal } from '@/components/ui/Reveal';
import { brandStory } from '@/data/site';

/**
 * BrandStory — split editorial layout.
 * Left: large decorative bottle illustration panel.
 * Right: brand narrative, gold divider, values list.
 */
export function BrandStory() {
  return (
    <section className="bg-[var(--color-background-deep)] text-[var(--color-text-primary)] py-14 sm:py-20 lg:py-28 select-none">
      <Container className="grid items-center gap-10 lg:gap-16 lg:grid-cols-2">
        {/* Left: Illustration panel */}
        <Reveal>
          <div className="relative flex h-[320px] sm:h-[420px] w-full items-center justify-center overflow-hidden rounded-2xl border border-[var(--color-accent)]/20 bg-[var(--color-background)] shadow-2xl p-6">
            {/* Warm inner glow */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_30%,var(--color-accent-tint),transparent_65%)]"
            />
            {/* Decorative Arabic ornament */}
            <div className="relative z-10 flex flex-col items-center gap-4 text-center w-full">
              <div
                aria-hidden="true"
                className="font-serif text-[4rem] sm:text-[6rem] leading-none text-[var(--color-accent)]/20 select-none"
              >
                ﷽
              </div>
              <div>
                <p className="font-serif text-xl sm:text-2xl font-bold tracking-[0.16em] text-[var(--color-accent-strong)]">
                  KAHF
                </p>
                <p className="text-[0.65rem] sm:text-xs uppercase tracking-[0.28em] text-[var(--color-accent)] font-medium">
                  TREASURE
                </p>
              </div>
              <div className="h-px w-16 bg-[var(--color-accent)]/30" />
              <p className="text-[0.62rem] sm:text-[0.68rem] tracking-[0.06em] text-[var(--color-text-secondary)]">
                খাঁটি আতর · অ্যালকোহল-মুক্ত
              </p>
            </div>
          </div>
        </Reveal>

        {/* Right: Text content */}
        <Reveal delay={0.12}>
          <div className="w-full">
            <span className="text-[0.7rem] font-bold tracking-[0.06em] text-[var(--color-accent)] mb-2 block">
              আমাদের গল্প
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl lg:text-5xl font-bold leading-[1.15] text-[var(--color-text-primary)] tracking-tight">
              যাঁরা বুঝেন খাঁটি সুবাসের মূল্য
            </h2>

            <div className="my-5 h-px w-16 bg-[var(--color-accent)]/40" aria-hidden="true" />

            <p className="mb-4 text-sm sm:text-base lg:text-lg leading-relaxed text-[var(--color-text-tertiary)] break-words">
              {brandStory.mission}
            </p>
            <p className="text-xs sm:text-sm lg:text-base leading-relaxed text-[var(--color-text-secondary)] break-words">
              {brandStory.vision}
            </p>

            {/* Values pills */}
            <div className="mt-6 flex flex-wrap gap-2">
              {brandStory.values.slice(0, 5).map((value) => (
                <span
                  key={value}
                  className="rounded-full px-3.5 py-1.5 text-[0.62rem] sm:text-xs font-semibold tracking-[0.06em] bg-[var(--color-background)] border border-[var(--color-accent)]/25 text-[var(--color-accent-strong)] break-words max-w-full"
                >
                  {value}
                </span>
              ))}
            </div>

            <ButtonLink
              href="/about"
              variant="link"
              className="mt-6 text-xs sm:text-sm font-semibold tracking-[0.04em] text-[var(--color-accent)] hover:text-[var(--color-accent-strong)]"
            >
              আমাদের গল্প পড়ুন →
            </ButtonLink>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
