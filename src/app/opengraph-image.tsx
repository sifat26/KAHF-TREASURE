import { ImageResponse } from 'next/og';
import { site } from '@/data/site';

export const runtime = 'edge';
export const alt = `${site.name} — ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#0F0F0D',
          backgroundImage: 'radial-gradient(circle at center, #231C0E 0%, #0F0F0D 75%)',
          color: '#FBF7EF',
          fontFamily: 'sans-serif',
          padding: '48px',
          boxSizing: 'border-box',
        }}
      >
        {/* Brand Shield Logo Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '20px',
            marginBottom: '20px',
          }}
        >
          <div
            style={{
              width: '72px',
              height: '72px',
              borderRadius: '20px',
              backgroundColor: '#B48C36',
              border: '2px solid #D4AF37',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '44px',
              fontWeight: 900,
              color: '#0F0F0D',
              boxShadow: '0 8px 32px rgba(180, 140, 54, 0.4)',
            }}
          >
            K
          </div>
          <span
            style={{
              fontSize: '56px',
              fontWeight: 800,
              color: '#D4AF37',
              letterSpacing: '2px',
            }}
          >
            {site.name}
          </span>
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: '32px',
            fontWeight: 600,
            color: '#E6D7B8',
            marginBottom: '32px',
            textAlign: 'center',
          }}
        >
          {site.tagline}
        </div>

        {/* Description card */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(25, 23, 19, 0.85)',
            border: '1px solid rgba(212, 175, 55, 0.35)',
            borderRadius: '24px',
            padding: '24px 40px',
            maxWidth: '920px',
            textAlign: 'center',
            boxShadow: '0 16px 48px rgba(0,0,0,0.6)',
          }}
        >
          <span style={{ fontSize: '22px', color: '#D5C5A4', lineHeight: 1.5 }}>
            বিদেশ থেকে আনা খাঁটি পারফিউম অয়েল দিয়ে তৈরি অ্যালকোহল-মুক্ত আতর • দীর্ঘস্থায়ী ঘ্রাণ • সারা দেশে ক্যাশ অন ডেলিভারি
          </span>
        </div>

        {/* Features Row */}
        <div
          style={{
            display: 'flex',
            gap: '20px',
            marginTop: '36px',
          }}
        >
          <div
            style={{
              backgroundColor: 'rgba(212, 175, 55, 0.12)',
              border: '1px solid rgba(212, 175, 55, 0.35)',
              borderRadius: '999px',
              padding: '10px 24px',
              fontSize: '18px',
              fontWeight: 600,
              color: '#D4AF37',
            }}
          >
            ✨ ১০০% খাঁটি ও অ্যালকোহল-মুক্ত
          </div>
          <div
            style={{
              backgroundColor: 'rgba(212, 175, 55, 0.12)',
              border: '1px solid rgba(212, 175, 55, 0.35)',
              borderRadius: '999px',
              padding: '10px 24px',
              fontSize: '18px',
              fontWeight: 600,
              color: '#D4AF37',
            }}
          >
            🌿 কোনো ক্ষতিকারক কেমিক্যাল নেই
          </div>
          <div
            style={{
              backgroundColor: 'rgba(212, 175, 55, 0.12)',
              border: '1px solid rgba(212, 175, 55, 0.35)',
              borderRadius: '999px',
              padding: '10px 24px',
              fontSize: '18px',
              fontWeight: 600,
              color: '#D4AF37',
            }}
          >
            🚚 সারা দেশে দ্রুত ডেলিভারি
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
