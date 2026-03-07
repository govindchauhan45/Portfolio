import React, { Suspense, useEffect, useRef, useState, memo, useMemo } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { OrbitControls } from '@react-three/drei'

// Small helper: Sphere made of points
const SpherePoints = memo(function SpherePoints({ count = 600 }: { count?: number }) {
  const pointsRef = useRef<THREE.Points>(null!)
  const positions = useRef<Float32Array | null>(null)

  if (!positions.current) {
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const u = Math.random()
      const v = Math.random()
      const theta = 2 * Math.PI * u
      const phi = Math.acos(2 * v - 1)
      const r = 1.6 + Math.random() * 0.15
      const x = r * Math.sin(phi) * Math.cos(theta)
      const y = r * Math.sin(phi) * Math.sin(theta)
      const z = r * Math.cos(phi)
      pos[i * 3 + 0] = x
      pos[i * 3 + 1] = y
      pos[i * 3 + 2] = z
    }
    positions.current = pos
  }

  useFrame((_, delta) => {
    if (!pointsRef.current) return
    pointsRef.current.rotation.y += delta * 0.08
    pointsRef.current.rotation.x += delta * 0.02
  })

  return (
    <points ref={pointsRef} frustumCulled={false}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions.current!, 3]} />
      </bufferGeometry>
      <pointsMaterial size={2.2} sizeAttenuation={true} color="#00ff41" transparent opacity={0.9} />
    </points>
  )
})

// Neural network: nodes and lines
const NeuralNetwork = memo(function NeuralNetwork({ nodes = 18 }: { nodes?: number }) {
  const group = useRef<THREE.Group>(null!)
  const positions = useRef<THREE.Vector3[]>([])

  if (!positions.current.length) {
    for (let i = 0; i < nodes; i++) {
      positions.current.push(new THREE.Vector3((Math.random() - 0.5) * 6, (Math.random() - 0.5) * 3, (Math.random() - 0.5) * 3))
    }
  }

  useFrame((state, delta) => {
    if (!group.current) return
    group.current.rotation.y += delta * 0.12
    // pulse nodes
    group.current.children.forEach((c, idx) => {
      const scale = 0.8 + Math.sin(state.clock.elapsedTime * 2 + idx) * 0.12
      c.scale.setScalar(scale)
    })
  })

  // build lines geometry (memoize so it's stable across renders)
  const segments = useMemo(() => {
    const segs: number[] = []
    for (let i = 0; i < positions.current.length; i++) {
      for (let j = i + 1; j < positions.current.length; j++) {
        if (Math.random() < 0.12) {
          segs.push(positions.current[i].x, positions.current[i].y, positions.current[i].z)
          segs.push(positions.current[j].x, positions.current[j].y, positions.current[j].z)
        }
      }
    }
    return segs
  }, [])

  return (
    <group ref={group}>
      {positions.current.map((p, i) => (
        <mesh key={i} position={p}>
          <sphereGeometry args={[0.06, 8, 8]} />
          <meshBasicMaterial color="#00eaff" transparent opacity={0.9} />
        </mesh>
      ))}
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[new Float32Array(segments), 3]} />
        </bufferGeometry>
        <lineBasicMaterial attach="material" color="#00ff41" transparent linewidth={1} opacity={0.14} />
      </lineSegments>
    </group>
  )
})

function CameraMotion() {
  const { camera } = useThree()
  useFrame((_, delta) => {
    camera.position.z -= delta * 0.02 // slow forward
    camera.position.z = Math.max(camera.position.z, 2.6)
    camera.updateProjectionMatrix()
  })
  return null
}

export const Loading3D: React.FC = () => {
  const [visible, setVisible] = useState(true)
  const [fade, setFade] = useState(false)
  const lines = [
    'INITIALIZING DATA PIPELINE...',
    'LOADING MACHINE LEARNING MODELS...',
    'CONNECTING TO DATA SERVERS...',
    'STARTING PORTFOLIO...'
  ]

  // typing state
  const [typed, setTyped] = useState<string[]>(Array(lines.length).fill(''))

  useEffect(() => {
    let mounted = true
    let idx = 0
    const charDelay = 28
    const linePause = 200

    function typeLine(i: number) {
      const line = lines[i]
      let j = 0
      const t = setInterval(() => {
        if (!mounted) { clearInterval(t); return }
        j++
        setTyped(prev => { const c = [...prev]; c[i] = line.slice(0, j); return c })
        if (j >= line.length) {
          clearInterval(t)
          idx++
          if (idx < lines.length) setTimeout(() => typeLine(idx), linePause)
        }
      }, charDelay)
    }
    setTimeout(() => typeLine(0), 300)

    // hide after 4s total
    const hide = setTimeout(() => {
      if (!mounted) return
      setFade(true)
      setTimeout(() => setVisible(false), 700)
    }, 4000)

    return () => { mounted = false; clearTimeout(hide) }
  }, [])

  if (!visible) return null

  return (
    <div className={`loading3d-overlay ${fade ? 'fade-out' : ''}`} style={{position:'fixed',inset:0,zIndex:99999}}>
      <Canvas gl={{ antialias: true }} camera={{ position: [0, 0, 4], fov: 50 }} style={{ width: '100%', height: '100%' }} dpr={[1, 1.5]}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 5, 5]} intensity={0.2} />
        <Suspense fallback={null}>
          <SpherePoints count={420} />
          <NeuralNetwork nodes={18} />
        </Suspense>
        <CameraMotion />
        <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
      </Canvas>

      {/* Center terminal overlay */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div style={{maxWidth:720,width:'90%'}} className="text-center font-mono text-sm text-[#00ff41] bg-black/40 backdrop-blur-sm rounded-md p-6 border border-[#00ff41]/10 pointer-events-auto">
          <div className="mb-4">
            {lines.map((_, i) => (
              <div key={i} style={{minHeight:20,opacity: typed[i] ? 1 : 0.85}}>
                <span className="text-[#00ff41]/80">&gt; </span>
                <span>{typed[i]}</span>
                <span className="ml-2 blinking-cursor">▌</span>
              </div>
            ))}
          </div>

          {/* Progress ring */}
          <div style={{display:'flex',justifyContent:'center',alignItems:'center',gap:12}}>
            <svg width="64" height="64" viewBox="0 0 42 42">
              <circle cx="21" cy="21" r="15.5" stroke="#002" strokeWidth="6" fill="none" />
              <circle cx="21" cy="21" r="15.5" stroke="#00ff41" strokeWidth="6" fill="none" strokeDasharray="97.4" strokeDashoffset={97.4 - (97.4 * Math.min(1, (Date.now()%4000)/4000))} style={{transition:'stroke-dashoffset 0.2s linear'}} />
            </svg>
            <div className="text-[#00ff41] text-xs">Loading...</div>
          </div>
        </div>
      </div>

      <style>{`
        .loading3d-overlay { background: linear-gradient(180deg, #000 0%, #000 60%); }
        .loading3d-overlay .blinking-cursor{display:inline-block;margin-left:8px;animation:blink 1s steps(1) infinite}
        @keyframes blink{50%{opacity:0}}
        .loading3d-overlay.fade-out{opacity:0;transition:opacity .7s ease}
      `}</style>
    </div>
  )
}

export default Loading3D
