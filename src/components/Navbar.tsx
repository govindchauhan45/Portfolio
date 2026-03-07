import React from 'react'

export const Navbar: React.FC = () => {
  return (
    <nav className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 w-[min(980px,92%)] px-4 py-2 rounded-xl backdrop-blur-md bg-black/30 border border-primary/10 flex items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-md bg-gradient-to-br from-primary to-cyan-400 shadow-[0_6px_18px_rgba(0,255,65,0.12)] flex items-center justify-center font-mono text-xs font-bold">AI</div>
        <div className="text-sm font-mono text-primary/90">Govind Chauhan</div>
      </div>

      <ul className="flex items-center gap-6 text-sm text-gray-300">
        {['Home','Projects','Skills','Experience','Contact'].map(item => (
          <li key={item} className="px-2 py-1 rounded hover:shadow-[0_0_18px_rgba(0,255,65,0.12)] hover:text-primary transition-colors"> 
            <a href={item === 'Home' ? '#' : `#${item.toLowerCase()}` } className="glitch-underline">{item}</a>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default Navbar
