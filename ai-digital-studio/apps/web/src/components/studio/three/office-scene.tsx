'use client'

import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { ContactShadows, OrbitControls } from '@react-three/drei'
import { AGENTS } from '@ai-studio/shared-types'
import { ActivityZones } from './activity-zones'
import { DESK_LAYOUT } from './constants'
import { DeskUnit } from './desk-unit'
import { TaskFlowLine, TaskFlowParticles } from './task-flow'

function SceneContent({
  statuses,
}: {
  statuses: Record<string, string>
}) {
  return (
    <>
      <color attach="background" args={['#eef0f3']} />
      <fog attach="fog" args={['#eef0f3', 18, 35]} />

      <ambientLight intensity={0.65} />
      <directionalLight
        castShadow
        position={[8, 12, 6]}
        intensity={1.1}
        shadow-mapSize={[1024, 1024]}
      />
      <directionalLight position={[-6, 8, -4]} intensity={0.35} />

      {/* 地板 */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[1.2, 0, 0]} receiveShadow>
        <planeGeometry args={[16, 12]} />
        <meshStandardMaterial color="#e8eaed" />
      </mesh>

      <ActivityZones />

      {DESK_LAYOUT.map(({ id, x, z }) => (
        <DeskUnit
          key={id}
          agentId={id}
          position={[x, 0, z]}
          status={statuses[id] ?? 'idle'}
        />
      ))}

      <TaskFlowLine statuses={statuses} />
      <TaskFlowParticles statuses={statuses} />

      <ContactShadows
        position={[1.2, 0.01, 0]}
        opacity={0.35}
        scale={16}
        blur={2.5}
        far={8}
      />

      <OrbitControls
        enablePan={false}
        minPolarAngle={Math.PI / 6}
        maxPolarAngle={Math.PI / 2.2}
        minDistance={8}
        maxDistance={22}
        target={[1.2, 0, 0]}
      />
    </>
  )
}

export function OfficeThreeCanvas({
  statuses,
}: {
  statuses: Record<string, string>
}) {
  return (
    <Canvas
      shadows
      camera={{ position: [10, 10, 10], fov: 45, near: 0.1, far: 100 }}
      gl={{ antialias: true, alpha: true }}
      style={{ width: '100%', height: '100%' }}
    >
      <Suspense fallback={null}>
        <SceneContent statuses={statuses} />
      </Suspense>
    </Canvas>
  )
}
