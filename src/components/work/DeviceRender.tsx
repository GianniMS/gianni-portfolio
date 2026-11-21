'use client'

import { Suspense, useEffect, useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { MathUtils, type Group } from 'three'
import type { MockupDevice } from '@/types'
import { DEVICE_HEIGHT, DeviceModel, MAC_WIDTH, Studio } from '@/components/home/devices'

export type DeviceView = 'front' | 'angle'

// Rotation (x, y, z) per view: the left device turns in towards the middle and the right one mirrors
// it, so the pair faces each other rather than away
const POSES: Record<MockupDevice, Record<DeviceView, [number, number, number]>> = {
  macbook: { front: [0.26, 0.22, -0.03], angle: [0.26, -0.22, 0.03] },
  iphone: { front: [0.08, 0.2, -0.03], angle: [0.08, -0.2, 0.03] },
}

function Device({
  device,
  screen,
  image,
  view,
}: {
  device: MockupDevice
  screen: string
  image?: string
  view: DeviceView
}) {
  const group = useRef<Group>(null)
  // The mouse anywhere on the page, from -1 to 1 across the window, and a damped copy to follow it with
  const mouse = useRef({ x: 0, y: 0 })
  const follow = useRef({ x: 0, y: 0 })

  const calm = useRef(false)

  useEffect(() => {
    calm.current = matchMedia('(prefers-reduced-motion: reduce)').matches
    const onMove = (e: PointerEvent) => {
      mouse.current = { x: (e.clientX / innerWidth) * 2 - 1, y: (e.clientY / innerHeight) * 2 - 1 }
    }
    addEventListener('pointermove', onMove, { passive: true })
    return () => removeEventListener('pointermove', onMove)
  }, [])

  const { viewport } = useThree()
  const fit = Math.min((viewport.width * 0.72) / MAC_WIDTH, (viewport.height * 0.8) / DEVICE_HEIGHT)
  const [rx, ry, rz] = POSES[device][view]

  // A slow float, plus a small turn towards the mouse as on the home carousel; small enough that the
  // screen always keeps facing you
  useFrame(({ clock }, delta) => {
    const g = group.current
    if (!g || calm.current) return
    const t = clock.elapsedTime
    follow.current.x = MathUtils.damp(follow.current.x, mouse.current.x, 2, delta)
    follow.current.y = MathUtils.damp(follow.current.y, mouse.current.y, 2, delta)
    g.position.y = Math.sin(t * 0.6) * 0.04 * fit
    g.rotation.set(
      rx + Math.cos(t * 0.45) * 0.02 + follow.current.y * 0.06,
      ry + Math.sin(t * 0.35) * 0.04 + follow.current.x * 0.12,
      rz,
    )
  })

  return (
    <group ref={group} scale={fit} rotation={[rx, ry, rz]}>
      <DeviceModel model={device} screen={screen} image={image} />
    </group>
  )
}

// One device render for a project page, framed to fill its panel
export default function DeviceRender({
  device,
  screen,
  image,
  view,
}: {
  device: MockupDevice
  screen: string
  image?: string
  view: DeviceView
}) {
  return (
    <Canvas camera={{ position: [0, 0, 14], fov: 30 }} dpr={[1, 2]} className="absolute! inset-0">
      <Studio />
      <Suspense fallback={null}>
        <Device device={device} screen={screen} image={image} view={view} />
      </Suspense>
    </Canvas>
  )
}
