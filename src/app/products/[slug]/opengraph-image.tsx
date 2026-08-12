import { ImageResponse } from 'next/og';
import { productServices } from '@/services/product.services';
import { site } from '@/data/site';

export const runtime = 'edge';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  let title = 'প্রিমিয়াম আতর';
  let price = 0;
  let description = `${site.name} থেকে ১০০% অ্যালকোহল-মুক্ত প্রিমিয়াম আতর।`;
  let image = `${site.url}/images/hero-banner.png`;

  try {
    const res = await productServices.getProduct(slug);
    if (res.success && res.data) {
      const p = res.data;
      title = p.title;
      price = p.variants?.[0]?.priceOverride ?? p.basePrice;
      if (p.description) {
        description = p.description.length > 110 ? p.description.slice(0, 107) + '...' : p.description;
      }
      if (p.images?.[0]) {
        const firstImg = p.images[0];
        image = firstImg.startsWith('http')
          ? firstImg
          : `${site.url}${firstImg.startsWith('/') ? '' : '/'}${firstImg}`;
      }
    }
  } catch {
    // Fallback defaults
  }

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: '#0F0F0D',
          backgroundImage: 'radial-gradient(circle at left center, #251E10 0%, #0F0F0D 70%)',
          color: '#FBF7EF',
          fontFamily: 'sans-serif',
          padding: '48px',
          boxSizing: 'border-box',
        }}
      >
        {/* Left Side Info */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            maxWidth: '650px',
          }}
        >
          {/* Brand Badge */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              marginBottom: '20px',
            }}
          >
            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '10px',
                backgroundColor: '#B48C36',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '22px',
                fontWeight: 900,
                color: '#0F0F0D',
              }}
            >
              K
            </div>
            <span
              style={{
                fontSize: '24px',
                fontWeight: 800,
                color: '#D4AF37',
                letterSpacing: '1px',
              }}
            >
              {site.name}
            </span>
          </div>

          {/* Product Title */}
          <h1
            style={{
              fontSize: '46px',
              fontWeight: 800,
              color: '#FFFFFF',
              lineHeight: 1.2,
              marginBottom: '16px',
              margin: 0,
            }}
          >
            {title}
          </h1>

          {/* Price Tag */}
          {price > 0 && (
            <div
              style={{
                display: 'flex',
                alignItems: 'baseline',
                gap: '8px',
                marginBottom: '20px',
              }}
            >
              <span
                style={{
                  fontSize: '38px',
                  fontWeight: 900,
                  color: '#D4AF37',
                }}
              >
                ৳{price}
              </span>
              <span style={{ fontSize: '18px', color: '#A09070' }}>BDT</span>
            </div>
          )}

          {/* Description */}
          <p
            style={{
              fontSize: '20px',
              color: '#C8B896',
              lineHeight: 1.5,
              marginBottom: '28px',
            }}
          >
            {description}
          </p>

          {/* Badges */}
          <div
            style={{
              display: 'flex',
              gap: '14px',
            }}
          >
            <div
              style={{
                backgroundColor: 'rgba(212, 175, 55, 0.15)',
                border: '1px solid rgba(212, 175, 55, 0.4)',
                borderRadius: '999px',
                padding: '8px 18px',
                fontSize: '15px',
                fontWeight: 600,
                color: '#D4AF37',
              }}
            >
              ✨ ১০০% অ্যালকোহল-মুক্ত
            </div>
            <div
              style={{
                backgroundColor: 'rgba(212, 175, 55, 0.15)',
                border: '1px solid rgba(212, 175, 55, 0.4)',
                borderRadius: '999px',
                padding: '8px 18px',
                fontSize: '15px',
                fontWeight: 600,
                color: '#D4AF37',
              }}
            >
              🚚 ক্যাশ অন ডেলিভারি
            </div>
          </div>
        </div>

        {/* Right Side Image / Bottle Card */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '380px',
            height: '380px',
            borderRadius: '32px',
            backgroundColor: 'rgba(30, 26, 20, 0.9)',
            border: '2px solid rgba(212, 175, 55, 0.4)',
            boxShadow: '0 24px 64px rgba(0,0,0,0.8)',
            overflow: 'hidden',
            padding: '24px',
          }}
        >
          <img
            src={image}
            alt={title}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              borderRadius: '20px',
            }}
          />
        </div>
      </div>
    ),
    { ...size }
  );
}
