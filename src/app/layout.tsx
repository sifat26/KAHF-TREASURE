import type { Metadata } from 'next';
import { Cormorant_Garamond, Noto_Serif_Bengali, Outfit, Plus_Jakarta_Sans } from 'next/font/google';
import { cn } from '@/lib/utils';
import './globals.css';

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  weight: ['300', '400', '500', '600', '700', '800'],
});

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  variable: '--font-display',
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
});

const notoSerifBengali = Noto_Serif_Bengali({
  subsets: ['bengali'],
  variable: '--font-bengali',
  weight: ['400', '500', '600', '700'],
});

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-accent',
  weight: ['300', '400', '500', '600', '700'],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://kahf-treasure.vercel.app'),
  title: 'KAHF TREASURE — প্রিমিয়াম আতর ও ইসলামী পণ্যের সংগ্রহ | বাংলাদেশ',
  description:
    'KAHF Treasure — বাংলাদেশের সেরা প্রিমিয়াম আতর, মধু, ইসলামী বই ও পণ্যের অনলাইন শপ। সঠিক গুণমান, সঠিক মূল্য। ৫০+ সুগন্ধি, রয়্যাল প্যাকেজ, দ্রুত ডেলিভারি।',
  applicationName: 'KAHF Treasure',
  authors: [{ name: 'KAHF Treasure', url: 'https://kahf-treasure.vercel.app' }],
  generator: 'Next.js',
  keywords: [
    'আতর', 'attar', 'premium attar', 'bangladesh attar', 'perfume oil', 'KAHF Treasure',
    'islamic products', 'সুগন্ধি', 'প্রিমিয়াম সুগন্ধি', 'মধু', 'ইসলামী বই', 'halal perfume',
    'fragrance', 'oud', 'musk', 'royal package', 'bangladesh online shop'
  ],
  creator: 'KAHF Treasure',
  publisher: 'KAHF Treasure',
  formatDetection: {
    email: false,
    address: false,
    telephone: true,
  },
  openGraph: {
    type: 'website',
    locale: 'bn_BD',
    url: 'https://kahf-treasure.vercel.app',
    siteName: 'KAHF Treasure',
    title: 'KAHF TREASURE — প্রিমিয়াম আতর ও ইসলামী পণ্যের সংগ্রহ',
    description: 'বাংলাদেশের সেরা প্রিমিয়াম আতর, মধু, ইসলামী বই ও পণ্যের অনলাইন শপ। সঠিক গুণমান, সঠিক মূল্য।',
    images: [
      {
        url: 'https://i.ibb.co/svsK5LKw/Kahf-logo.jpg',
        width: 1200,
        height: 630,
        alt: 'KAHF Treasure — Premium Attar & Islamic Products',
        type: 'image/jpeg',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'KAHF TREASURE — প্রিমিয়াম আতর ও ইসলামী পণ্যের সংগ্রহ',
    description: 'বাংলাদেশের সেরা প্রিমিয়াম আতর, মধু, ইসলামী বই ও পণ্যের অনলাইন শপ। সঠিক গুণমান, সঠিক মূল্য।',
    images: ['https://i.ibb.co/svsK5LKw/Kahf-logo.jpg'],
    creator: '@KahfTreasure',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: 'https://i.ibb.co/svsK5LKw/Kahf-logo.jpg',
    apple: [
      { url: 'https://i.ibb.co/svsK5LKw/Kahf-logo.jpg', sizes: '180x180', type: 'image/jpeg' },
    ],
  },
  other: {
    'theme-color': '#050505',
    'msapplication-TileColor': '#D4AF37',
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'black-translucent',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="bn"
      suppressHydrationWarning
      className={cn(
        'font-bengali',
        plusJakarta.variable,
        cormorant.variable,
        notoSerifBengali.variable,
        outfit.variable
      )}
    >
      <body className="antialiased leading-relaxed overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
