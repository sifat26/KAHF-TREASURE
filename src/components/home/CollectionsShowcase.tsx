import { Section, SectionHeader } from '@/components/ui/Section';
import { RevealGroup, RevealItem } from '@/components/ui/Reveal';
import { CollectionCard } from '@/components/collections/CollectionCard';
import { collections, collectionMatcher } from '@/data/collections';
import { products } from '@/data/products';

/** Featured collections grid for the homepage. */
export function CollectionsShowcase() {
  const featured = [...collections].sort((a, b) => a.order - b.order).slice(0, 5);

  return (
    <Section className="bg-canvas">
      <SectionHeader
        eyebrow="Explore"
        title="Fragrance Collections"
        description="Discover scents grouped by character — from fresh daily wear to deep, luxurious oud."
      />
      <RevealGroup className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {featured.map((collection) => {
          const count = products.filter(collectionMatcher(collection)).length;
          return (
            <RevealItem key={collection.slug}>
              <CollectionCard collection={collection} count={count} className="h-full" />
            </RevealItem>
          );
        })}
      </RevealGroup>
    </Section>
  );
}
