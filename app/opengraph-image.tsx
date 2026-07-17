import { ImageResponse } from 'next/og'

export const alt = 'InfoTech Placement LLC — Career Consulting & Job Placement'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#09060F',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '80px',
          fontFamily: 'system-ui, sans-serif',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Purple glow backdrop */}
        <div
          style={{
            position: 'absolute',
            top: '-100px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '900px',
            height: '500px',
            background: 'radial-gradient(ellipse, rgba(177,78,255,0.35) 0%, transparent 70%)',
            borderRadius: '50%',
          }}
        />

        {/* Company name badge */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '14px',
            marginBottom: '44px',
          }}
        >
          <div
            style={{
              width: '48px',
              height: '48px',
              background: 'linear-gradient(135deg, #B14EFF, #FF8DEB)',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '26px',
              fontWeight: '700',
              color: 'white',
            }}
          >
            I
          </div>
          <span
            style={{
              color: '#CFC8DD',
              fontSize: '22px',
              fontWeight: '500',
              letterSpacing: '-0.01em',
            }}
          >
            InfoTech Placement LLC
          </span>
        </div>

        {/* Main headline */}
        <div
          style={{
            color: '#F8F7FB',
            fontSize: '60px',
            fontWeight: '700',
            textAlign: 'center',
            maxWidth: '920px',
            lineHeight: '1.05',
            letterSpacing: '-0.035em',
            marginBottom: '28px',
          }}
        >
          From Resume to Offer Letter.
        </div>

        {/* Subtitle */}
        <div
          style={{
            color: '#8C859C',
            fontSize: '24px',
            textAlign: 'center',
            maxWidth: '680px',
            lineHeight: '1.4',
            marginBottom: '52px',
          }}
        >
          Career consulting & job placement across four countries
        </div>

        {/* Countries pill */}
        <div
          style={{
            display: 'flex',
            gap: '0',
            background: 'rgba(177,78,255,0.12)',
            border: '1px solid rgba(177,78,255,0.35)',
            borderRadius: '100px',
            padding: '12px 32px',
            color: '#B14EFF',
            fontSize: '18px',
            fontWeight: '600',
            letterSpacing: '0.06em',
          }}
        >
          US  ·  Canada  ·  UK  ·  New Zealand
        </div>
      </div>
    ),
    { ...size }
  )
}
