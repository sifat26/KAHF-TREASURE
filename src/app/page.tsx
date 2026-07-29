import { BundleOffers } from '@/components/home/BundleOffers';
import { CollectionsShowcase } from '@/components/home/CollectionsShowcase';
import { ContactCta } from '@/components/home/ContactCta';
import { FaqPreview } from '@/components/home/FaqPreview';
import { Hero } from '@/components/home/Hero';
import { ProductShowcase } from '@/components/home/ProductShowcase';
import { ReviewsSection } from '@/components/home/ReviewsSection';
import { TrustBar } from '@/components/home/TrustBar';
import { WhyChooseUs } from '@/components/home/WhyChooseUs';
import { WebSiteJsonLd } from '@/components/seo/JsonLd';
import { getBestSellers, getNewArrivals } from '@/lib/products';

export default function HomePage() {
  const bestSellers = getBestSellers(8);
  const newArrivals = getNewArrivals(8);

  return (
    <>
      <WebSiteJsonLd />
      {/* 1. Hero Editorial Banner */}
      <Hero />

      {/* 2. Trust Bar */}
      <TrustBar />

      {/* 3. Most Wanted / Best Sellers */}
      <div id='most-wanted'>
        <ProductShowcase
          eyebrow='MOST LOVED'
          title='Best Sellers'
          description='The fragrances our customers reach for again and again.'
          products={bestSellers}
          viewAllHref='/collections/most-wanted'
          desktopCount={8}
          mobileCount={8}
        />
      </div>

      {/* 4. New Arrivals */}
      <div id='new-arrivals'>
        <ProductShowcase
          eyebrow='NEWEST RELEASE'
          title='New Arrivals'
          description='Discover our latest handcrafted attar creations.'
          products={newArrivals}
          viewAllHref='/collections/new-arrivals'
          desktopCount={8}
          mobileCount={8}
        />
      </div>

      {/* 5. Explore Collections */}
      <CollectionsShowcase />

      {/* 6. Bundle Offers */}
      <BundleOffers />

      {/* 7. Why Choose Kahf Treasure */}
      <WhyChooseUs />

      {/* 8. Verified Customer Reviews */}
      <ReviewsSection />

      {/* 9. Frequently Asked Questions */}
      <FaqPreview />

      {/* 10. Personal Consultation & Contact CTA */}
      <div id='contact'>
        <ContactCta />
      </div>
    </>
  );
}
