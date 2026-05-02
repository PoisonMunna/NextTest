'use client';

import React, { useState, useEffect } from 'react';

// 1. Types for our floating particles
interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
}

export default function ZenDashboard() {
  // 2. State: One object to control the whole "vibe"
  const [vibe, setVibe] = useState({
    hue: 200,
    blur: 10,
    speed: 5,
    isWarped: false,
    label: 'Calm Ocean'
  });

  const [particles, setParticles] = useState<Particle[]>([]);

  // 3. Effect: Generate particles once on mount
  useEffect(() => {
    const newParticles = Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 200 + 50,
      duration: Math.random() * 10 + 10
    }));
    setParticles(newParticles);
  }, []);

  // 4. Logic: Update vibe based on presets
  const applyPreset = (hue: number, label: string) => {
    setVibe(prev => ({ ...prev, hue, label }));
  };

  return (
    <main 
      className="relative min-h-screen overflow-hidden flex items-center justify-center transition-all duration-1000"
      style={{ 
        backgroundColor: `hsl(${vibe.hue}, 30%, 8%)`,
        perspective: vibe.isWarped ? '500px' : 'none'
      }}
    >
      {/* ANIMATED BACKGROUND LAYER */}
      <div className="absolute inset-0 z-0">
        {particles.map((p) => (
          <div
            key={p.id}
            className="absolute rounded-full opacity-20 transition-all"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              backgroundColor: `hsl(${vibe.hue}, 70%, 50%)`,
              filter: `blur(${vibe.blur * 2}px)`,
              animation: `float ${vibe.speed}s infinite alternate ease-in-out`,
              animationDelay: `${p.id * 0.5}s`
            }}
          />
        ))}
      </div>

      {/* THE CONTROL CONSOLE */}
      <section className="relative z-10 w-full max-w-lg mx-4">
        <div className={`
          p-10 rounded-[40px] border border-white/10 backdrop-blur-2xl bg-white/5 shadow-2xl
          transition-all duration-700
          ${vibe.isWarped ? 'rotate-x-12 scale-90 shadow-indigo-500/20' : 'rotate-0 scale-100'}
        `}>
          
          <header className="mb-10">
            <h1 className="text-white text-3xl font-light tracking-widest uppercase">
              {vibe.label}
            </h1>
            <div className="h-1 w-12 bg-white/20 mt-4 rounded-full overflow-hidden">
              <div 
                className="h-full bg-white transition-all duration-500" 
                style={{ width: `${(vibe.hue / 360) * 100}%` }}
              />
            </div>
          </header>

          <div className="space-y-8">
            {/* HUE SLIDER */}
            <div className="space-y-4">
              <div className="flex justify-between text-xs text-white/40 uppercase tracking-tighter">
                <span>Color Spectrum</span>
                <span>{vibe.hue}°</span>
              </div>
              <input 
                type="range" min="0" max="360" 
                value={vibe.hue}
                onChange={(e) => setVibe({...vibe, hue: parseInt(e.target.value)})}
                className="w-full h-1 bg-white/10 appearance-none rounded-full accent-white cursor-pointer"
              />
            </div>

            {/* BLUR CONTROL */}
            <div className="space-y-4">
              <div className="flex justify-between text-xs text-white/40 uppercase tracking-tighter">
                <span>Aura Intensity</span>
                <span>{vibe.blur}px</span>
              </div>
              <input 
                type="range" min="0" max="50" 
                value={vibe.blur}
                onChange={(e) => setVibe({...vibe, blur: parseInt(e.target.value)})}
                className="w-full h-1 bg-white/10 appearance-none rounded-full accent-white cursor-pointer"
              />
            </div>

            {/* TOGGLE SWITCH */}
            <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5">
              <span className="text-white/80 text-sm font-medium">Dimensional Warp</span>
              <button 
                onClick={() => setVibe({...vibe, isWarped: !vibe.isWarped})}
                className={`
                  w-12 h-6 rounded-full transition-all relative
                  ${vibe.isWarped ? 'bg-white' : 'bg-white/10'}
                `}
              >
                <div className={`
                  absolute top-1 w-4 h-4 rounded-full transition-all
                  ${vibe.isWarped ? 'right-1 bg-indigo-900' : 'left-1 bg-white/40'}
                `} />
              </button>
            </div>

            {/* PRESET BUTTONS */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { h: 280, l: 'Nebula', c: 'bg-purple-500' },
                { h: 160, l: 'Forest', c: 'bg-emerald-500' },
                { h: 20, l: 'Mars', c: 'bg-orange-500' }
              ].map((preset) => (
                <button
                  key={preset.l}
                  onClick={() => applyPreset(preset.h, preset.l)}
                  className="group flex flex-col items-center gap-2 p-3 rounded-2xl hover:bg-white/5 transition-all"
                >
                  <div className={`w-3 h-3 rounded-full ${preset.c} group-hover:scale-150 transition-transform`} />
                  <span className="text-[10px] text-white/40 uppercase tracking-widest">{preset.l}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CSS FOR THE FLOATING ANIMATION */}
      <style jsx>{`
        @keyframes float {
          0% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(20px, -30px) scale(1.1); }
          100% { transform: translate(-20px, 20px) scale(1); }
        }
        .rotate-x-12 {
          transform: rotateX(15deg) rotateY(-5deg);
        }
      `}</style>
    </main>
  );
}
