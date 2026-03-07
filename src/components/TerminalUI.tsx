import React from "react";
import { Terminal, Minus, Square, X } from "lucide-react";

interface TerminalUIProps {
  children: React.ReactNode;
  title?: string;
  className?: string;
  showControls?: boolean;
  glow?: boolean;
}

export const TerminalUI: React.FC<TerminalUIProps> = ({
  children,
  title = "root@data-science-portfolio:~",
  className = "",
  showControls = true,
  glow = true
}) => {
  return (
    <div
      className={`border border-primary/40 bg-background/90 backdrop-blur-md 
      rounded-xl overflow-hidden relative
      ${glow ? "shadow-[0_0_20px_rgba(0,255,65,0.25)]" : ""}
      ${className}`}
    >
      
      {/* Terminal Header */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-primary/30 bg-primary/5">
        
        <div className="flex items-center gap-2 text-primary font-mono text-sm">
          <Terminal size={16} />
          <span>{title}</span>
        </div>

        {showControls && (
          <div className="flex items-center gap-2">
            <Minus
              size={14}
              className="text-primary/70 hover:text-primary transition cursor-pointer"
            />
            <Square
              size={12}
              className="text-primary/70 hover:text-primary transition cursor-pointer"
            />
            <X
              size={14}
              className="text-primary/70 hover:text-red-500 transition cursor-pointer"
            />
          </div>
        )}
      </div>

      {/* Terminal Content */}
      <div className="relative p-6 font-mono text-primary min-h-[250px]">
        
        {/* Scanline Effect */}
        <div className="absolute inset-0 pointer-events-none opacity-20 
        bg-[linear-gradient(rgba(0,0,0,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.04),rgba(0,255,0,0.04),rgba(0,0,255,0.04))] 
        bg-[length:100%_2px,3px_100%]" />

        {/* Content */}
        <div className="relative z-10">{children}
          <style>{`.terminal-cursor{display:inline-block;margin-left:6px;animation:blink 1s steps(1) infinite}`}</style>
        </div>
      </div>
    </div>
  );
};