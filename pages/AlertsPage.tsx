
import React, { useState } from 'react';
import { MOCK_ALERTS } from '../constants';
import { Alert } from '../types';

const AlertsPage: React.FC = () => {
  const [selectedAlert, setSelectedAlert] = useState<Alert | null>(null);

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-700">
      <div>
        <h1 className="text-3xl font-black text-black tracking-tight">Security Alerts</h1>
        <p className="text-zinc-500 font-medium">History of autonomous agent brand replacement incidents.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {MOCK_ALERTS.map((alert) => (
            <div key={alert.id} className="bg-white p-8 rounded-[2rem] border border-zinc-200 flex flex-col md:flex-row gap-8 relative group hover:border-black transition-all shadow-sm">
              {alert.status === 'new' && <div className="absolute top-0 left-0 w-1.5 h-full bg-black"></div>}
              <div className="h-16 w-16 bg-zinc-50 rounded-2xl flex items-center justify-center text-black border border-zinc-100 shrink-0 group-hover:bg-black group-hover:text-white transition-all">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-4">
                   <h4 className="text-xl font-black text-black uppercase tracking-tight">Replaced by <span className="underline decoration-2 underline-offset-4">{alert.competitor}</span></h4>
                   <span className="text-[8px] font-black text-zinc-400 bg-zinc-50 px-3 py-1 rounded-full border border-zinc-100 uppercase tracking-widest">{alert.timestamp}</span>
                </div>
                <p className="text-zinc-600 mb-6 font-medium italic text-sm leading-relaxed">"{alert.prompt}"</p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  <div className="p-3 bg-zinc-50 rounded-xl border border-zinc-100">
                    <p className="text-[8px] text-zinc-400 uppercase font-black tracking-widest mb-1">AI Engine</p>
                    <p className="text-[10px] font-black text-black uppercase">{alert.engine}</p>
                  </div>
                  <button 
                    onClick={() => setSelectedAlert(alert)}
                    className="p-3 bg-black rounded-xl text-center flex items-center justify-center cursor-pointer hover:bg-zinc-800 transition-all"
                  >
                    <p className="text-[8px] font-black text-white uppercase tracking-widest">View Response</p>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-6">
          <div className="bg-black p-8 rounded-[2.5rem] text-white shadow-xl relative">
             <h3 className="text-sm font-black mb-6 uppercase tracking-widest">Incident Ledger</h3>
             <div className="space-y-4">
                <div className="flex justify-between items-center p-4 bg-zinc-900 rounded-2xl border border-zinc-800">
                   <span className="text-zinc-500 font-bold uppercase text-[9px] tracking-widest">Total Incidents</span>
                   <span className="text-2xl font-black">24</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-zinc-900 rounded-2xl border border-zinc-800">
                   <span className="text-zinc-500 font-bold uppercase text-[9px] tracking-widest">Top Rival</span>
                   <span className="font-black text-xs uppercase">CloudBox</span>
                </div>
             </div>
          </div>

          <div className="bg-white p-8 rounded-[2.5rem] border border-zinc-200 shadow-sm">
             <h3 className="text-[9px] font-black text-black uppercase tracking-widest mb-6">Refine View</h3>
             <div className="space-y-4">
                <div>
                  <label className="text-[8px] font-black text-zinc-400 uppercase tracking-widest mb-2 block">Competitive Entity</label>
                  <select className="w-full p-3 bg-zinc-50 rounded-xl border border-zinc-100 text-black font-black uppercase text-[10px] focus:ring-1 focus:ring-black outline-none">
                    <option>Global Standard</option>
                    <option>CloudBox</option>
                    <option>SalesPro</option>
                  </select>
                </div>
                <div>
                  <label className="text-[8px] font-black text-zinc-400 uppercase tracking-widest mb-2 block">Engines</label>
                  <div className="flex flex-wrap gap-1">
                    {['GPT-4o', 'Claude 3', 'Gemini'].map(tag => (
                      <button key={tag} className="px-3 py-1 bg-zinc-50 hover:bg-black hover:text-white rounded-lg text-[8px] font-black text-zinc-500 transition-all uppercase tracking-widest border border-zinc-100">
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>
             </div>
          </div>
        </div>
      </div>

      {/* Detail Modal */}
      {selectedAlert && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/40 backdrop-blur-sm transition-all">
          <div className="bg-white w-full max-w-2xl rounded-[2.5rem] shadow-2xl border border-zinc-200 overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="p-8 border-b border-zinc-100 bg-zinc-50/50 flex items-center justify-between">
              <div>
                <h4 className="text-xl font-black text-black uppercase">Incident Audit</h4>
                <p className="text-[10px] font-black text-zinc-400 uppercase mt-1">ID: AL-{selectedAlert.id.padStart(4, '0')}</p>
              </div>
              <button 
                onClick={() => setSelectedAlert(null)} 
                className="p-2 bg-white border border-zinc-200 rounded-full hover:bg-black hover:text-white transition-all shadow-sm"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            <div className="p-8 space-y-6">
              <div className="space-y-4">
                 <p className="text-[10px] font-black text-black uppercase tracking-widest px-4 py-1.5 bg-zinc-100 inline-block rounded-lg">Source Query</p>
                 <div className="p-6 bg-zinc-50 border border-zinc-100 rounded-2xl text-lg font-black italic text-zinc-800 leading-snug">
                   "{selectedAlert.prompt}"
                 </div>
              </div>
              
              <div className="space-y-4">
                 <p className="text-[10px] font-black text-black uppercase tracking-widest px-4 py-1.5 bg-zinc-100 inline-block rounded-lg">Neural Mesh Response</p>
                 <div className="p-6 bg-zinc-900 text-white rounded-2xl text-sm leading-relaxed font-medium">
                   {selectedAlert.response || "No stored response data available for this incident index."}
                 </div>
              </div>

              <div className="grid grid-cols-3 gap-4 pt-4 border-t border-zinc-100">
                <div>
                  <p className="text-[8px] font-black text-zinc-400 uppercase tracking-widest mb-1">Engine</p>
                  <p className="text-xs font-black uppercase text-black">{selectedAlert.engine}</p>
                </div>
                <div>
                  <p className="text-[8px] font-black text-zinc-400 uppercase tracking-widest mb-1">Timestamp</p>
                  <p className="text-xs font-black uppercase text-black">{selectedAlert.timestamp}</p>
                </div>
                <div>
                  <p className="text-[8px] font-black text-zinc-400 uppercase tracking-widest mb-1">Entity favored</p>
                  <p className="text-xs font-black uppercase text-rose-600 underline">{selectedAlert.competitor}</p>
                </div>
              </div>
            </div>
            <div className="p-6 bg-zinc-50 border-t border-zinc-100 flex justify-end">
               <button 
                onClick={() => setSelectedAlert(null)}
                className="px-8 py-3 bg-black text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-zinc-800 transition-all shadow-xl"
               >
                 Close Report
               </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AlertsPage;
