
import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white text-black selection:bg-black selection:text-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 glass-morphism border-b border-zinc-100">
        <div className="max-w-7xl mx-auto px-10 h-24 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-3xl font-black tracking-tighter uppercase">Prompt Zero</span>
          </div>
          <div className="hidden md:flex items-center gap-12 text-[10px] font-black uppercase tracking-widest text-zinc-500">
            <a href="#problem" className="hover:text-black transition-all">Erasure</a>
            <a href="#how-it-works" className="hover:text-black transition-all">Intelligence</a>
            <a href="#benefits" className="hover:text-black transition-all">Strategic</a>
            <Link to="/auth" className="px-8 py-3.5 bg-black text-white rounded-full font-black hover:bg-zinc-800 transition-all shadow-2xl shadow-zinc-300">
              Access Terminal
            </Link>
          </div>
        </div>
      </nav>

      {/* Section 1: Hero Section */}
      <section className="pt-56 pb-32 px-10">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-block px-5 py-2 border border-zinc-200 text-zinc-500 rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-10">
            Autonomous Brand Monitoring
          </div>
          <h1 className="text-6xl md:text-9xl font-black leading-[0.9] mb-12 max-w-5xl mx-auto tracking-tighter uppercase">
            THE NEW <span className="text-zinc-300">INVISIBLE</span> MARKET.
          </h1>
          <p className="text-xl text-zinc-500 max-w-2xl mx-auto mb-16 leading-relaxed font-medium">
            AI is the new search engine. If LLMs aren't recommending your brand, your enterprise is silent. Track, analyze, and dominate the AI visibility landscape.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link to="/auth" className="w-full sm:w-auto px-14 py-6 bg-black text-white rounded-2xl font-black text-xl hover:scale-105 transition-all shadow-3xl shadow-zinc-400">
              Secure Visibility
            </Link>
            <a href="#problem" className="w-full sm:w-auto px-14 py-6 bg-white text-black border-2 border-zinc-900 rounded-2xl font-black text-xl hover:bg-zinc-50 transition-all">
              The Insight
            </a>
          </div>
          <div className="mt-32 relative grayscale">
             <div className="absolute -inset-10 bg-zinc-100 rounded-[5rem] blur-3xl opacity-20"></div>
             <img 
               src="https://picsum.photos/1400/800?grayscale" 
               alt="Dashboard Terminal" 
               className="rounded-[3rem] shadow-3xl border border-zinc-200 relative z-10 mx-auto max-w-6xl grayscale hover:grayscale-0 transition-all duration-1000"
             />
          </div>
        </div>
      </section>

      {/* Section 2: Problem Explanation */}
      <section id="problem" className="py-40 bg-black text-white px-10">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-32 items-center">
          <div>
            <span className="text-zinc-600 text-[10px] font-black uppercase tracking-[0.3em] mb-4 block">The Context</span>
            <h2 className="text-5xl md:text-7xl font-black mb-10 leading-[0.9] tracking-tighter uppercase">
              Bypassing <br/><span className="text-zinc-500 underline decoration-zinc-700 decoration-8 underline-offset-8">Discovery.</span>
            </h2>
            <div className="space-y-8">
              <p className="text-lg text-zinc-400 leading-relaxed font-medium">
                The traditional search journey is collapsing. Users don't browse results; they accept LLM suggestions. If your brand is filtered out by the model, your top-of-funnel is effectively dead.
              </p>
              <div className="bg-zinc-900 p-10 rounded-[3rem] border border-zinc-800">
                <p className="text-[10px] font-black text-zinc-600 uppercase tracking-widest mb-6">Interaction Audit</p>
                <div className="space-y-6">
                   <div className="flex items-start gap-4">
                      <div className="w-8 h-8 rounded-lg bg-zinc-800 shrink-0"></div>
                      <div className="italic text-zinc-200 text-lg">"Gemini, which cloud provider offers the best edge security for fintech?"</div>
                   </div>
                   <div className="pt-6 border-t border-zinc-800 flex items-start gap-4 text-white">
                      <div className="w-8 h-8 rounded-lg bg-white shrink-0 flex items-center justify-center text-black font-black text-xs">AI</div>
                      <div className="text-lg">
                        "Salesforce and AWS are leading in..." 
                        <span className="block mt-2 text-rose-500 font-bold uppercase text-xs tracking-widest">Brand Not Mentioned.</span>
                      </div>
                   </div>
                </div>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-[4/5] bg-zinc-800 rounded-[4rem] p-16 flex flex-col justify-end border border-zinc-700">
              <h3 className="text-8xl font-black mb-4 tracking-tighter text-white">92%</h3>
              <p className="text-zinc-400 text-xl font-medium leading-tight">of B2B decision makers now trust AI summaries over manually verified lists.</p>
              <div className="mt-12 pt-8 border-t border-zinc-700">
                <p className="text-zinc-500 font-black uppercase tracking-widest text-xs">Silence is systemic failure.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: How It Works */}
      <section id="how-it-works" className="py-40 px-10 bg-white">
        <div className="max-w-7xl mx-auto text-center mb-24">
           <span className="text-zinc-300 text-[10px] font-black uppercase tracking-[0.4em] mb-4 block">The Process</span>
           <h2 className="text-5xl font-black text-black tracking-tighter uppercase">Strategic Implementation</h2>
        </div>
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-16">
          {[
            { step: '01', title: 'Identity Ingestion', desc: 'Sync your brand guidelines, core keywords, and competitor metadata.' },
            { step: '02', title: 'Global AI Auditing', desc: 'We stress-test GPT-4, Gemini, Claude, and Llama 24/7 with customized prompts.' },
            { step: '03', title: 'Visibility Recovery', desc: 'Instant delta alerts when rankings shift or replacement occurs.' },
          ].map((item) => (
            <div key={item.step} className="group relative">
              <div className="text-[12rem] font-black text-zinc-50 absolute -top-32 -left-10 select-none group-hover:text-zinc-100 transition-all duration-700">
                {item.step}
              </div>
              <div className="relative z-10 pt-10">
                <div className="w-16 h-1 bg-black mb-8 group-hover:w-32 transition-all duration-700"></div>
                <h3 className="text-2xl font-black text-black mb-4 uppercase tracking-tighter">{item.title}</h3>
                <p className="text-zinc-500 leading-relaxed font-medium">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Section 4: Key Benefits */}
      <section id="benefits" className="py-40 bg-zinc-50 px-10 overflow-hidden relative border-y border-zinc-100">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-32 items-center">
          <div>
            <h2 className="text-6xl font-black text-black mb-12 leading-[0.9] tracking-tighter uppercase">Market Control <br/><span className="text-zinc-400 italic">Redefined.</span></h2>
            <div className="space-y-6">
              {[
                { title: 'Core Visibility Index', desc: 'A singular, unified score representing your global AI recommendation health.' },
                { title: 'Replacement Forensics', desc: 'Deep-dive analysis on exactly why and when AI favors a competitor.' },
                { title: 'Prompt Optimization', desc: 'Intelligence on which keyword combinations trigger brand citations.' },
                { title: 'Sentiment Safeguards', desc: 'Monitoring the reputational tone used by autonomous agents.' },
              ].map((benefit) => (
                <div key={benefit.title} className="p-8 bg-white rounded-2xl border border-zinc-200 group hover:border-black transition-all">
                  <h4 className="text-lg font-black text-black mb-2 uppercase tracking-tight">{benefit.title}</h4>
                  <p className="text-zinc-500 text-sm leading-relaxed font-medium">{benefit.desc}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-black rounded-[4rem] p-16 shadow-4xl text-white">
            <h3 className="text-2xl font-black mb-12 text-center uppercase tracking-widest text-zinc-500">Terminal Preview</h3>
            <div className="space-y-8">
              <div className="flex flex-col items-center">
                 <div className="text-9xl font-black tracking-tighter mb-4">82%</div>
                 <div className="text-zinc-500 font-black uppercase tracking-[0.3em] text-[10px]">Visibility Score</div>
              </div>
              <div className="space-y-4 mt-12">
                <div className="flex items-center justify-between p-4 bg-zinc-900 rounded-xl border border-zinc-800">
                   <span className="text-zinc-400 font-bold">AcmeCloud</span>
                   <span className="font-black">82%</span>
                </div>
                <div className="flex items-center justify-between p-4 bg-zinc-900/50 rounded-xl">
                   <span className="text-zinc-600 font-bold">CloudBox</span>
                   <span className="text-zinc-500 font-black">45%</span>
                </div>
                <div className="flex items-center justify-between p-4 bg-zinc-900/50 rounded-xl">
                   <span className="text-zinc-600 font-bold">ServerLess</span>
                   <span className="text-zinc-500 font-black">12%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 5: Final CTA */}
      <section className="py-40 px-10">
        <div className="max-w-5xl mx-auto bg-black rounded-[5rem] p-24 text-center shadow-4xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-96 h-96 bg-zinc-800/50 blur-[120px] -ml-48 -mt-48"></div>
          <h2 className="text-5xl md:text-7xl font-black text-white mb-10 leading-[0.9] tracking-tighter relative z-10 uppercase">THE AI TRANSITION <br/>IS MANDATORY.</h2>
          <p className="text-zinc-500 text-xl mb-16 relative z-10 font-medium">Be the brand that gets recommended. Start monitoring now.</p>
          <div className="relative z-10">
            <Link to="/auth" className="px-16 py-7 bg-white text-black rounded-3xl font-black text-2xl hover:scale-105 transition-all shadow-3xl inline-block">
              Request Access
            </Link>
          </div>
          <p className="mt-12 text-zinc-700 text-xs font-black uppercase tracking-[0.4em]">Proprietary Data Systems &copy; 2024</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 border-t border-zinc-100 bg-white">
        <div className="max-w-7xl mx-auto px-10 flex flex-col md:flex-row items-center justify-between gap-12">
          <span className="text-2xl font-black tracking-tighter text-black uppercase">Prompt Zero</span>
          <div className="flex gap-12 text-[10px] text-zinc-400 font-black uppercase tracking-widest">
            <a href="#" className="hover:text-black transition-all">Privacy</a>
            <a href="#" className="hover:text-black transition-all">Protocol</a>
            <a href="#" className="hover:text-black transition-all">Support</a>
          </div>
          <p className="text-zinc-300 text-[10px] font-black uppercase tracking-widest">Built for the future of search.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;