'use client'

import { Suspense, useEffect, useRef, type KeyboardEvent, type PointerEvent } from 'react'
import { Canvas, useFrame, useThree, type ThreeEvent } from '@react-three/fiber'
import { useGLTF, useTexture } from '@react-three/drei'
import { MathUtils, type Group, type Object3D } from 'three'
import type { Mockup, MockupDevice } from '@/types'
import { DEVICE_HEIGHT, DeviceModel, MAC_WIDTH, MODELS, Studio } from '@/components/home/devices'

const SWIPE_PX = 40
const STEP_S = 1.6
// The intro: devices wait off-screen to the right on the slant, then fly in one after another
const INTRO_S = 1.2
const INTRO_STAGGER_S = 0.12
const POINTER_DAMPING = 1.5
const MAX_FRAME_S = 1 / 30
const SLANT = 0.3
// The canvas reaches this many times the section's height (centred on it), so devices on the low
// side of the slant can hang over the next section instead of being cut off at the section's edge
const CANVAS_SCALE = 1.6
const FOV = 2 * MathUtils.radToDeg(Math.atan(Math.tan(MathUtils.degToRad(15)) * CANVAS_SCALE))
// The row recedes to the left: the left one smaller and closer in, the right one larger and pushed past the edge
const SIDE_SCALE: Record<'-1' | '1', number> = { '-1': 0.72, '1': 1.08 }
const SIDE_SPREAD: Record<MockupDevice, Record<'-1' | '1', number>> = {
  macbook: { '-1': 0.92, '1': 1.18 },
  iphone: { '-1': 0.92, '1': 1.02 },
}

type Vec3 = [number, number, number]
// position xyz, rotation xyz, scale, lid closing
type Pose = number[]

const easeInOut = (p: number) => (p < 0.5 ? 4 * p ** 3 : 1 - (-2 * p + 2) ** 3 / 2)
const current = (g: Group, lid: Object3D | null): Pose => [
  ...g.position.toArray(),
  g.rotation.x,
  g.rotation.y,
  g.rotation.z,
  g.scale.x,
  lid?.rotation.x ?? 0,
]

// The middle is turned just enough to feel placed rather than flat, screen still in full view
const CENTER_POSE: Record<MockupDevice, Vec3> = { macbook: [0.24, -0.15, 0.04], iphone: [0.08, -0.12, 0.05] }
const CENTER_LIFT: Record<MockupDevice, number> = { macbook: 0.12, iphone: 0.2 }
const CENTER_SCALE: Record<MockupDevice, number> = { macbook: 1, iphone: 0.9 }
// Devices on the right show their back: a phone turned away, a laptop with its lid towards you and the open side facing right.
// The laptop on the left mirrors that, its open side facing away to the left
const SIDE_POSE: Record<MockupDevice, Record<'-1' | '1', Vec3>> = {
  iphone: { '-1': [0.25, 0.75, 0.42], '1': [-0.15, -2.45, -0.1] },
  macbook: { '-1': [0.45, -2.2, -0.12], '1': [0.5, 2.0, 0.1] },
}
// Radians the lid swings shut from the model's own opening
const LID_CLOSE: Record<'-1' | '0' | '1', number> = { '-1': 0.6, '0': 0, '1': 0.85 }

const mod = (n: number, m: number) => ((n % m) + m) % m

let reducedMotion: boolean | undefined
const calm = () => (reducedMotion ??= matchMedia('(prefers-reduced-motion: reduce)').matches)

function Slot({
  mockup,
  model,
  offset,
  seed,
  onSelect,
  entered,
}: {
  mockup: Mockup
  model: MockupDevice
  offset: number
  seed: number
  onSelect: (step: number) => void
  entered: boolean
}) {
  const ref = useRef<Group>(null)
  const tween = useRef<{ from: Pose; start: number; offset: number; entered: boolean; duration: number } | null>(
    null,
  )
  const hover = useRef({ x: 0, y: 0 })
  const lid = useRef<Object3D | null>(null)
  // Own clock with capped steps: after a hidden tab the frame clock jumps ahead, snapping every motion to its end
  const clock = useRef(0)
  const { viewport: canvasView, pointer } = useThree()
  // Lay out against the section, not the oversized canvas
  const viewport = { width: canvasView.width, height: canvasView.height / CANVAS_SCALE }

  const mobile = viewport.width < viewport.height
  const fit = Math.min(
    (viewport.width * (mobile ? 1.15 : 0.55)) / MAC_WIDTH,
    (viewport.height * (mobile ? 0.72 : 0.78)) / DEVICE_HEIGHT,
  )
  // On a narrow screen only the centre shows: the sides wait fully off-screen and slide in from there
  const gap = viewport.width * (mobile ? 1.2 : 0.47)
  // The row runs on a slant, rising to the right
  const rise = gap * SLANT
  const side = Math.sign(offset)
  const isCenter = offset === 0
  const isSide = Math.abs(offset) === 1

  useFrame((_, delta) => {
    const g = ref.current
    if (!g) return
    delta = Math.min(delta, MAX_FRAME_S)
    const now = (clock.current += delta)
    const t = now + seed * 1.9
    const key = side < 0 ? '-1' : '1'
    const pose = isCenter ? CENTER_POSE[mockup.device] : SIDE_POSE[mockup.device][key]
    // The middle hovers too, just more faintly than the sides
    const sway = calm() ? 0 : isSide ? 1 : isCenter ? 0.6 : 0

    hover.current.x = MathUtils.damp(hover.current.x, pointer.x, POINTER_DAMPING, delta)
    hover.current.y = MathUtils.damp(hover.current.y, pointer.y, POINTER_DAMPING, delta)

    const target: Pose = [
      offset * gap * (isCenter ? 1 : SIDE_SPREAD[mockup.device][key]),
      offset * rise * (isCenter ? 1 : SIDE_SPREAD[mockup.device][key]) +
        ((isCenter ? CENTER_LIFT[mockup.device] : 0) + sway * Math.sin(t * 0.7) * 0.08) * fit,
      isCenter ? 0 : -1.5,
      pose[0] + sway * (Math.cos(t * 0.5) * 0.06 - hover.current.y * 0.08),
      pose[1] + sway * (Math.sin(t * 0.4) * 0.12 + hover.current.x * 0.16),
      pose[2] + sway * Math.sin(t * 0.6) * 0.04,
      fit * (isCenter ? CENTER_SCALE[mockup.device] : isSide ? SIDE_SCALE[key] : 0),
      LID_CLOSE[side < 0 ? '-1' : side > 0 ? '1' : '0'],
    ]
    // Before the intro the row waits past the right edge, further along its own slant. On a phone only
    // the middle device is in view, so only it flies in; the sides already wait off-screen where they
    // belong, and moving them would send one darting across the screen
    if (!entered && (isCenter || !mobile)) {
      const shift = viewport.width * 1.2
      target[0] += shift
      target[1] += shift * SLANT
    }

    // Each step eases from wherever the device is towards its new place, starting and landing softly.
    // A slot entering at ±2 has nowhere to come from, so it starts where it belongs.
    // The intro flight goes left to right along the row, so the devices land one after another.
    const tw = tween.current
    if (!tw) {
      tween.current = { from: target, start: -Infinity, offset, entered, duration: STEP_S }
    } else if (tw.entered !== entered) {
      const order = offset + 1
      tween.current = {
        from: current(g, lid.current),
        start: now + order * INTRO_STAGGER_S,
        offset,
        entered,
        duration: INTRO_S,
      }
    } else if (tw.offset !== offset) {
      tween.current = { from: current(g, lid.current), start: now, offset, entered, duration: STEP_S }
    }
    const { from, start, duration } = tween.current!
    const p = easeInOut(Math.max(0, Math.min(1, (now - start) / duration)))
    const [px, py, pz, rx, ry, rz, sc, close] = target.map((v, i) => MathUtils.lerp(from[i], v, p))
    g.position.set(px, py, pz)
    g.rotation.set(rx, ry, rz)
    g.scale.setScalar(sc)
    lid.current?.rotation.set(close, 0, 0)
  })

  const onClick = (e: ThreeEvent<MouseEvent>) => {
    if (!isSide || e.delta > 6) return
    e.stopPropagation()
    onSelect(side)
  }

  return (
    <group
      ref={ref}
      onClick={onClick}
      onPointerOver={() => isSide && (document.body.style.cursor = 'pointer')}
      onPointerOut={() => (document.body.style.cursor = '')}
    >
      <Suspense fallback={null}>
        <DeviceModel model={model} screen={mockup.screen} image={mockup.image} hingeRef={lid} />
      </Suspense>
    </group>
  )
}

// Suspends until every model is in, then waits two frames so the first render (and its shader
// compiles) has happened before anyone is told the scene is ready
function Loaded({ onLoad, images }: { onLoad: () => void; images: string[] }) {
  useGLTF(Object.values(MODELS).map((m) => m.url))
  // The screenshots too, so no screen shows its placeholder colour once the loader has gone
  useTexture(images)
  useEffect(() => {
    let id = requestAnimationFrame(() => (id = requestAnimationFrame(onLoad)))
    return () => cancelAnimationFrame(id)
  }, [onLoad])
  return null
}

// pos is unbounded and each slot is keyed by its absolute position, so moving one step only
// shifts existing devices; the one wrapping around enters and leaves at ±2, scaled to nothing
export default function MockupCarousel({
  mockups,
  pos,
  onStep: go,
  onLoad,
  entered,
}: {
  mockups: Mockup[]
  pos: number
  onStep: (step: number) => void
  onLoad: () => void
  // False until the intro sends the devices flying in
  entered: boolean
}) {
  const swipeStart = useRef<number | null>(null)
  const section = useRef<HTMLElement>(null)

  if (mockups.length === 0) return null

  const onPointerUp = (e: PointerEvent<HTMLElement>) => {
    if (swipeStart.current === null) return
    const dx = e.clientX - swipeStart.current
    swipeStart.current = null
    if (Math.abs(dx) > SWIPE_PX) go(dx < 0 ? 1 : -1)
  }

  const onKeyDown = (e: KeyboardEvent<HTMLElement>) => {
    if (e.key === 'ArrowRight') go(1)
    if (e.key === 'ArrowLeft') go(-1)
  }

  return (
    <section
      ref={section}
      aria-roledescription="carousel"
      aria-label="Work"
      tabIndex={0}
      onKeyDown={onKeyDown}
      onPointerDown={(e) => (swipeStart.current = e.clientX)}
      onPointerUp={onPointerUp}
      onPointerCancel={() => (swipeStart.current = null)}
      className="relative min-h-0 flex-1 touch-pan-y outline-none select-none"
    >
      {/* Pointer events come from the section, so the overhang doesn't block the page below */}
      <div className="pointer-events-none absolute inset-x-0 -inset-y-[30%] z-10">
        <Canvas camera={{ position: [0, 0, 14], fov: FOV }} dpr={[1, 2]} eventSource={section} eventPrefix="client">
          <Studio />
          <Suspense fallback={null}>
            <Loaded onLoad={onLoad} images={mockups.flatMap((m) => (m.image ? [m.image] : []))} />
          </Suspense>
          {[-2, -1, 0, 1, 2].map((offset) => {
            const key = pos + offset
            const mockup = mockups[mod(key, mockups.length)]
            return <Slot key={key} mockup={mockup} model={mockup.device} offset={offset} seed={key} onSelect={go} entered={entered} />
          })}
        </Canvas>
      </div>
    </section>
  )
}
