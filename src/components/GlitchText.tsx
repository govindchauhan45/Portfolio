import { motion } from 'framer-motion';

interface GlitchTextProps {
    text: string;
    className?: string;
}

export const GlitchText = ({ text, className = '' }: GlitchTextProps) => {
    return (
        <div className={`relative inline-block group ${className}`}>
            <span className="relative z-10">{text}</span>
            <span className="absolute top-0 left-0 -z-10 w-full h-full text-secondary opacity-0 group-hover:opacity-100 group-hover:animate-glitch translate-x-[2px] overflow-hidden clip-path-inset">
                {text}
            </span>
            <span className="absolute top-0 left-0 -z-10 w-full h-full text-accent opacity-0 group-hover:opacity-100 group-hover:animate-glitch animation-delay-75 -translate-x-[2px] overflow-hidden clip-path-inset">
                {text}
            </span>
            <motion.div
                className="absolute -bottom-1 left-0 w-full h-[2px] bg-primary scale-x-0 group-hover:scale-x-100 transition-transform origin-left"
            />
        </div>
    );
};
