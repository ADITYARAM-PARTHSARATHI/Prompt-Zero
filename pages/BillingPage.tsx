
import React from 'react';

const BillingPage: React.FC = () => {
  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-4xl font-black text-black tracking-tight">Subscription Ledger</h1>
        <p className="text-zinc-500 font-medium">Manage enterprise tier and infrastructure usage.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Plan Overview */}
        <div className="lg:col-span-2 space-y-10">
          <div className="bg-black p-12 rounded-[4rem] text-white shadow-4xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-zinc-800 rounded-full -mr-48 -mt-48 blur-[100px] opacity-40"></div>
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-12">
                 <div>
                   <h2 className="text-4xl font-black tracking-tighter uppercase">Professional</h2>
                   <p className="text-zinc-500 font-black uppercase tracking-widest text-[10px] mt-2">Annual Commitment • Tier II</p>
                 </div>
                 <div className="px-6 py-2 border border-zinc-700 bg-zinc-900 rounded-full font-black text-[10px] uppercase tracking-widest">Active State</div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                 {[
                   { label: 'Prompt Credits', val: '42', max: '100' },
                   { label: 'Engine Mesh', val: '3', max: '5' },
                   { label: 'Audit Checks', val: '1.2k', max: '5k' },
                 ].map((stat, i) => (
                   <div key={i} className="bg-zinc-900/50 p-6 rounded-[2rem] border border-zinc-800">
                      <p className="text-[9px] text-zinc-500 font-black uppercase mb-3 tracking-widest">{stat.label}</p>
                      <div className="flex items-end gap-2">
                        <span className="text-3xl font-black">{stat.val}</span>
                        <span className="text-xs text-zinc-600 font-bold mb-1">/ {stat.max}</span>
                      </div>
                      <div className="h-1 w-full bg-zinc-800 rounded-full mt-4 overflow-hidden">
                        <div className="h-full bg-white transition-all duration-1000" style={{width: `${(parseFloat(stat.val) / parseFloat(stat.max)) * 100}%`}}></div>
                      </div>
                   </div>
                 ))}
              </div>
            </div>
          </div>

          <div className="bg-white p-12 rounded-[3.5rem] border border-zinc-200 shadow-sm">
             <h3 className="text-sm font-black text-black uppercase tracking-widest mb-10">Financial Log</h3>
             <div className="divide-y divide-zinc-100">
                {[
                  { date: 'MAY 2024', id: 'INV-4829-05', amount: '$490.00', status: 'Settled' },
                  { date: 'APR 2024', id: 'INV-4829-04', amount: '$490.00', status: 'Settled' },
                  { date: 'MAR 2024', id: 'INV-4829-03', amount: '$490.00', status: 'Settled' },
                ].map((inv) => (
                  <div key={inv.id} className="py-6 flex items-center justify-between group cursor-pointer hover:bg-zinc-50 transition-all rounded-2xl px-4 -mx-4">
                     <div className="flex items-center gap-6">
                        <div className="h-12 w-12 bg-zinc-50 rounded-xl flex items-center justify-center text-zinc-300 border border-zinc-100 group-hover:bg-black group-hover:text-white transition-all">
                           <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                        </div>
                        <div>
                           <p className="text-xs font-black text-black uppercase tracking-widest">{inv.id}</p>
                           <p className="text-[10px] text-zinc-400 font-bold mt-1 tracking-widest">{inv.date}</p>
                        </div>
                     </div>
                     <div className="flex items-center gap-10">
                        <span className="text-sm font-black text-black">{inv.amount}</span>
                        <span className="px-4 py-1.5 bg-zinc-50 border border-zinc-100 text-zinc-500 text-[10px] font-black uppercase tracking-widest rounded-full">{inv.status}</span>
                        <button className="text-black font-black text-[10px] uppercase tracking-widest hover:underline">Download PDF</button>
                     </div>
                  </div>
                ))}
             </div>
          </div>
        </div>

        {/* Pricing Cards Sidebar */}
        <div className="space-y-8">
          <div className="bg-zinc-50 p-10 rounded-[4rem] border border-zinc-200">
             <div className="inline-block px-4 py-1.5 bg-black text-white text-[9px] font-black uppercase tracking-[0.3em] rounded-lg mb-6">Tier Expansion</div>
             <h3 className="text-3xl font-black mb-4 uppercase tracking-tighter">Enterprise</h3>
             <p className="text-zinc-500 text-sm mb-10 font-medium leading-relaxed">Full semantic mesh coverage with real-time incident auditing.</p>
             <div className="text-5xl font-black mb-12 tracking-tighter">$1,299 <span className="text-xs text-zinc-400 uppercase tracking-widest">/mo</span></div>
             <ul className="space-y-6 mb-12">
               {['Unlimited Semantic Vectors', 'Real-time Neural Scanning', 'Custom API Hookups', 'Dedicated Audit Analyst'].map((feat) => (
                 <li key={feat} className="flex items-center gap-4 text-xs font-black text-zinc-600 uppercase tracking-tight">
                    <svg className="w-5 h-5 text-black" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                    {feat}
                 </li>
               ))}
             </ul>
             <button className="w-full py-5 bg-black text-white rounded-3xl font-black uppercase text-xs tracking-[0.2em] transition-all shadow-3xl shadow-zinc-300 hover:scale-[1.02]">
               Upgrade Protocol
             </button>
          </div>

          <div className="bg-white p-10 rounded-[4rem] border border-zinc-200 text-center">
             <h4 className="text-xs font-black text-black uppercase tracking-widest mb-3">Custom Deployment</h4>
             <p className="text-[10px] text-zinc-400 mb-8 font-bold uppercase tracking-widest leading-relaxed">Institutional holding entities and agencies.</p>
             <button className="text-black font-black text-xs uppercase tracking-[0.3em] border-b-2 border-black pb-1 hover:text-zinc-500 hover:border-zinc-500 transition-all">Contact Ops</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BillingPage;
