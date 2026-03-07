import React, { useEffect, useState } from 'react'

const lines = [
  { cmd: 'whoami', out: 'Govind Chauhan' },
  { cmd: 'role', out: 'Data Scientist | Machine Learning Enthusiast' },
  { cmd: 'skills', out: 'Python | Machine Learning | Data Science | SQL | Statistics' }
]

export const TerminalCommands: React.FC = () => {
  const [outputs, setOutputs] = useState<string[]>([])

  useEffect(() => {
    let mounted = true
    let lineIdx = 0
    const typeLine = (idx: number) => {
      if (!mounted) return
      const cmd = lines[idx].cmd
      let i = 0
      const writer = setInterval(() => {
        i++
        setOutputs(prev => {
          const copy = [...prev]
          copy[idx] = (copy[idx] || '') + cmd[i - 1]
          return copy
        })
        if (i >= cmd.length) {
          clearInterval(writer)
          // after command typed, append output after short delay
          setTimeout(() => {
            setOutputs(prev => { const copy = [...prev]; copy[idx] = copy[idx] + '\n' + lines[idx].out; return copy })
            lineIdx++
            if (lineIdx < lines.length) setTimeout(() => typeLine(lineIdx), 300)
          }, 220)
        }
      }, 35)
    }
    // initialize outputs array
    setOutputs(new Array(lines.length).fill(''))
    setTimeout(() => typeLine(0), 300)
    return () => { mounted = false }
  }, [])

  return (
    <div className="mt-4 font-mono text-primary text-sm space-y-2">
      {lines.map((l, idx) => (
        <div key={l.cmd} className="whitespace-pre-wrap">
          <span className="text-primary/80">&gt; {l.cmd}</span>
          <div className="ml-3 pl-2 border-l border-primary/10 text-primary/90">
            {outputs[idx]}
            {idx === lines.length - 1 && <span className="blinking-cursor">▌</span>}
          </div>
        </div>
      ))}
    </div>
  )
}

export default TerminalCommands
