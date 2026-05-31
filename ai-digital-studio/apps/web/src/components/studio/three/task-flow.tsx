'use client'

import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { AGENTS } from '@ai-studio/shared-types'
import { DESK_LAYOUT } from './constants'

function getFlowCurve(statuses: Record<string, string>) {
  const workingId = AGENTS.find((a) => statuses[a.id] === 'working')?.id
  const thinkingId = AGENTS.find((a) => statuses[a.id] === 'thinking')?.id
  if (!workingId || !thinkingId) return null

  const from = DESK_LAYOUT.find((d) => d.id === workingId)
  const to = DESK_LAYOUT.find((d) => d.id === thinkingId)
  if (!from || !to) return null

  return new THREE.CatmullRomCurve3([
    new THREE.Vector3(from.x, 0.85, from.z + 0.35),
    new THREE.Vector3((from.x + to.x) / 2, 1.3, (from.z + to.z) / 2),
    new THREE.Vector3(to.x, 0.85, to.z + 0.35),
  ])
}

export function TaskFlowLine({
  statuses,
}: {
  statuses: Record<string, string>
}) {
  const lineRef = useRef<THREE.Line>(null)
  const lineObj = useMemo(() => {
    const curve = getFlowCurve(statuses)
    if (!curve) return null

    const points = curve.getPoints(40)
    const geometry = new THREE.BufferGeometry().setFromPoints(points)
    const material = new THREE.LineDashedMaterial({
      color: '#94a3b8',
      dashSize: 0.15,
      gapSize: 0.1,
    })
    const line = new THREE.Line(geometry, material)
    line.computeLineDistances()
    return line
  }, [statuses])

  useFrame(({ clock }) => {
    if (!lineRef.current) return
    const mat = lineRef.current.material as THREE.LineDashedMaterial & {
      dashOffset?: number
    }
    mat.dashOffset = -clock.elapsedTime * 0.8
  })

  if (!lineObj) return null

  return <primitive ref={lineRef} object={lineObj} />
}

export function TaskFlowParticles({
  statuses,
}: {
  statuses: Record<string, string>
}) {
  const particles = useRef<(THREE.Mesh | null)[]>([])

  const path = useMemo(() => getFlowCurve(statuses), [statuses])

  useFrame(({ clock }) => {
    if (!path) return
    const t = clock.elapsedTime * 0.35
    particles.current.forEach((mesh, i) => {
      if (!mesh) return
      const u = (t + i * 0.25) % 1
      mesh.position.copy(path.getPoint(u))
    })
  })

  if (!path) return null

  return (
    <>
      {[0, 1, 2, 3].map((i) => (
        <mesh
          key={i}
          ref={(el) => {
            particles.current[i] = el
          }}
        >
          <sphereGeometry args={[0.06, 12, 12]} />
          <meshStandardMaterial
            color="#3b82f6"
            emissive="#3b82f6"
            emissiveIntensity={0.8}
          />
        </mesh>
      ))}
    </>
  )
}
