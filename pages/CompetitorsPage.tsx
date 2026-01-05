
import React, { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { MOCK_COMPETITORS, MOCK_AI_USAGE, MOCK_AI_AUDITS } from '../constants';
import { Sentiment, BrandData } from '../types';
import { analyzeCompetitor } from '../services/geminiService';

const CompetitorsPage: React.FC = () => {
  const [competitors, setCompetitors] = useState<BrandData[]>(MOCK_COMPETITORS);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [formData, setFormData] = useState({ name: '', url: '' });

  const totalRecommendations = MOCK_AI_USAGE.reduce((acc, curr) => acc + curr.count, 0);

  const handleAddSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.url.trim()) return;
    
    setIsAnalyzing(true);
    try {
      const analysis = await analyzeCompetitor(formData.name, formData.url);
      const newComp: BrandData = {
        name: formData.name,
        visibilityScore: analysis.visibilityScore,
        mentions: analysis.mentions,
        sentiment: analysis.sentiment as Sentiment
      };
      setCompetitors(prev => [...prev, newComp]);
      setIsAddModalOpen(false);
      setFormData({ name: '', url: '' });
    } catch (error) {
      console.error("Failed to add competitor:", error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="space-y-8 pb-12 animate-in fade-in duration-700">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-black tracking-tight">Market Entities</h1>
          <p className="text-zinc-500 font-medium">Audit of competitor penetration across the neural mesh.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {competitors.map((comp, idx) => (
              <div key={`${comp.name}-${idx}`} className="bg-white p-6 rounded-[2rem] border border-zinc-200 shadow-sm group hover:border-black transition-all">
                <div className="flex items-center justify-between mb-6">
                   <div className="h-12 w-12 bg-zinc-900 text-white border border-zinc-800 rounded-xl flex items-center justify-center font-black transition-all">
                     {comp.name.substring(0, 2).toUpperCase()}
                   </div>
                   <div className="text-right">
                      <p className="text-[8px] font-black text-zinc-400 uppercase tracking-widest">Visibility</p>
                      <p className="text-xl font-black text-black">{comp.visibilityScore}%</p>
                   </div>
                </div>
                
                <h3 className="text-lg font-black text-black uppercase tracking-tight mb-2">{comp.name}</h3>
                
                <div className="space-y-2 mb-6">
                   <div className="flex items-center justify-between">
                      <span className="text-[9px] font-black text-zinc-400 uppercase">Sentiment</span>
                      <span className="text-[9px] font-black text-black uppercase">{comp.sentiment}</span>
                   </div>
                   <div className="flex items-center justify-between">
                      <span className="text-[9px] font-black text-zinc-400 uppercase">Citations</span>
                      <span className="text-[9px] font-black text-black uppercase">{comp.mentions.toLocaleString()}</span>
                   </div>
                </div>

                <div className="h-1.5 w-full bg-zinc-50 rounded-full overflow-hidden border border-zinc-100">
                  <div className="h-full bg-black group-hover:bg-zinc-800 transition-all duration-700" style={{ width: `${comp.visibilityScore}%` }}></div>
                </div>
              </div>
            ))}

            {/* Add Competitor Card Item with Modal Trigger */}
            <div 
              onClick={() => !isAnalyzing && setIsAddModalOpen(true)}
              className="bg-zinc-50 p-6 rounded-[2rem] border-2 border-dashed border-zinc-300 flex flex-col items-center justify-center gap-4 hover:bg-white hover:border-black hover:shadow-xl transition-all cursor-pointer min-h-[220px] group select-none"
            >
              <div className="h-14 w-14 bg-white border border-zinc-200 rounded-full flex items-center justify-center text-zinc-400 group-hover:text-black group-hover:border-black transition-all group-active:scale-95">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v16m8-8H4" />
                </svg>
              </div>
              <div className="text-center">
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 group-hover:text-black transition-all block">Expand Tracker</span>
                <span className="text-[8px] font-bold uppercase text-zinc-300 group-hover:text-zinc-500 mt-1 block">New Market Entity</span>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-[2rem] border border-zinc-200 shadow-sm">
            <h3 className="text-sm font-black text-black uppercase tracking-widest mb-6">Global AI Citations</h3>
            <div className="space-y-4">
              {MOCK_AI_AUDITS.map((audit, i) => (
                <div key={i} className="p-4 bg-zinc-50 rounded-2xl border border-zinc-100 flex items-start gap-4 group hover:bg-white transition-all">
                   <div className="w-10 h-10 bg-black text-white rounded-lg flex items-center justify-center text-[10px] font-black shrink-0">AI</div>
                   <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                         <span className="text-[10px] font-black text-black uppercase tracking-widest">{audit.engine}</span>
                         <span className="text-[8px] font-black text-zinc-400 uppercase">{audit.timestamp}</span>
                      </div>
                      <p className="text-[11px] font-bold text-zinc-600 mb-2 leading-relaxed">Prompt: "{audit.prompt}"</p>
                      <div className="flex gap-2">
                        <span className="px-2 py-0.5 bg-white border border-zinc-200 rounded text-[7px] font-black uppercase text-zinc-500">Mentions: 12</span>
                        <span className="px-2 py-0.5 bg-white border border-zinc-200 rounded text-[7px] font-black uppercase text-zinc-500">Sentiment: {audit.sentiment}</span>
                      </div>
                   </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white p-8 rounded-[2.5rem] border border-zinc-200 shadow-sm">
            <h3 className="text-sm font-black text-black uppercase tracking-widest mb-6">AI Recommendation Share</h3>
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={MOCK_AI_USAGE}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="count"
                    label={({ count }) => `${((count / totalRecommendations) * 100).toFixed(0)}%`}
                    animationDuration={1500}
                  >
                    {MOCK_AI_USAGE.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />)}
                  </Pie>
                  <Tooltip contentStyle={{borderRadius: '12px', fontSize: '10px'}} />
                  <Legend verticalAlign="bottom" height={36} iconType="circle" wrapperStyle={{paddingTop: '20px', fontSize: '9px', fontWeight: 'bold'}} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <p className="text-center text-[9px] font-black text-zinc-400 uppercase tracking-widest mt-4">Total Engine Recommendations</p>
          </div>

          <div className="bg-black p-8 rounded-[2.5rem] text-white shadow-xl">
             <h3 className="text-xs font-black uppercase tracking-[0.2em] mb-6">Usage Breakdown</h3>
             <div className="space-y-4">
                {MOCK_AI_USAGE.map((ai) => (
                  <div key={ai.name} className="flex flex-col gap-2">
                    <div className="flex justify-between items-center">
                       <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500">{ai.name}</span>
                       <span className="text-[10px] font-black uppercase">{ai.count} citations</span>
                    </div>
                    <div className="h-1 w-full bg-zinc-800 rounded-full overflow-hidden">
                       <div className="h-full bg-white" style={{width: `${(ai.count / totalRecommendations) * 100}%`}}></div>
                    </div>
                  </div>
                ))}
             </div>
          </div>
        </div>
      </div>

      {/* Add Competitor Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/40 backdrop-blur-sm transition-all">
          <div className="bg-white w-full max-w-lg rounded-[2.5rem] shadow-2xl border border-zinc-200 overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="p-8 border-b border-zinc-100 bg-zinc-50/50 flex items-center justify-between">
              <h4 className="text-xl font-black text-black uppercase tracking-tight">AI Market Analysis</h4>
              <button 
                onClick={() => !isAnalyzing && setIsAddModalOpen(false)} 
                className="p-2 bg-white border border-zinc-200 rounded-full hover:bg-black hover:text-white transition-all shadow-sm"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            <form onSubmit={handleAddSubmit} className="p-8 space-y-6">
              <div className="space-y-1">
                <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Competitor Identity</label>
                <input 
                  type="text" 
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  disabled={isAnalyzing}
                  className="w-full px-5 py-3.5 bg-zinc-50 border border-zinc-200 rounded-2xl focus:outline-none focus:ring-1 focus:ring-black focus:bg-white transition-all text-black font-black text-sm disabled:opacity-50"
                  placeholder="e.g. AcmeCloud Rival"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Brand URL</label>
                <input 
                  type="url" 
                  value={formData.url}
                  onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                  disabled={isAnalyzing}
                  className="w-full px-5 py-3.5 bg-zinc-50 border border-zinc-200 rounded-2xl focus:outline-none focus:ring-1 focus:ring-black focus:bg-white transition-all text-black font-black text-sm disabled:opacity-50"
                  placeholder="https://competitor.io"
                  required
                />
              </div>

              {isAnalyzing && (
                <div className="p-4 bg-zinc-50 rounded-2xl border border-zinc-100 flex items-center gap-4 animate-pulse">
                  <div className="w-6 h-6 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Autonomous agents scanning semantic domain...</p>
                </div>
              )}

              <button 
                type="submit"
                disabled={isAnalyzing}
                className="w-full py-5 bg-black text-white rounded-[2rem] font-black uppercase text-xs tracking-[0.2em] shadow-xl hover:bg-zinc-800 transition-all mt-4 disabled:bg-zinc-400"
              >
                {isAnalyzing ? 'Analyzing Metrics...' : 'Execute Analysis'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CompetitorsPage;
