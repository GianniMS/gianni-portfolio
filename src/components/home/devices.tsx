'use client'

import { Suspense, useLayoutEffect, useMemo, type RefObject } from 'react'
import { Environment, Lightformer, useGLTF, useTexture } from '@react-three/drei'
import { Box3, Group, Mesh, MeshBasicMaterial, SRGBColorSpace, Vector3, type Material, type Object3D } from 'three'
import type { MockupDevice } from '@/types'

type ModelSpec = {
  url: string
  // Material that carries the display; it's swapped for the mockup's own screen
  screenMaterial: string
  fit: { axis: 'x' | 'y'; size: number }
  // Vertical nudge after centring, in the same units as fit
  drop?: number
  // Lid node and the hinge line it turns about (the model's own y and z; the hinge runs along x)
  lid?: { node: string; hinge: [number, number] }
}

// Layout box every device is fitted against; phones stand a bit taller than it
export const DEVICE_HEIGHT = 2.5
export const MAC_WIDTH = 3.56
// The laptop is deep, so turned or tilted it reaches far past its front-on width
const MAC_SCALE = 0.72

export const MODELS = {
  macbook: {
    url: '/models/macbook_pro_14-inch_m5.glb',
    // The model ships with obfuscated names; this is the emissive display
    screenMaterial: 'HlQwFCAPWzetDQy',
    fit: { axis: 'x', size: MAC_WIDTH * MAC_SCALE },
    lid: { node: 'RcexTyyhpuJYATQ_61', hinge: [-10.8, 0.3] },
  },
  iphone: {
    url: '/models/apple_iphone_18_pro_max_black_2026.glb',
    screenMaterial: 'COLOUR_Black_Screen',
    fit: { axis: 'y', size: DEVICE_HEIGHT * 1.12 },
    drop: 0.15,
  },
} satisfies Record<MockupDevice, ModelSpec>

type DeviceProps = {
  model: MockupDevice
  // The colour the screen shows when there's no image (and while one loads)
  screen: string
  // A screenshot for the display, shaped like it (about 3:2 for the laptop, 9:19.5 for the phone)
  image?: string
  // Receives the lid's pivot; turning it about x closes the lid
  hingeRef?: RefObject<Object3D | null>
}

export function DeviceModel({ image, ...props }: DeviceProps) {
  const plain = useMemo(() => new MeshBasicMaterial({ color: props.screen, toneMapped: false }), [props.screen])
  const fallback = <Device material={plain} {...props} />
  // The plain screen holds the place while the screenshot loads
  return image ? (
    <Suspense fallback={fallback}>
      <TexturedDevice image={image} {...props} />
    </Suspense>
  ) : (
    fallback
  )
}

// Both screens are UV mapped with the image's top at v = 0, glTF's own convention, so the texture
// isn't flipped
function TexturedDevice({ image, ...props }: DeviceProps & { image: string }) {
  const texture = useTexture(image)
  const material = useMemo(() => {
    const map = texture.clone()
    map.flipY = false
    map.colorSpace = SRGBColorSpace
    map.anisotropy = 8
    map.needsUpdate = true
    return new MeshBasicMaterial({ map, toneMapped: false })
  }, [texture])
  return <Device material={material} {...props} />
}

function Device({ model, hingeRef, material }: DeviceProps & { material: Material }) {
  const spec: ModelSpec = MODELS[model]
  const { scene } = useGLTF(spec.url)

  const { root, scale, center, pivot } = useMemo(() => {
    const root = scene.clone(true)
    root.traverse((o) => {
      if (o instanceof Mesh && !Array.isArray(o.material) && o.material.name === spec.screenMaterial) {
        o.material = material
      }
    })
    root.updateMatrixWorld(true)
    const box = new Box3().setFromObject(root)
    const size = box.getSize(new Vector3())

    let pivot: Group | null = null
    const lid = spec.lid && root.getObjectByName(spec.lid.node)
    if (spec.lid && lid?.parent) {
      const [y, z] = spec.lid.hinge
      pivot = new Group()
      pivot.position.set(0, y, z)
      lid.parent.add(pivot)
      lid.position.set(0, -y, -z)
      pivot.add(lid)
    }

    return {
      root,
      scale: spec.fit.size / size[spec.fit.axis],
      center: box.getCenter(new Vector3()).negate(),
      pivot,
    }
  }, [scene, spec, material])

  useLayoutEffect(() => {
    if (!hingeRef) return
    hingeRef.current = pivot
    return () => {
      hingeRef.current = null
    }
  }, [hingeRef, pivot])

  return (
    <group position-y={-(spec.drop ?? 0)} scale={scale}>
      <group position={center}>
        <primitive object={root} />
      </group>
    </group>
  )
}

// Studio lighting built from light panels, so no HDR file has to be fetched
export function Studio() {
  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[3, 5, 6]} intensity={1.2} />
      <Environment resolution={256}>
        <Lightformer intensity={2} position={[0, 5, -2]} rotation-x={Math.PI / 2} scale={[12, 6, 1]} />
        <Lightformer intensity={1.5} position={[-6, 1, 1]} rotation-y={Math.PI / 2} scale={[10, 3, 1]} />
        <Lightformer intensity={1.5} position={[6, 1, 1]} rotation-y={-Math.PI / 2} scale={[10, 3, 1]} />
        <Lightformer intensity={1} position={[0, 0, 8]} scale={[8, 4, 1]} />
        <Lightformer intensity={0.6} position={[0, -5, 0]} rotation-x={-Math.PI / 2} scale={[12, 6, 1]} />
      </Environment>
    </>
  )
}

useGLTF.preload(MODELS.macbook.url)
useGLTF.preload(MODELS.iphone.url)
