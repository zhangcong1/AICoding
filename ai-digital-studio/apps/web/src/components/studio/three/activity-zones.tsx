'use client'

import { useRef } from 'react'
import { Html } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import type { Group, Mesh } from 'three'
import * as THREE from 'three'
import { AgentMesh } from './agent-mesh'

function Steam({ offset }: { offset: number }) {
  const ref = useRef<Mesh>(null)
  useFrame(({ clock }) => {
    if (!ref.current) return
    const t = clock.elapsedTime + offset
    ref.current.position.y = 1.1 + ((t * 0.4) % 1) * 0.5
    const mat = ref.current.material as THREE.MeshStandardMaterial
    mat.opacity = 0.6 - ((t * 0.4) % 1) * 0.6
  })
  return (
    <mesh ref={ref} position={[0, 1.1, 0]}>
      <sphereGeometry args={[0.05, 8, 8]} />
      <meshStandardMaterial color="#d1d5db" transparent opacity={0.4} />
    </mesh>
  )
}

function CoffeeZone({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      <mesh position={[0, 0.5, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.4, 0.06, 0.8]} />
        <meshStandardMaterial color="#fff" />
      </mesh>
      <mesh position={[0, 0.85, -0.1]} castShadow>
        <boxGeometry args={[1.1, 0.3, 0.5]} />
        <meshStandardMaterial color="#f3f4f6" />
      </mesh>
      {[-0.35, -0.1, 0.15, 0.4].map((x, i) => (
        <group key={i} position={[x, 0.95, 0]}>
          <mesh>
            <cylinderGeometry args={[0.08, 0.06, 0.14, 12]} />
            <meshStandardMaterial color="#92400e" />
          </mesh>
          <Steam offset={i * 0.7} />
        </group>
      ))}
    </group>
  )
}

function TreadmillZone({ position }: { position: [number, number, number] }) {
  const belt = useRef<Mesh>(null)
  const runner = useRef<Group>(null)

  useFrame(({ clock }) => {
    const t = clock.elapsedTime
    if (belt.current) {
      belt.current.position.x = ((t * 0.5) % 1) * 0.3 - 0.15
    }
  })

  return (
    <group position={position}>
      <mesh position={[0, 0.25, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.4, 0.06, 0.9]} />
        <meshStandardMaterial color="#fff" />
      </mesh>
      <mesh position={[0, 0.45, 0]}>
        <boxGeometry args={[1.1, 0.06, 0.55]} />
        <meshStandardMaterial color="#e5e7eb" />
      </mesh>
      <mesh ref={belt} position={[0, 0.49, 0]}>
        <boxGeometry args={[0.15, 0.02, 0.4]} />
        <meshStandardMaterial color="#94a3b8" />
      </mesh>
      <group ref={runner}>
        <AgentMesh stripe="#06b6d4" status="working" />
      </group>
      <Html position={[0, 1.2, 0]} center distanceFactor={14}>
        <span className="text-[10px] text-gray-500">App Agent</span>
      </Html>
    </group>
  )
}

function SofaZone({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      <mesh position={[0, 0.25, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.4, 0.06, 0.9]} />
        <meshStandardMaterial color="#fff" />
      </mesh>
      <mesh position={[0, 0.45, -0.05]} castShadow>
        <boxGeometry args={[1.1, 0.25, 0.5]} />
        <meshStandardMaterial color="#fafafa" />
      </mesh>
      <AgentMesh stripe="#3b82f6" status="thinking" />
      <Html position={[0, 1.2, 0]} center distanceFactor={14}>
        <span className="text-[10px] text-gray-500">Computer Agent</span>
      </Html>
    </group>
  )
}

export function ActivityZones() {
  return (
    <>
      <CoffeeZone position={[-4.2, 0, -3]} />
      <TreadmillZone position={[-4.2, 0, 0]} />
      <SofaZone position={[-4.2, 0, 3]} />
    </>
  )
}
