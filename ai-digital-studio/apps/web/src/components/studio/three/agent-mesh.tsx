'use client'

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import type { Group } from 'three'

export function AgentMesh({
  stripe,
  status,
}: {
  stripe: string
  status: string
}) {
  const group = useRef<Group>(null)

  useFrame(({ clock }) => {
    if (!group.current) return
    const t = clock.elapsedTime

    if (status === 'working') {
      group.current.position.y = 0.62 + Math.sin(t * 10) * 0.04
      group.current.rotation.z = Math.sin(t * 12) * 0.08
    } else if (status === 'thinking') {
      group.current.position.y = 0.62 + Math.sin(t * 3) * 0.03
      group.current.rotation.y = Math.sin(t * 2) * 0.1
    } else {
      group.current.position.y = 0.62 + Math.sin(t * 2) * 0.02
      group.current.rotation.z = 0
      group.current.rotation.y = 0
    }
  })

  return (
    <group ref={group} position={[0, 0.62, 0.35]}>
      {/* horn */}
      <mesh position={[0, 0.42, 0]}>
        <coneGeometry args={[0.06, 0.12, 4]} />
        <meshStandardMaterial color="#111" />
      </mesh>
      {/* head */}
      <mesh position={[0, 0.28, 0]}>
        <sphereGeometry args={[0.18, 16, 16]} />
        <meshStandardMaterial color="#111" />
      </mesh>
      {/* body */}
      <mesh position={[0, 0, 0]}>
        <capsuleGeometry args={[0.16, 0.28, 8, 16]} />
        <meshStandardMaterial color="#111" />
      </mesh>
      {/* stripe */}
      <mesh position={[0, 0.05, 0.14]}>
        <boxGeometry args={[0.28, 0.06, 0.04]} />
        <meshStandardMaterial color={stripe} />
      </mesh>
      {/* chair */}
      <mesh position={[0, -0.22, -0.08]}>
        <boxGeometry args={[0.5, 0.08, 0.4]} />
        <meshStandardMaterial color="#f3f4f6" />
      </mesh>
    </group>
  )
}
