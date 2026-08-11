import type { Metadata, Viewport } from 'next';
import { Amiri, Cinzel, Inter } from 'next/font/google';
import { cn } from '@/lib/utils';
import { site } from '@/data/site';
import { Providers } from '@/providers/Providers';
import { EnquiryBagProvider } from '@/components/bag/EnquiryBagProvider';
import { CartDrawer } from '@/components/cart/CartDrawer';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ThemeProvider, themeInitScript } from '@/components/theme/ThemeProvider';
import { WhatsappFAB } from '@/components/ui/WhatsappFAB';
import { OrganizationJsonLd, WebSiteJsonLd, LocalBusinessJsonLd } from '@/components/seo/JsonLd';
import { GoogleAnalytics } from '@/components/seo/GoogleAnalytics';
import { bengali } from './fonts';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-latin-sans', display: 'swap' });
const cinzel = Cinzel({
  subsets: ['latin'],
  variable: '--font-latin-display',
  weight: ['400', '600', '700', '800', '900'],
  display: 'swap',
});
const amiri = Amiri({
  subsets: ['arabic'],
  weight: ['400', '700'],
  variable: '--font-arabic',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name} — ${site.tagline}`, template: `%s | ${site.name}` },
  description: site.description,
  applicationName: site.name,
  keywords: [
    'attar',
    'alcohol-free attar',
    'premium attar Bangladesh',
    'perfume oil',
    'oud',
    'KAHF Treasure',
    'long lasting fragrance',
    'islamic fragrance',
  ],
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  publisher: site.name,
  alternates: { canonical: '/' },
  openGraph: {
    images: [{ url: site.ogImage, width: 1200, height: 630, alt: site.name + ' — ' + site.tagline }],
    type: 'website',
    locale: site.locale,
    url: site.url,
    siteName: site.name,
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
  },
  twitter: { card: 'summary_large_image', title: `${site.name} — ${site.tagline}`, description: site.description },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: dark)', color: '#0F0F0D' },
    { media: '(prefers-color-scheme: light)', color: '#FBF7EF' },
  ],
};

import { MainContentWrapper } from '@/components/layout/MainContentWrapper';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang='bn'
      suppressHydrationWarning
      className={cn(inter.variable, cinzel.variable, bengali.variable)}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className={cn('min-h-dvh bg-canvas antialiased', inter.variable, cinzel.variable, bengali.variable, amiri.variable)}>
        <OrganizationJsonLd />
        <WebSiteJsonLd />
        <LocalBusinessJsonLd />
        <GoogleAnalytics />
        <a
          href='#main'
          className='sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-[var(--color-accent)] focus:px-4 focus:py-2 focus:text-sm focus:text-[var(--color-on-accent)]'
        >
          মূল কন্টেন্টে যান
        </a>
        <ThemeProvider>
          <Providers>
            <EnquiryBagProvider>
              <Navbar />
              <MainContentWrapper>{children}</MainContentWrapper>
              <Footer />
              <CartDrawer />
              <WhatsappFAB />
            </EnquiryBagProvider>
          </Providers>
        </ThemeProvider>
      </body>
    </html>
  );
}
