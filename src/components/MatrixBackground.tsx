import { useEffect, useRef } from 'react';

export const MatrixBackground = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let width = canvas.width = window.innerWidth;
        let height = canvas.height = window.innerHeight;

        // fewer columns and larger step to make animation subtle
        const fontSize = 12;
        const columns = Math.floor(width / (fontSize * 2));
        const drops: number[] = new Array(columns).fill(1).map(() => Math.random() * -100);

        const chars = "01ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ";

        const draw = () => {
            // subtle fade trail for light effect
            ctx.fillStyle = 'rgba(0, 0, 0, 0.06)';
            ctx.fillRect(0, 0, width, height);

            ctx.fillStyle = '#00ff41';
            ctx.font = `${fontSize}px monospace`;

            for (let i = 0; i < drops.length; i++) {
                const text = chars[Math.floor(Math.random() * chars.length)];
                const x = i * (fontSize * 2);
                const y = drops[i] * (fontSize * 1.6);

                // draw with very low alpha to keep subtle
                ctx.fillStyle = 'rgba(0,255,65,0.12)';
                ctx.fillText(text, x, y);

                // Reset drop to top less frequently for slow movement
                if (y > height && Math.random() > 0.995) {
                    drops[i] = 0;
                }

                drops[i] += Math.random() * 0.6 + 0.4; // slow, variable speed
            }
        };

        // draw slower to reduce CPU usage and visual intensity
        const interval = setInterval(draw, 70);

        const handleResize = () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        };

        window.addEventListener('resize', handleResize);

        return () => {
            clearInterval(interval);
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 z-0 opacity-10 pointer-events-none"
        />
    );
};
