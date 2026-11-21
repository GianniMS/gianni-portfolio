import { ImageResponse } from 'next/og'

export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'
export const alt = 'Gianni Mendonça Semedo | Full Stack Developer in Rotterdam'

// The share image in the site's own look: the favicon's black, the off-white text, GMS up top
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          backgroundColor: '#000000',
          color: '#fffefc',
          padding: 80,
        }}
      >
        <div style={{ fontSize: 40, letterSpacing: '-0.08em', fontFamily: 'serif' }}>GMS</div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontSize: 68, fontWeight: 700, letterSpacing: '-0.02em' }}>Gianni Mendonça Semedo</div>
          <div style={{ fontSize: 30, marginTop: 18, opacity: 0.7 }}>
            Development · Design · Research · Strategy · Marketing
          </div>
          <div style={{ fontSize: 24, marginTop: 10, opacity: 0.5 }}>Rotterdam, The Netherlands</div>
        </div>
      </div>
    ),
    size,
  )
}
