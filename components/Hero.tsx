
import React, { useEffect, useRef, useState, useCallback } from 'react';
import { DrinkVariant } from '../types';

interface HeroProps {
  variant: DrinkVariant;
  index: number;
}

const Hero: React.FC<HeroProps> = ({ variant, index }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isChanging, setIsChanging] = useState(false);

  useEffect(() => {
    setIsChanging(true);
    const timer = setTimeout(() => setIsChanging(false), 800);
    return () => clearTimeout(timer);
  }, [variant]);

  const handleScroll = useCallback(() => {
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    const currentScroll = window.scrollY;
    const progress = Math.min(Math.max(currentScroll / (window.innerHeight * 1.5), 0), 1);
    setScrollProgress(progress);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = new Image();
    // Using a placeholder that fits the "Cove" look if needed, but keeping the logic robust
    img.src = variant.heroImage;
    img.onload = () => {
      const render = () => {
        const dpr = window.devicePixelRatio || 1;
        const w = canvas.width = window.innerWidth * dpr;
        const h = canvas.height = window.innerHeight * dpr;
        ctx.clearRect(0, 0, w, h);

        const imgAspect = img.width / img.height;
        const canvasAspect = w / h;
        let drawW, drawH, drawX, drawY;

        if (imgAspect > canvasAspect) {
          drawH = h;
          drawW = h * imgAspect;
          drawX = (w - drawW) / 2;
          drawY = 0;
        } else {
          drawW = w;
          drawH = w / imgAspect;
          drawX = 0;
          drawY = (h - drawH) / 2;
        }

        // Kinetic Transformations: Simulate the "Floating" and "Dynamic Splash"
        const scale = 0.8 + scrollProgress * 0.4;
        const rotation = (scrollProgress * 25 - 10) * (Math.PI / 180);
        const yOffset = -scrollProgress * 200;
        const floatY = Math.sin(Date.now() / 1500) * 20;

        ctx.save();
        ctx.translate(w / 2, h / 2 + floatY);
        ctx.scale(scale, scale);
        ctx.rotate(rotation);
        ctx.translate(-w / 2, -h / 2);

        // Render shadowing for depth
        ctx.shadowBlur = 80;
        ctx.shadowColor = 'rgba(0,0,0,0.8)';

        // Draw main product
        ctx.drawImage(img, drawX, drawY + yOffset, drawW, drawH);

        // Add a "Liquid Distortion" effect overlay as scroll happens
        if (scrollProgress > 0.2) {
          ctx.globalAlpha = (scrollProgress - 0.2) * 0.5;
          ctx.filter = 'blur(10px) brightness(1.5)';
          ctx.drawImage(img, drawX, drawY + yOffset - 20, drawW, drawH);
          ctx.filter = 'none';
          ctx.globalAlpha = 1.0;
        }

        ctx.restore();

        // High-end Studio Lighting
        const vignette = ctx.createRadialGradient(w / 2, h / 2, 0, w / 2, h / 2, Math.max(w, h) / 1.1);
        vignette.addColorStop(0, 'rgba(0,0,0,0)');
        vignette.addColorStop(0.7, 'rgba(0,0,0,0.4)');
        vignette.addColorStop(1, 'rgba(0,0,0,1)');
        ctx.fillStyle = vignette;
        ctx.fillRect(0, 0, w, h);

        const bottomGlow = ctx.createLinearGradient(0, h * 0.6, 0, h);
        bottomGlow.addColorStop(0, 'rgba(0,0,0,0)');
        bottomGlow.addColorStop(1, 'rgba(0,0,0,1)');
        ctx.fillStyle = bottomGlow;
        ctx.fillRect(0, h * 0.6, w, h);
      };

      const animate = () => {
        render();
        requestAnimationFrame(animate);
      };
      animate();
    };
  }, [variant, scrollProgress]);

  return (
    <div className="relative h-[150vh] w-full">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <canvas
          ref={canvasRef}
          className={`w-full h-full object-cover transition-opacity duration-1000 ${isChanging ? 'opacity-0' : 'opacity-100'}`}
          style={{ pointerEvents: 'none' }}
        />

        <div className="absolute inset-0 z-10 flex flex-col justify-center px-6 md:px-24">
          <div className={`transition-all duration-1000 delay-200 transform ${isChanging ? 'opacity-0 translate-y-20' : 'opacity-100 translate-y-0'}`}>
            <h2
              className="text-xs tracking-[0.8em] uppercase font-black mb-6 opacity-40"
              style={{ color: variant.accentColor }}
            >
              {variant.subtitle}
            </h2>
            <h1 className="text-[14vw] md:text-[12vw] font-[900] leading-[0.75] uppercase tracking-tighter mb-10 drop-shadow-[0_20px_50px_rgba(0,0,0,1)]">
              {variant.name.split(' ').map((word, i) => (
                <span key={i} className="block">{word}</span>
              ))}
            </h1>

            <div className="flex items-center gap-10 mb-16">
              <div className="h-[1px] w-20 bg-white/10" />
              <p className="max-w-md text-sm md:text-lg text-neutral-500 leading-relaxed font-light tracking-wide">
                {variant.description}
              </p>
            </div>

            <div className="flex flex-wrap gap-8">
              <a
                href="#creative"
                className="group relative px-12 py-6 bg-white text-black font-black uppercase tracking-[0.2em] text-[10px] rounded-full overflow-hidden transition-all hover:scale-105 active:scale-95 inline-block text-center"
              >
                <span className="relative z-10">Purchase Now</span>
                <div
                  className="absolute inset-0 translate-y-full group-hover:translate-y-0 transition-transform duration-500"
                  style={{ backgroundColor: variant.themeColor }}
                />
              </a>
              <a
                href="#ingredients"
                className="px-12 py-6 border border-white/10 text-white font-bold uppercase tracking-[0.2em] text-[10px] rounded-full hover:bg-white/5 transition-all inline-block text-center"
              >
                The Ingredients
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
