import type { Metadata, Viewport } from 'next';
import { Playfair_Display, Cormorant_Garamond, Inter, Noto_Serif_Bengali } from 'next/font/google';
import { cn } from '@/lib/utils';
import { site } from '@/data/site';
import { EnquiryBagProvider } from '@/components/bag/EnquiryBagProvider';
import { EnquiryDrawer } from '@/components/bag/EnquiryDrawer';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { WhatsappFAB } from '@/components/ui/WhatsappFAB';
import { OrganizationJsonLd } from '@/components/seo/JsonLd';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-display',
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  variable: '--font-serif',
  weight: ['400', '500', '600'],
  style: ['normal', 'italic'],
  display: 'swap',
});

const notoBengali = Noto_Serif_Bengali({
  subsets: ['bengali'],
  variable: '--font-bengali',
  weight: ['400', '500', '600'],
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.tagline}`,
    template: `%s · ${site.name}`,
  },
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
    type: 'website',
    locale: site.locale,
    url: site.url,
    siteName: site.name,
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
  },
  twitter: {
    card: 'summary_large_image',
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
};

export const viewport: Viewport = {
  themeColor: '#0F0F0D',
  colorScheme: 'dark',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(inter.variable, playfair.variable, cormorant.variable, notoBengali.variable)}
    >
      <body className="min-h-dvh bg-canvas antialiased">
        <OrganizationJsonLd />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-ink focus:px-4 focus:py-2 focus:text-sm focus:text-white"
        >
          Skip to content
        </a>
        <EnquiryBagProvider>
          <Navbar />
          <main id="main" className="pt-[76px]">
            {children}
          </main>
          <Footer />
          <EnquiryDrawer />
          <WhatsappFAB />
        </EnquiryBagProvider>
      </body>
    </html>
  );
}
