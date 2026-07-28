import { Section } from '@/components/ui/Section';
import { ButtonLink } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Reveal } from '@/components/ui/Reveal';
import { whatsappUrl } from '@/lib/whatsapp';
import { WhatsAppIcon } from '@/components/icons/SocialIcons';

/**
 * Premium Packages.
 *
 * PRODUCT_CATALOG.md lists "Premium Packages — currently under expansion" with
 * no package data yet. Rather than invent bundles/pricing, this presents an
 * elegant teaser and routes interested customers to WhatsApp for curated sets.
 * When packages are added to the catalogue, replace this with a package grid.
 */
export function PackagesTeaser() {
  return (
    <Section className="bg-canvas">
      <Reveal>
        <div className="relative overflow-hidden rounded-[var(--radius-card)] border border-line bg-ink px-6 py-14 text-center text-white sm:px-12 lg:py-20">
          <div className="pointer-events-none absolute inset-0 opacity-30 [background:radial-gradient(120%_80%_at_50%_0%,rgba(200,169,106,0.35),transparent_60%)]" />
          <div className="relative mx-auto max-w-xl">
            <Badge variant="gold" className="mb-5">
              Coming Soon
            </Badge>
            <h2 className="font-display text-3xl leading-tight sm:text-4xl">
              Premium Gift Packages
            </h2>
            <p className="mx-auto mt-4 max-w-md text-white/70">
              Curated fragrance sets, beautifully presented — perfect for gifting. Our premium
              packages are expanding. Message us for a personally curated selection.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <ButtonLink href={whatsappUrl('Hello KAHF Treasure! I’d like to know about your premium gift packages.')} external variant="gold" size="lg">
                <WhatsAppIcon size={18} /> Enquire on WhatsApp
              </ButtonLink>
              <ButtonLink
                href="/shop"
                variant="outline"
                size="lg"
                className="border-white/30 text-white hover:border-white hover:text-white"
              >
                Browse Fragrances
              </ButtonLink>
            </div>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
