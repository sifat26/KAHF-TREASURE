import type { Metadata } from 'next';
import { Container } from '@/components/ui/Container';
import { ButtonLink } from '@/components/ui/Button';

export const metadata: Metadata = {
  title: 'Page Not Found',
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <Container className="flex min-h-[70vh] flex-col items-center justify-center py-24 text-center">
      <span className="eyebrow mb-4">Lost in the scent</span>
      <h1 className="font-display text-7xl text-ink sm:text-8xl">404</h1>
      <span className="gold-rule my-6 w-16" aria-hidden="true" />
      <p className="mb-8 max-w-md text-muted">
        The page you’re looking for has drifted away. Let’s guide you back to our collection.
      </p>
      <div className="flex flex-wrap justify-center gap-3">
        <ButtonLink href="/" variant="primary">
          Return Home
        </ButtonLink>
        <ButtonLink href="/shop" variant="secondary">
          Browse Fragrances
        </ButtonLink>
      </div>
    </Container>
  );
}
