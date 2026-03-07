import React, { useRef, memo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const BrainParticles = memo(function BrainParticles({ count = 600 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null!)
  const positions = new Float32Array(count * 3)
  for (let i = 0; i < count; i++) {
    const r = 1.8 + Math.random() * 1.6
    const phi = Math.acos(2 * Math.random() - 1)
    const theta = 2 * Math.PI * Math.random()
    positions[i * 3] = r * Math.sin(phi) * Math.cos(theta)
    positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.6
    positions[i * 3 + 2] = r * Math.cos(phi) * 0.8
  }

  useFrame((state, delta) => {
    if (!ref.current) return
    ref.current.rotation.y += delta * 0.02
    ref.current.rotation.x += Math.sin(state.clock.elapsedTime * 0.1) * 0.0005
  })

  return (
    <points ref={ref} frustumCulled={false}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={1.8} sizeAttenuation color="#00ff41" transparent opacity={0.9} />
    </points>
  )
})

const Lines = memo(function Lines({ count = 140 }: { count?: number }) {
  const positions = new Float32Array(count * 6)
  for (let i = 0; i < count; i++) {
    const ax = (Math.random() - 0.5) * 6
    const ay = (Math.random() - 0.5) * 3
    const az = (Math.random() - 0.5) * 3
    const bx = ax + (Math.random() - 0.5) * 0.8
    const by = ay + (Math.random() - 0.5) * 0.8
    const bz = az + (Math.random() - 0.5) * 0.8
    positions[i * 6] = ax
    positions[i * 6 + 1] = ay
    positions[i * 6 + 2] = az
    positions[i * 6 + 3] = bx
    positions[i * 6 + 4] = by
    positions[i * 6 + 5] = bz
  }

  return (
    <lineSegments>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <lineBasicMaterial color="#00eaff" transparent opacity={0.08} />
    </lineSegments>
  )
})

export const BrainBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 -z-10 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 6], fov: 50 }} gl={{ antialias: true }} dpr={[1, 1.5]}>
        <ambientLight intensity={0.5} />
        <BrainParticles count={480} />
        <Lines count={160} />
      </Canvas>
    </div>
  )
}

export default BrainBackground
