import { ImageResponse } from 'next/og';
export const runtime = 'edge';
import icon from './icon.png';
// Image metadata
export const alt = 'My Link Zone';
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

// Image generation
export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          height: '100%',
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
          letterSpacing: '-.02em',
          fontWeight: 700,
          background: 'white',
        }}
      >
        <div
          style={{
            left: 42,
            top: 42,
            position: 'absolute',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <img src={icon.src} width='42' height='42' />
          <span
            style={{
              marginLeft: 8,
              fontSize: 20,
            }}
          >
            mylinkz.one
          </span>
        </div>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            padding: '20px 50px',
            margin: '0 42px',
            fontSize: 40,
            width: 'auto',
            maxWidth: 550,
            textAlign: 'center',
            backgroundColor: 'rgb(39, 39, 42)',
            color: '#6366f1',
            lineHeight: 1.4,
            borderRadius: '0.75rem',
          }}
        >
          <div
            style={{
              backgroundImage:
                'linear-gradient(90deg, #10b981, rgb(0, 223, 216))',
              backgroundClip: 'text',
              // @ts-ignore
              '-webkit-background-clip': 'text',
              color: 'transparent',
            }}
          >
            Your ONE link to share with the world
          </div>
        </div>
      </div>
    ),
    // ImageResponse options
    {
      // For convenience, we can re-use the exported opengraph-image
      // size config to also set the ImageResponse's width and height.
      ...size,
    }
  );
}
