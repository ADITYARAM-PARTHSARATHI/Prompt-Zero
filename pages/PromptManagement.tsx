
import React, { useState } from 'react';
import { MOCK_PROMPTS } from '../constants';

const PromptManagement: React.FC = () => {
  const [prompts, setPrompts] = useState(MOCK_PROMPTS);
  const [newPrompt, setNewPrompt] = useState('');

  const handleAddPrompt = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPrompt.trim()) return;
    const item = {
      id: Math.random().toString(36).substr(2, 9),
      text: newPrompt,
      status: 'active' as const,
      createdAt: new Date().toISOString().split('T')[0]
    };
    setPrompts([item, ...prompts]);
    setNewPrompt('');
  };

  const toggleStatus = (id: string) => {
    setPrompts(prev => prev.map(p => p.id === id ? { ...p, status: p.status === 'active' ? 'paused' : 'active' } : p));
  };

  // deletePrompt function removed as per user request to hide delete capability

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-700">
      <div>
        <h1 className="text-3xl font-black text-black tracking-tight">Prompt Terminal</h1>
        <p className="text-zinc-500 font-medium">Define the semantic vectors monitored by the neural mesh.</p>
      </div>

      <div className="bg-white p-6 rounded-[2rem] border border-zinc-200 shadow-sm">
        <h3 className="text-[9px] font-black text-black uppercase tracking-widest mb-4">Initialize New Vector</h3>
        <form onSubmit={handleAddPrompt} className="flex flex-col md:flex-row gap-4">
          <input 
            type="text"
            value={newPrompt}
            onChange={(e) => setNewPrompt(e.target.value)}
            className="flex-1 px-6 py-3 bg-zinc-50 border border-zinc-200 rounded-2xl focus:outline-none focus:ring-1 focus:ring-black focus:bg-white transition-all text-black font-medium text-sm"
            placeholder="e.g., 'Compare edge security protocols for high-frequency trading platforms...'"
          />
          <button className="px-8 py-3 bg-black text-white rounded-2xl font-black uppercase text-[9px] tracking-widest shadow-lg hover:bg-zinc-800 transition-all shrink-0">
            Initialize
          </button>
        </form>
      </div>

      <div className="bg-white rounded-[2rem] border border-zinc-200 shadow-sm overflow-hidden">
        <div className="px-8 py-5 border-b border-zinc-100 flex items-center justify-between bg-zinc-50/50">
          <h3 className="text-[9px] font-black text-black uppercase tracking-widest">Active Monitoring Registry</h3>
          <span className="px-3 py-1 bg-black text-white rounded-lg text-[8px] font-black uppercase tracking-widest">
            {prompts.length} Active
          </span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-white text-zinc-400 uppercase text-[8px] font-black tracking-[0.2em] border-b border-zinc-100">
              <tr>
                <th className="px-8 py-3">Semantic Query</th>
                <th className="px-8 py-3">Timestamp</th>
                <th className="px-8 py-3">State</th>
                <th className="px-8 py-3 text-right">Control</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-50">
              {prompts.map((prompt) => (
                <tr key={prompt.id} className="group hover:bg-zinc-50 transition-colors">
                  <td className="px-8 py-4 text-[10px] font-black text-zinc-800 leading-snug max-w-xl">{prompt.text}</td>
                  <td className="px-8 py-4 text-[9px] text-zinc-400 font-black uppercase tracking-widest">{prompt.createdAt}</td>
                  <td className="px-8 py-4">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest ${
                      prompt.status === 'active' ? 'bg-black text-white' : 'bg-zinc-100 text-zinc-400'
                    }`}>{prompt.status === 'active' ? 'Active' : 'Standby'}</span>
                  </td>
                  <td className="px-8 py-4 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-all">
                      <button 
                        onClick={() => toggleStatus(prompt.id)} 
                        className="p-2 rounded-xl text-zinc-400 hover:text-black hover:bg-white border border-transparent transition-all"
                        title="Toggle Status"
                      >
                         <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" /></svg>
                      </button>
                      {/* Delete button removed from here */}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PromptManagement;
