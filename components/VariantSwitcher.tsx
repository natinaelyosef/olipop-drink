
import React from 'react';
import { DrinkVariant } from '../types';

interface VariantSwitcherProps {
  variants: DrinkVariant[];
  currentIdx: number;
  onNext: () => void;
  onPrev: () => void;
}

const VariantSwitcher: React.FC<VariantSwitcherProps> = ({ variants, currentIdx, onNext, onPrev }) => {
  const current = variants[currentIdx];

  return (
    <div className="fixed right-6 md:right-12 top-1/2 -translate-y-1/2 z-40 flex flex-col items-center">
      <div className="mb-12 flex flex-col items-center space-y-2">
        <span className="text-xs font-mono text-neutral-500 tracking-tighter">FLAVOR INDEX</span>
        <div className="text-7xl md:text-8xl font-black text-white leading-none tracking-tighter tabular-nums opacity-20">
          {(currentIdx + 1).toString().padStart(2, '0')}
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <button 
          onClick={onPrev}
          className="group flex flex-col items-center text-neutral-500 hover:text-white transition-all"
        >
          <span className="text-[10px] uppercase tracking-widest rotate-90 origin-center mb-6">PREV</span>
          <div className="w-10 h-10 rounded-full border border-neutral-800 flex items-center justify-center group-hover:border-white transition-all">
             <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="rotate-180"><path d="m12 19 7-7-7-7"/><path d="M5 12h14"/></svg>
          </div>
        </button>

        <div className="h-20 w-[1px] bg-neutral-800 my-4" />

        <button 
          onClick={onNext}
          className="group flex flex-col items-center text-neutral-500 hover:text-white transition-all"
        >
          <div className="w-10 h-10 rounded-full border border-neutral-800 flex items-center justify-center group-hover:border-white transition-all">
             <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 19 7-7-7-7"/><path d="M5 12h14"/></svg>
          </div>
          <span className="text-[10px] uppercase tracking-widest rotate-90 origin-center mt-6">NEXT</span>
        </button>
      </div>

      <div className="mt-12 space-y-4">
        {variants.map((v, i) => (
          <div 
            key={v.id}
            className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${i === currentIdx ? 'bg-white scale-150' : 'bg-neutral-800'}`}
          />
        ))}
      </div>
    </div>
  );
};

export default VariantSwitcher;
