import { useEffect, useRef } from 'react'

const CursorGlow: React.FC = () => {
  const el = useRef<HTMLDivElement | null>(null)
  useEffect(() => {
    const node = el.current!
    let timeout: any
    function move(e: MouseEvent) {
      const x = e.clientX
      const y = e.clientY
      node.style.setProperty('--x', x + 'px')
      node.style.setProperty('--y', y + 'px')
      node.style.opacity = '1'
      clearTimeout(timeout)
      timeout = setTimeout(() => { node.style.opacity = '0' }, 700)
    }
    window.addEventListener('mousemove', move)
    return () => { window.removeEventListener('mousemove', move); clearTimeout(timeout) }
  }, [])

  return (
    <div
      ref={el}
      className="pointer-events-none fixed inset-0 z-50 transition-opacity duration-700"
      style={{
        background: 'radial-gradient(600px 600px at var(--x) var(--y), rgba(0,255,65,0.12), rgba(0,255,65,0.06) 10%, transparent 30%)',
        opacity: 0,
        mixBlendMode: 'screen'
      }}
    />
  )
}

export default CursorGlow
