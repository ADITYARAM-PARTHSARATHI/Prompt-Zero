
import React, { useState, useMemo } from 'react';
import { COMPANY_INFO } from '../constants';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const SettingsPage: React.FC = () => {
  const [engines, setEngines] = useState([
    { id: 1, name: 'GPT-4o Matrix', active: true, desc: 'Dominant search replacement protocol.' },
    { id: 2, name: 'Claude 3.5 Protocol', active: true, desc: 'High-reasoning enterprise citation.' },
    { id: 3, name: 'Gemini SGE Core', active: true, desc: 'Native search generative infrastructure.' },
    { id: 4, name: 'Meta Llama 3', active: false, desc: 'Open-source consumer recommendation.' },
  ]);

  const [frequency, setFrequency] = useState('24h');

  const toggleEngine = (id: number) => {
    setEngines(prev => prev.map(e => e.id === id ? { ...e, active: !e.active } : e));
  };

  // Simulated dynamic frequency data
  const frequencyData = useMemo(() => {
    const points = frequency === '24h' ? 24 : frequency === '1w' ? 7 : 30;
    const labelPrefix = frequency === '24h' ? 'Hr ' : frequency === '1w' ? 'Day ' : 'Min ';
    
    return Array.from({ length: points }, (_, i) => ({
      name: `${labelPrefix}${i + 1}`,
      load: 30 + Math.floor(Math.random() * 60) + (frequency === 'Real-time' ? 15 : 0)
    }));
  }, [frequency]);

  return (
    <div className="space-y-6 animate-in fade-in duration-700 pb-12">
      <div>
        <h1 className="text-3xl font-black text-black tracking-tight">System Settings</h1>
        <p className="text-zinc-500 font-medium text-sm">Configure identity parameters and engine coverage.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Company Info */}
        <div className="bg-white p-6 rounded-[2rem] border border-zinc-200 shadow-sm">
          <h3 className="text-[9px] font-black text-black uppercase tracking-widest mb-6 border-b border-zinc-100 pb-4">Brand Protocol</h3>
          <div className="space-y-4">
             <div className="space-y-1">
               <label className="text-[9px] font-black text-zinc-400 uppercase tracking-widest">Brand Identifier</label>
               <input 
                type="text" 
                defaultValue={COMPANY_INFO.brandName}
                className="w-full px-5 py-2.5 bg-zinc-50 border border-zinc-200 rounded-2xl focus:outline-none focus:ring-1 focus:ring-black focus:bg-white transition-all text-black font-black text-sm"
               />
             </div>
             <div className="space-y-1">
               <label className="text-[9px] font-black text-zinc-400 uppercase tracking-widest">Canonical Endpoint</label>
               <input 
                type="text" 
                defaultValue={COMPANY_INFO.website}
                className="w-full px-5 py-2.5 bg-zinc-50 border border-zinc-200 rounded-2xl focus:outline-none focus:ring-1 focus:ring-black focus:bg-white transition-all text-black font-black text-sm"
               />
             </div>
             <div className="grid grid-cols-2 gap-4">
               <div className="space-y-1">
                  <label className="text-[9px] font-black text-zinc-400 uppercase tracking-widest">Geo-Fencing</label>
                  <select className="w-full px-4 py-2.5 bg-zinc-50 border border-zinc-200 rounded-2xl focus:outline-none focus:ring-1 focus:ring-black font-black uppercase text-[10px] cursor-pointer">
                    <option>Global Standard</option>
                    <option>US East / West</option>
                    <option>Euro Zone</option>
                    <option>APAC Hub</option>
                  </select>
               </div>
               <div className="space-y-1">
                  <label className="text-[9px] font-black text-zinc-400 uppercase tracking-widest">Encoding</label>
                  <select className="w-full px-4 py-2.5 bg-zinc-50 border border-zinc-200 rounded-2xl focus:outline-none focus:ring-1 focus:ring-black font-black uppercase text-[10px] cursor-pointer">
                    <option>UTF-8 / English</option>
                    <option>Multilingual</option>
                  </select>
               </div>
             </div>
          </div>
          <button className="mt-6 w-full py-3.5 bg-black text-white rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] hover:bg-zinc-800 transition-all shadow-xl shadow-zinc-200">
            Commit Changes
          </button>
        </div>

        {/* AI Engine Selection */}
        <div className="bg-white p-6 rounded-[2rem] border border-zinc-200 shadow-sm">
           <h3 className="text-[9px] font-black text-black uppercase tracking-widest mb-6 border-b border-zinc-100 pb-4">Coverage Matrix</h3>
           <div className="space-y-3">
              {engines.map((engine) => (
                <div 
                  key={engine.id} 
                  onClick={() => toggleEngine(engine.id)}
                  className="flex items-center justify-between p-3.5 bg-zinc-50 rounded-2xl border border-zinc-100 group hover:border-black transition-all cursor-pointer"
                >
                  <div>
                    <h4 className="text-[10px] font-black text-black uppercase tracking-widest">{engine.name}</h4>
                    <p className="text-[8px] text-zinc-400 font-bold uppercase mt-0.5 leading-tight">{engine.desc}</p>
                  </div>
                  <div className={`relative inline-flex h-5 w-10 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${engine.active ? 'bg-black' : 'bg-zinc-200'}`}>
                    <span className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${engine.active ? 'translate-x-5' : 'translate-x-0'}`} />
                  </div>
                </div>
              ))}
           </div>
           
           <div className="mt-6 p-5 bg-zinc-50 rounded-[2rem] border border-zinc-100">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-[9px] font-black text-black uppercase tracking-[0.2em]">Audit Frequency</h4>
                <span className="text-[10px] font-black text-black uppercase bg-white px-2 py-0.5 rounded border border-zinc-200">
                   Active: {frequency.toUpperCase()}
                </span>
              </div>
              <div className="flex gap-2 mb-6">
                {['24h', '1w', 'Real-time'].map((freq) => (
                  <button 
                    key={freq} 
                    onClick={() => setFrequency(freq)}
                    className={`flex-1 py-2.5 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all ${frequency === freq ? 'bg-black text-white shadow-xl shadow-zinc-200' : 'bg-white text-zinc-400 border border-zinc-200 hover:border-black hover:text-black'}`}
                  >
                    {freq}
                  </button>
                ))}
              </div>
              
              <div className="h-44 w-full bg-white rounded-2xl border border-zinc-100 p-4">
                 <ResponsiveContainer width="100%" height="100%">
                   <LineChart data={frequencyData}>
                     <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f1f1" />
                     <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#a1a1aa', fontSize: 7, fontWeight: 800}} dy={10} />
                     <YAxis 
                       axisLine={false} 
                       tickLine={false} 
                       tick={{fill: '#a1a1aa', fontSize: 7, fontWeight: 800}}
                       domain={[0, 100]}
                       ticks={[0, 25, 50, 75, 100]}
                     />
                     <Tooltip 
                        contentStyle={{fontSize: '9px', fontWeight: '800', borderRadius: '12px', border: '1px solid #e5e7eb', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} 
                      />
                     <Line type="stepAfter" dataKey="load" stroke="#000" strokeWidth={3} dot={{r: 2, fill: '#000', strokeWidth: 0}} activeDot={{r: 5}} />
                   </LineChart>
                 </ResponsiveContainer>
              </div>
              <p className="text-[8px] font-black text-zinc-400 uppercase tracking-widest text-center mt-4">Simulated Network Load Index (SNLI)</p>
           </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
