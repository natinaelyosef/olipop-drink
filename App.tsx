
import React, { useState, useEffect } from 'react';
import { DRINK_VARIANTS, NAV_LINKS, BRAND_CONFIG } from './constants';
import LoadingScreen from './components/LoadingScreen';
import Hero from './components/Hero';
import VariantSwitcher from './components/VariantSwitcher';
import AdGenerator from './components/AdGenerator';

const App: React.FC = () => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('product');

  const currentVariant = DRINK_VARIANTS[currentIdx];

  const nextVariant = () => setCurrentIdx((prev) => (prev + 1) % DRINK_VARIANTS.length);
  const prevVariant = () => setCurrentIdx((prev) => (prev - 1 + DRINK_VARIANTS.length) % DRINK_VARIANTS.length);

  // Auto-rotate variants every 15 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIdx((prev) => (prev + 1) % DRINK_VARIANTS.length);
    }, 15000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const observerOptions = { root: null, rootMargin: '-50% 0px', threshold: 0 };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) setActiveSection(entry.target.id);
      });
    }, observerOptions);
    document.querySelectorAll('section').forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  if (isLoading) {
    return <LoadingScreen onComplete={() => setIsLoading(false)} />;
  }

  return (
    <div className="relative min-h-screen bg-[#000000] text-white selection:bg-white selection:text-black">

      {/* Dynamic Ambient Background */}
      <div
        className="fixed inset-0 pointer-events-none opacity-10 blur-[180px] transition-all duration-1000 z-0"
        style={{
          background: `radial-gradient(circle at 70% 30%, ${currentVariant.themeColor}, transparent), 
                       radial-gradient(circle at 30% 70%, ${currentVariant.accentColor}, transparent)`
        }}
      />

      <nav className="fixed top-0 left-0 w-full z-50 px-6 py-8 md:px-12 flex justify-between items-center transition-all duration-500 bg-black/40 backdrop-blur-md border-b border-white/5">
        <a href="#" className="text-2xl font-black uppercase tracking-tighter group flex items-center gap-4">
          <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-xs font-black">C</div>
          <span className="hidden md:block tracking-widest">{BRAND_CONFIG.companyName}</span>
        </a>
        <div className="hidden md:flex gap-14">
          {NAV_LINKS.map(link => (
            <a
              key={link.href}
              href={link.href}
              className={`text-[10px] font-black uppercase tracking-[0.4em] transition-all hover:text-white ${activeSection === link.href.slice(1) ? 'text-white border-b-2 border-white pb-2' : 'text-neutral-600'}`}
            >
              {link.label}
            </a>
          ))}
        </div>
        <div className="flex items-center gap-10">
          <button className="px-8 py-3 bg-white/5 border border-white/10 rounded-full text-[10px] uppercase tracking-[0.2em] font-black hover:bg-white hover:text-black transition-all">Cart (0)</button>
        </div>
      </nav>

      <section id="product" className="relative z-10">
        <Hero variant={currentVariant} index={currentIdx} />
        <VariantSwitcher
          variants={DRINK_VARIANTS}
          currentIdx={currentIdx}
          onNext={nextVariant}
          onPrev={prevVariant}
        />
      </section>

      <main className="relative z-10 container mx-auto px-6 max-w-7xl py-48 space-y-80">

        <section id="ingredients" className="scroll-mt-32">
          <div className="grid lg:grid-cols-2 gap-40 items-center">
            <div className="relative aspect-[4/5] rounded-[50px] overflow-hidden group shadow-2xl border border-white/5">
              <img
                src="https://images.unsplash.com/photo-1543332164-6e82f355badc?auto=format&fit=crop&q=80&w=800"
                alt="Natural Ingredients"
                className="w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000 scale-105 group-hover:scale-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
            </div>
            <div>
              <h2 className="text-7xl lg:text-8xl font-black uppercase tracking-tighter mb-16 leading-[0.85]">Pure <br /><span className="text-neutral-800 italic">Organic.</span></h2>
              <div className="space-y-16">
                {[
                  { title: 'Zero Sugar', desc: 'Sweetened naturally without the chemical aftertaste. Organic stevia and real fruit extracts.' },
                  { title: 'Gut Friendly', desc: 'Infused with functional botanicals that support healthy digestion and wellness.' },
                  { title: 'Plastic Neutral', desc: 'For every can sold, we remove the equivalent of one plastic bottle from the ocean.' }
                ].map((item, i) => (
                  <div key={i} className="group">
                    <h4 className="text-2xl font-black mb-4 flex items-center gap-6">
                      <span className="text-[12px] text-neutral-700 font-mono tracking-tighter">/ 0{i + 1}</span>
                      {item.title}
                    </h4>
                    <p className="text-neutral-500 text-lg leading-relaxed font-light pl-12 border-l border-white/5 group-hover:border-white transition-colors duration-500">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="creative" className="scroll-mt-32">
          <AdGenerator variant={currentVariant} />
        </section>

        <section id="nutrition" className="scroll-mt-32">
          <div className="text-center mb-32">
            <h2 className="text-8xl md:text-9xl font-black uppercase tracking-tighter mb-6 italic text-neutral-900 leading-none">The Verdict.</h2>
            <p className="text-neutral-600 uppercase tracking-[0.5em] text-xs font-black">Performance Metrics</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            {[
              { label: 'Sugar Content', cove: '0g', soda: '39g' },
              { label: 'Ingredients', cove: 'Organic', soda: 'Synthetic' },
              { label: 'Calories', cove: '0', soda: '140' }
            ].map((stat, i) => (
              <div key={i} className="p-16 rounded-[60px] border border-white/5 bg-neutral-900/10 backdrop-blur-2xl transition-all hover:bg-neutral-900/20">
                <span className="text-xs uppercase tracking-[0.3em] font-black text-neutral-700 mb-16 block">{stat.label}</span>
                <div className="mb-14">
                  <span className="text-7xl font-black block mb-4 transition-colors duration-1000" style={{ color: currentVariant.themeColor }}>{stat.cove}</span>
                  <span className="text-xs uppercase tracking-[0.2em] font-black opacity-40">Cove Soda</span>
                </div>
                <div className="pt-14 border-t border-white/5">
                  <span className="text-3xl font-black text-neutral-800 block mb-2">{stat.soda}</span>
                  <span className="text-[10px] uppercase tracking-[0.2em] text-neutral-900 font-black">Traditional Soda</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="bg-black border-t border-white/5 py-40">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="flex flex-col md:flex-row justify-between items-end gap-20">
            <div>
              <h1 className="text-[18vw] font-black uppercase tracking-tighter leading-none text-neutral-900/50 mb-12 select-none">COVE</h1>
              <div className="flex flex-wrap gap-12 text-[10px] uppercase tracking-[0.4em] text-neutral-700 font-black">
                <span>© 2025 COVE SODA INC.</span>
                <a href="#" className="hover:text-white transition-colors">Environment</a>
                <a href="#" className="hover:text-white transition-colors">Privacy</a>
                <a href="#" className="hover:text-white transition-colors">Press</a>
              </div>
            </div>
            <div className="flex gap-6">
              {['INSTA', 'X', 'TIK'].map(s => (
                <div key={s} className="w-16 h-16 rounded-full border border-white/10 flex items-center justify-center text-[10px] font-black hover:border-white hover:scale-110 cursor-pointer transition-all uppercase tracking-widest">{s}</div>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
