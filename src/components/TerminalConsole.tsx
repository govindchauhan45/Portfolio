import React, { useState, useRef } from 'react'
import { canned } from '../content'

export const TerminalConsole: React.FC = () => {
  const [history, setHistory] = useState<string[]>(['Type "help" for commands.'])
  const [input, setInput] = useState('')
  const ref = useRef<HTMLDivElement | null>(null)

  function push(line: string) {
    setHistory(h => [...h, line])
    setTimeout(() => { if (ref.current) ref.current.scrollTop = ref.current.scrollHeight }, 50)
  }

  function handle(cmd: string) {
    const c = cmd.trim().toLowerCase()
    if (!c) return
    push(`> ${cmd}`)
    if (c === 'help') push('Commands: about, skills, projects, contact, help')
    else if (c === 'about') push('About: ' + 'See the hero section for a summary.')
    else if (c === 'skills') push(canned.skills)
    else if (c === 'projects') push(canned.projects)
    else if (c === 'contact') push('Contact: ' + 'Use the contact form or email: ' + 'govindsingh.dsai@gmail.com')
    else push('Unknown command. Type "help"')
  }

  return (
    <div className="w-full max-w-xl mx-auto mt-8">
      <div className="bg-black/60 border border-primary/10 rounded-md p-4 font-mono text-sm text-primary">
        <div ref={ref} className="h-40 overflow-auto mb-3 space-y-2">
          {history.map((h, i) => (
            <div key={i} className="whitespace-pre-wrap">{h}</div>
          ))}
        </div>
        <div className="flex gap-2">
          <span className="text-primary/80">$</span>
          <input value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>{ if(e.key==='Enter'){ handle(input); setInput('') } }} placeholder="Type a command..." className="flex-1 bg-transparent outline-none" />
          <button onClick={()=>{ handle(input); setInput('') }} className="px-3 py-1 bg-primary/20 border border-primary rounded hover:scale-105 transition">EXEC</button>
        </div>
      </div>
    </div>
  )
}

export default TerminalConsole
