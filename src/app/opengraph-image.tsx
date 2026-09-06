import { ImageResponse } from 'next/og'

export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'
export const alt = 'Gianni Mendonça Semedo | Full Stack Developer'

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          background: '#0E3AFF',
          color: '#fefffd',
          padding: 80,
          fontSize: 64,
          fontWeight: 700,
          letterSpacing: '-0.02em',
        }}
      >
        <div>Gianni Mendonça Semedo</div>
        <div style={{ fontSize: 32, fontWeight: 400, marginTop: 16 }}>
          Full Stack Developer | Rotterdam, The Netherlands
        </div>
      </div>
    ),
    size
  )
}
