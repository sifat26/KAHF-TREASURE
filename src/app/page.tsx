import { Hero } from '@/components/home/Hero';
import { TrustBar } from '@/components/home/TrustBar';
import { ProductShowcase } from '@/components/home/ProductShowcase';
import { BrandStory } from '@/components/home/BrandStory';
import { WhyChooseUs } from '@/components/home/WhyChooseUs';
import { CollectionsShowcase } from '@/components/home/CollectionsShowcase';
import { PackagesTeaser } from '@/components/home/PackagesTeaser';
import { ReviewsSection } from '@/components/home/ReviewsSection';
import { FaqPreview } from '@/components/home/FaqPreview';
import { ContactCta } from '@/components/home/ContactCta';
import { WebSiteJsonLd } from '@/components/seo/JsonLd';
import { getBestSellers, getFeatured, getNewArrivals } from '@/lib/products';

export default function HomePage() {
  const bestSellers = getBestSellers();
  const newArrivals = getNewArrivals();
  const featured = getFeatured();

  return (
    <>
      <WebSiteJsonLd />
      <Hero />
      <TrustBar />

      <ProductShowcase
        eyebrow="Most loved"
        title="Best Sellers"
        description="The fragrances our customers reach for again and again."
        products={bestSellers}
        viewAllHref="/collections/best-sellers"
      />

      <BrandStory />

      <ProductShowcase
        eyebrow="Just in"
        title="New Arrivals"
        description="The latest additions to the KAHF Treasure library."
        products={newArrivals}
        viewAllHref="/collections/new-arrivals"
        surface
      />

      <CollectionsShowcase />

      <WhyChooseUs />

      {featured.length > 0 && (
        <ProductShowcase
          eyebrow="Editor's picks"
          title="Featured Fragrances"
          products={featured}
          viewAllHref="/shop"
          surface
        />
      )}

      <PackagesTeaser />
      <ReviewsSection />
      <FaqPreview />
      <ContactCta />
    </>
  );
}
