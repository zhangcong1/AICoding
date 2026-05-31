'use client'

import { useRef } from 'react'
import { Html } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import type { Group, Mesh } from 'three'
import * as THREE from 'three'
import { AGENTS } from '@ai-studio/shared-types'
import { AGENT_STRIPE, monitorColor } from './constants'
import { AgentMesh } from './agent-mesh'

export function DeskUnit({
  agentId,
  position,
  status,
}: {
  agentId: string
  position: [number, number, number]
  status: string
}) {
  const agent = AGENTS.find((a) => a.id === agentId)
  const stripe = AGENT_STRIPE[agentId] ?? '#888'
  const active = status === 'working' || status === 'thinking'
  const monitor = useRef<Mesh>(null)
  const ring = useRef<Mesh>(null)

  useFrame(({ clock }) => {
    const t = clock.elapsedTime
    if (monitor.current) {
      const mat = monitor.current.material as THREE.MeshStandardMaterial
      if (status === 'working') {
        mat.emissiveIntensity = 0.35 + Math.sin(t * 6) * 0.15
      } else if (status === 'thinking') {
        mat.emissiveIntensity = 0.25 + Math.sin(t * 3) * 0.15
      } else if (status === 'idle') {
        mat.emissiveIntensity = 0.05 + Math.sin(t * 1.5) * 0.03
      }
    }
    if (ring.current && active) {
      ring.current.rotation.z = t * 0.8
    }
  })

  if (!agent) return null

  return (
    <group position={position}>
      {/* desk top */}
      <mesh position={[0, 0.42, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.6, 0.08, 0.9]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
      {/* desk legs */}
      {([-0.65, 0.65] as const).map((x) =>
        ([-0.35, 0.35] as const).map((z) => (
          <mesh key={`${x}-${z}`} position={[x, 0.2, z]} castShadow>
            <boxGeometry args={[0.06, 0.4, 0.06]} />
            <meshStandardMaterial color="#f9fafb" />
          </mesh>
        )),
      )}

      {/* monitor */}
      <mesh ref={monitor} position={[0, 0.72, -0.15]} castShadow>
        <boxGeometry args={[0.55, 0.38, 0.04]} />
        <meshStandardMaterial
          color={monitorColor(status)}
          emissive={monitorColor(status)}
          emissiveIntensity={active ? 0.4 : 0.08}
        />
      </mesh>
      <mesh position={[0, 0.5, -0.15]}>
        <boxGeometry args={[0.12, 0.06, 0.04]} />
        <meshStandardMaterial color="#9ca3af" />
      </mesh>

      <AgentMesh stripe={stripe} status={status} />

      {active && (
        <>
          <mesh ref={ring} position={[0, 0.05, 0.35]} rotation={[-Math.PI / 2, 0, 0]}>
            <ringGeometry args={[0.55, 0.65, 32]} />
            <meshBasicMaterial color="#3b82f6" transparent opacity={0.5} />
          </mesh>
          <Html
            position={[0, 1.35, 0]}
            center
            distanceFactor={12}
            style={{ pointerEvents: 'none' }}
          >
            <div className="whitespace-nowrap rounded-full bg-blue-500 px-3 py-1 text-xs font-medium text-white shadow-lg animate-bounce">
              {agent.name}
            </div>
          </Html>
        </>
      )}
    </group>
  )
}
