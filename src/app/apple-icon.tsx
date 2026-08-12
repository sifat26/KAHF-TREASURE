import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          borderRadius: '36px',
          backgroundColor: '#0F0F0D',
          border: '4px solid #D4AF37',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#D4AF37',
          fontWeight: 900,
          fontSize: '100px',
          fontFamily: 'serif',
        }}
      >
        K
      </div>
    ),
    { ...size }
  );
}
