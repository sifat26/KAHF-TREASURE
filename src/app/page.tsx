import { productServices } from '@/services/product.services';
import { categoryServices } from '@/services/category.services';
import { DynamicProductCard } from '@/components/product/DynamicProductCard';
import { Hero } from '@/components/home/Hero';
import { BrandStory } from '@/components/home/BrandStory';
import { ContactCta } from '@/components/home/ContactCta';
import { ReviewsSection } from '@/components/home/ReviewsSection';
import { FaqPreview } from '@/components/home/FaqPreview';
import { WhyChooseUs } from '@/components/home/WhyChooseUs';
import { TrustBar } from '@/components/home/TrustBar';
import { Container } from '@/components/ui/Container';
import { SectionHeader } from '@/components/ui/Section';
import Link from 'next/link';
import type { Metadata } from 'next';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'KAHF Treasure — প্রিমিয়াম আতর ও পারফিউম',
  description: '১০০% অ্যালকোহল-মুক্ত খাঁটি আতর। বিদেশ থেকে আনা পারফিউম অয়েল। সারা দেশে দ্রুত ডেলিভারি।',
};

export default async function HomePage() {
  let featuredProducts: any[] = [];
  let newProducts: any[] = [];
  let categories: any[] = [];

  try {
    const [featuredRes, newRes, catRes] = await Promise.all([
      productServices.getProducts({ isFeatured: true, limit: 8 }),
      productServices.getProducts({ newArrival: true, limit: 4 }),
      categoryServices.getCategories(),
    ]);
    featuredProducts = featuredRes.data || [];
    newProducts = newRes.data || [];
    categories = catRes.data || [];
  } catch (e) {
    console.error('Failed to load home data:', e);
  }

  return (
    <>
      <Hero />
      <TrustBar />

      {/* Featured Products */}
      {featuredProducts.length > 0 && (
        <section className='py-12 lg:py-20'>
          <Container>
            <SectionHeader
              eyebrow='ফিচার্ড পণ্য'
              title='আমাদের সেরা আতর'
              description='সবচেয়ে জনপ্রিয় আতর এক জায়গায় — আপনার পছন্দের সুগন্ধি খুঁজে নিন।'
              align='center'
              className='mb-10'
            />
            <div className='grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4'>
              {featuredProducts.map((product: any) => (
                <DynamicProductCard key={product._id} product={product} />
              ))}
            </div>
            <div className='mt-8 text-center'>
              <Link href='/shop' className='inline-block rounded-full border border-[var(--color-accent)] px-8 py-3 text-sm font-semibold text-[var(--color-accent)] transition hover:bg-[var(--color-accent)] hover:text-[var(--color-on-accent)]'>
                সব পণ্য দেখুন →
              </Link>
            </div>
          </Container>
        </section>
      )}

      {/* New Arrivals */}
      {newProducts.length > 0 && (
        <section className='py-12 lg:py-20 bg-[var(--color-surface)]'>
          <Container>
            <SectionHeader
              eyebrow='নতুন এসেছে'
              title='সর্বশেষ সংযোজন'
              align='center'
              className='mb-10'
            />
            <div className='grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4'>
              {newProducts.map((product: any) => (
                <DynamicProductCard key={product._id} product={product} />
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* Categories */}
      {categories.length > 0 && (
        <section className='py-12 lg:py-20'>
          <Container>
            <SectionHeader eyebrow='কালেকশন' title='ক্যাটাগরি অনুযায়ী দেখুন' align='center' className='mb-10' />
            <div className='flex flex-wrap justify-center gap-4'>
              {categories.map(cat => (
                <Link
                  key={cat._id}
                  href={`/shop?category=${cat._id}`}
                  className='rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)] px-6 py-4 text-center transition hover:border-[var(--color-accent)] hover:shadow-lg'
                >
                  <p className='font-serif text-lg font-bold text-[var(--color-text-primary)]'>{cat.name}</p>
                  {cat.description && <p className='mt-1 text-xs text-[var(--color-text-tertiary)]'>{cat.description}</p>}
                </Link>
              ))}
            </div>
          </Container>
        </section>
      )}

      <BrandStory />
      <WhyChooseUs />
      <ReviewsSection />
      <FaqPreview />
      <ContactCta />
    </>
  );
}
