import React from 'react';
import { DrinkVariant } from '../types';

interface AdGeneratorProps {
  variant: DrinkVariant;
}

const AdGenerator: React.FC<AdGeneratorProps> = ({ variant }) => {
  return (
    <div className="bg-black border border-white/5 rounded-[40px] p-8 md:p-16 overflow-hidden relative group shadow-2xl">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        <div>
          <div className="inline-block px-4 py-1 rounded-full bg-white/5 text-[10px] font-bold uppercase tracking-[0.3em] mb-6 text-neutral-400 border border-white/10">
            Get in Touch
          </div>
          <h3 className="text-4xl md:text-5xl font-black uppercase mb-6 tracking-tighter leading-none">
            Contact <br /><span style={{ color: variant.themeColor }}>Me.</span>
          </h3>
          <p className="text-neutral-500 mb-10 max-w-sm text-sm leading-relaxed font-light">
            Have questions about {variant.name} or want to learn more? Reach out and I'll get back to you as soon as possible.
          </p>

          <div className="flex flex-col gap-4">
            <a
              href="mailto:natyyosefadisu@gmail.com"
              className="w-fit px-12 py-5 bg-white text-black font-black uppercase tracking-widest text-[10px] rounded-full transition-all hover:scale-105 inline-block text-center"
            >
              Email Me
            </a>
            <p className="text-[9px] text-neutral-400 tracking-wide font-mono">
              natyyosefadisu@gmail.com
            </p>
          </div>

        </div>

        <div className="aspect-video bg-neutral-900 rounded-[30px] border border-white/5 flex items-center justify-center overflow-hidden relative shadow-inner">
          <div className="text-center p-12">
            <div className="flex flex-col items-center gap-8">
              <div className="w-24 h-24 rounded-full border-2 border-white/20 flex items-center justify-center mb-4" style={{ borderColor: variant.themeColor }}>
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
              </div>
              <div>
                <h4 className="text-2xl font-black uppercase tracking-tight mb-3">Let's Connect</h4>
                <p className="text-neutral-500 text-sm mb-6 max-w-xs">
                  Questions, collaborations, or just want to chat about great products? I'm here.
                </p>
                <div className="flex flex-col gap-3 text-sm">
                  <a
                    href="mailto:natyyosefadisu@gmail.com"
                    className="text-neutral-400 hover:text-white transition-colors font-mono text-xs"
                  >
                    natyyosefadisu@gmail.com
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Decorative Corner Overlays */}
          <div className="absolute top-6 left-6 flex flex-col gap-1">
            <div className="w-4 h-[1px] bg-white/40" />
            <div className="w-[1px] h-4 bg-white/40" />
          </div>
          <div className="absolute bottom-6 right-6 flex flex-col items-end gap-1">
            <div className="w-[1px] h-4 bg-white/40" />
            <div className="w-4 h-[1px] bg-white/40" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdGenerator;
