import React, { useEffect, useState } from 'react'

interface Props { text: string }

export const TypingText: React.FC<Props> = ({ text }) => {
  const [display, setDisplay] = useState('')
  useEffect(() => {
    let i = 0
    let mounted = true
    const speed = 40
    function tick() {
      if (!mounted) return
      if (i <= text.length) {
        setDisplay(text.slice(0, i))
        i++
        setTimeout(tick, speed)
      }
    }
    tick()
    return () => { mounted = false }
  }, [text])

  return (
    <span className="typing-text">{display}<span className="blinking-cursor">▌</span></span>
  )
}

export default TypingText
