import { useEffect } from 'react'

const options = {
  fpsLimit: 30,
  detectRetina: true,
  particles: {
    number: { value: 40, density: { enable: true, area: 800 } },
    color: { value: '#00ff9c' },
    links: {
      enable: true,
      distance: 160,
      color: '#00ff9c',
      opacity: 0.08,
      width: 1
    },
    move: {
      enable: true,
      speed: 0.45, // slow
      direction: 'none',
      outModes: { default: 'out' }
    },
    opacity: { value: 0.9 },
    size: { value: { min: 1, max: 3 }, random: { enable: true, minimumValue: 1 } },
    shape: { type: 'circle' }
  },
  interactivity: {
    detectsOn: 'canvas',
    events: {
      onHover: { enable: true, mode: 'repulse' },
      onClick: { enable: true, mode: 'push' },
      resize: true
    },
    modes: {
      repulse: { distance: 120, speed: 0.6 },
      push: { quantity: 2 }
    }
  }
}

export const ParticleBackground: React.FC = () => {
  useEffect(() => {
    const ts = (window as any).tsParticles
    let container: any = null
    if (ts && ts.load) {
      ts.load('tsparticles', options).then((c: any) => { container = c })
    }

    return () => {
      if (container && container.destroy) container.destroy()
    }
  }, [])

  return (
    <div id="tsparticles" style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }} />
  )
}

export default ParticleBackground
