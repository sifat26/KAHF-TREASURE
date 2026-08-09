import type { Metadata } from 'next';
import { Container } from '@/components/ui/Container';
import { ButtonLink } from '@/components/ui/Button';

export const metadata: Metadata = {
  title: 'পাতাটি খুঁজে পাওয়া যায়নি',
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <Container className="flex min-h-[70vh] flex-col items-center justify-center py-24 text-center">
      <span className="eyebrow mb-4">সুবাসের ভিড়ে পথ হারিয়েছে</span>
      <h1 className="font-display text-7xl text-ink sm:text-8xl">৪০৪</h1>
      <span className="gold-rule my-6 w-16" aria-hidden="true" />
      <p className="mb-8 max-w-md text-muted">
        আপনি যে পাতাটি খুঁজছেন, সেটি আর নেই। চলুন আপনাকে আমাদের কালেকশনে ফিরিয়ে নিয়ে যাই।
      </p>
      <div className="flex flex-wrap justify-center gap-3">
        <ButtonLink href="/" variant="primary">
          হোমে ফিরুন
        </ButtonLink>
        <ButtonLink href="/shop" variant="secondary">
          আতর দেখুন
        </ButtonLink>
      </div>
    </Container>
  );
}
