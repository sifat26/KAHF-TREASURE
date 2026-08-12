import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const size = { width: 32, height: 32 };
export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          borderRadius: '8px',
          backgroundColor: '#0F0F0D',
          border: '1px solid #D4AF37',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#D4AF37',
          fontWeight: 800,
          fontSize: '20px',
          fontFamily: 'serif',
        }}
      >
        K
      </div>
    ),
    { ...size }
  );
}
