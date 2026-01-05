
import React, { useMemo, useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import { MOCK_VISIBILITY_HISTORY, MOCK_COMPETITORS, MOCK_AI_AUDITS } from '../constants';
import { Sentiment } from '../types';

const Dashboard: React.FC = () => {
  const [timeRange, setTimeRange] = useState('1M');
  const [selectedAudit, setSelectedAudit] = useState<typeof MOCK_AI_AUDITS[0] | null>(null);
  const [showExportDropdown, setShowExportDropdown] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const currentVisibility = 78;
  const lastVisibility = 72;
  const growth = ((currentVisibility - lastVisibility) / lastVisibility) * 100;

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 800);
  };

  const handleExport = (format: string) => {
    try {
      const formatName = format.toUpperCase();
      const reportData = {
        report: "AcmeCloud Core Visibility Report",
        timestamp: new Date().toLocaleString(),
        visibilityIndex: `${currentVisibility}%`,
        growth: `+${growth.toFixed(1)}%`,
        sentiment: "65% Positive",
        ai_audits: MOCK_AI_AUDITS.length,
        brand_mentions: MOCK_COMPETITORS.length
      };

      // Create blob based on simulated format
      const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `Lodestone_Report_${formatName}_${new Date().getTime()}.${format.toLowerCase() === 'pdf' ? 'pdf' : format.toLowerCase() === 'json' ? 'json' : 'txt'}`);
      
      document.body.appendChild(link);
      link.click();
      
      // Cleanup
      setTimeout(() => {
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      }, 100);

      alert(`Downloading ${formatName} Report...`);
    } catch (e) {
      console.error("Export failed", e);
    }
    setShowExportDropdown(false);
  };

  const soloBrandData = useMemo(() => {
    const sliceCount = timeRange === '1W' ? 7 : 30;
    const data = MOCK_VISIBILITY_HISTORY.slice(-Math.min(sliceCount, MOCK_VISIBILITY_HISTORY.length));
    return data.map(item => ({
      date: item.date.split('-').slice(1).join('/'),
      score: item.myBrand
    }));
  }, [timeRange]);

  const competitiveData = useMemo(() => {
    const sliceCount = timeRange === '1W' ? 7 : 30;
    return MOCK_VISIBILITY_HISTORY.slice(-Math.min(sliceCount, MOCK_VISIBILITY_HISTORY.length));
  }, [timeRange]);

  const CHART_COLORS = {
    AcmeCloud: '#000000',
    CloudBox: '#4b5563',
    ServerLess: '#9ca3af',
    Positive: '#000000',
    Neutral: '#6b7280',
    Negative: '#d1d5db'
  };

  const sentimentData = [
    { name: 'Positive', value: 65, fill: CHART_COLORS.Positive },
    { name: 'Neutral', value: 25, fill: CHART_COLORS.Neutral },
    { name: 'Negative', value: 10, fill: CHART_COLORS.Negative },
  ];

  return (
    <div className={`space-y-6 pb-12 animate-in fade-in duration-700 ${isRefreshing ? 'opacity-50 pointer-events-none' : ''}`}>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h1 className="text-3xl font-black text-black tracking-tight">Dashboard</h1>
        <div className="flex gap-2 relative">
          <div className="relative">
            <button 
              onClick={(e) => {
                e.stopPropagation();
                setShowExportDropdown(!showExportDropdown);
              }}
              className="px-4 py-2 bg-zinc-100 hover:bg-zinc-200 text-zinc-900 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all flex items-center gap-2"
            >
              Export Report
              <svg className={`w-3 h-3 transition-transform ${showExportDropdown ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
            </button>
            {showExportDropdown && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-zinc-200 rounded-xl shadow-2xl py-2 z-[100] animate-in slide-in-from-top-2 duration-200">
                {['PDF', 'Word', 'Docs', 'JSON'].map((format) => (
                  <button 
                    key={format}
                    type="button"
                    onClick={() => handleExport(format)}
                    className="w-full text-left px-5 py-3 text-[10px] font-black uppercase tracking-widest hover:bg-zinc-50 transition-colors border-b border-zinc-50 last:border-0"
                  >
                    Download as {format}
                  </button>
                ))}
              </div>
            )}
          </div>
          <button 
            onClick={handleRefresh}
            className="px-4 py-2 bg-black hover:bg-zinc-800 text-white rounded-xl text-[9px] font-black uppercase tracking-widest transition-all shadow-lg flex items-center gap-2"
          >
            {isRefreshing ? 'Syncing...' : 'Refresh'}
            <svg className={`w-3 h-3 ${isRefreshing ? 'animate-spin' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-6 rounded-[2rem] border border-zinc-200 shadow-sm transition-transform hover:scale-[1.01]">
          <span className="text-zinc-400 text-[9px] font-black uppercase tracking-[0.2em] block mb-4">Visibility Index</span>
          <span className="text-4xl font-black text-black tracking-tighter">{currentVisibility}%</span>
          <span className="text-emerald-600 text-[9px] font-black mt-2 uppercase tracking-widest block">+{growth.toFixed(1)}% vs LY</span>
        </div>

        <div className="bg-white p-6 rounded-[2rem] border border-zinc-200 shadow-sm flex items-center justify-between gap-4 transition-transform hover:scale-[1.01]">
          <div className="flex-1">
            <span className="text-zinc-400 text-[9px] font-black uppercase tracking-[0.2em] block mb-4">Sentiment</span>
            <div className="space-y-1">
              <div className="flex justify-between text-[9px] font-black"><span className="text-zinc-400">POS</span> <span>65%</span></div>
              <div className="flex justify-between text-[9px] font-black"><span className="text-zinc-400">NEU</span> <span>25%</span></div>
              <div className="flex justify-between text-[9px] font-black"><span className="text-zinc-400">NEG</span> <span>10%</span></div>
            </div>
          </div>
          <div className="w-20 h-20 relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={sentimentData} innerRadius={22} outerRadius={32} paddingAngle={2} dataKey="value" stroke="none">
                  {sentimentData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.fill} />)}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-xs font-black text-black leading-none">65%</span>
              <span className="text-[6px] font-black text-black uppercase">POS</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-[2rem] border border-zinc-200 shadow-sm transition-transform hover:scale-[1.01]">
          <span className="text-zinc-400 text-[9px] font-black uppercase tracking-[0.2em] block mb-4">Active Rivals</span>
          <span className="text-4xl font-black text-black tracking-tighter">{MOCK_COMPETITORS.length}</span>
          <div className="mt-2 flex flex-wrap gap-1">
            {MOCK_COMPETITORS.map(comp => (
              <span key={comp.name} className="px-2 py-0.5 bg-zinc-900 text-white rounded text-[8px] font-black uppercase tracking-widest">{comp.name}</span>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white p-8 rounded-[2.5rem] border border-zinc-200 shadow-sm">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h3 className="text-xl font-black text-black tracking-tight">AcmeCloud Core Data</h3>
            <p className="text-[9px] text-zinc-400 font-black uppercase tracking-[0.2em] mt-1">Independent performance history</p>
          </div>
          <select 
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="bg-zinc-50 border border-zinc-200 rounded-xl px-4 py-2 text-[9px] font-black uppercase tracking-widest focus:ring-1 focus:ring-black outline-none cursor-pointer"
          >
            <option value="1W">1 Week</option>
            <option value="1M">1 Month</option>
          </select>
        </div>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={soloBrandData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f1f1" />
              <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{fill: '#a1a1aa', fontSize: 9, fontWeight: 800}} dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={{fill: '#a1a1aa', fontSize: 9, fontWeight: 800}} />
              <Tooltip 
                contentStyle={{borderRadius: '12px', border: '1px solid #e5e7eb', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}}
              />
              <Area 
                type="monotone" 
                dataKey="score" 
                stroke="#000" 
                strokeWidth={2} 
                fill="#f4f4f5" 
                dot={{ r: 3, fill: '#000', stroke: '#fff', strokeWidth: 1 }}
                activeDot={{ r: 5, fill: '#000', stroke: '#fff', strokeWidth: 2 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-8 rounded-[2.5rem] border border-zinc-200 shadow-sm">
          <h3 className="text-xl font-black text-black tracking-tight mb-8">Competitive Matrix</h3>
          <div className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={competitiveData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f1f1" />
                <XAxis dataKey="date" hide />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#a1a1aa', fontSize: 9, fontWeight: 800}} />
                <Tooltip contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}} />
                <Legend iconType="circle" />
                <Area type="monotone" dataKey="myBrand" stroke="#000" strokeWidth={2} fill="transparent" name="AcmeCloud" dot={{r: 2}} />
                <Area type="monotone" dataKey="competitorA" stroke="#6b7280" strokeWidth={2} fill="transparent" name="CloudBox" dot={{r: 2}} />
                <Area type="monotone" dataKey="competitorB" stroke="#9ca3af" strokeWidth={2} fill="transparent" name="ServerLess" dot={{r: 2}} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-8 rounded-[2.5rem] border border-zinc-200 shadow-sm">
          <h3 className="text-xl font-black text-black tracking-tight mb-8">Sentiment Weight</h3>
          <div className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={sentimentData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={85}
                  paddingAngle={5}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}%`}
                >
                  {sentimentData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.fill} stroke="none" />)}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-[2.5rem] border border-zinc-200 shadow-sm overflow-hidden">
        <div className="p-8 border-b border-zinc-100 flex items-center justify-between bg-zinc-50/50">
          <h3 className="text-xl font-black text-black tracking-tight uppercase">Engine Prompt Audit</h3>
          <span className="px-3 py-1 bg-black text-white rounded-lg text-[8px] font-black uppercase tracking-widest">{MOCK_AI_AUDITS.length} Logs</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-white text-zinc-400 uppercase text-[8px] font-black tracking-[0.2em] border-b border-zinc-100">
              <tr>
                <th className="px-8 py-4">AI Engine</th>
                <th className="px-8 py-4">Prompt</th>
                <th className="px-8 py-4">Sentiment</th>
                <th className="px-8 py-4">Timestamp</th>
                <th className="px-8 py-4 text-right">View</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100">
              {MOCK_AI_AUDITS.map((audit) => (
                <tr key={audit.id} className="group hover:bg-zinc-50 transition-all cursor-pointer" onClick={() => setSelectedAudit(audit)}>
                  <td className="px-8 py-5 text-[10px] font-black text-black uppercase">{audit.engine}</td>
                  <td className="px-8 py-5 text-[10px] font-bold text-zinc-500 max-w-xs truncate">{audit.prompt}</td>
                  <td className="px-8 py-5">
                    <span className={`px-2 py-0.5 rounded text-[8px] font-black uppercase ${audit.sentiment === Sentiment.POSITIVE ? 'bg-zinc-900 text-white' : 'bg-zinc-100 text-zinc-500'}`}>{audit.sentiment}</span>
                  </td>
                  <td className="px-8 py-5 text-[9px] font-black text-zinc-400 uppercase">{audit.timestamp}</td>
                  <td className="px-8 py-5 text-right"><svg className="w-4 h-4 ml-auto text-zinc-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {selectedAudit && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/40 backdrop-blur-sm transition-all">
          <div className="bg-white w-full max-w-2xl rounded-[2.5rem] shadow-2xl border border-zinc-200 overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="p-8 border-b border-zinc-100 bg-zinc-50/50 flex items-center justify-between">
              <h4 className="text-xl font-black text-black uppercase">Audit Report</h4>
              <button onClick={() => setSelectedAudit(null)} className="p-2 bg-white border border-zinc-200 rounded-full hover:bg-black hover:text-white transition-all"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg></button>
            </div>
            <div className="p-8 space-y-6">
              <p className="text-[8px] font-black text-zinc-400 uppercase tracking-widest">Neural Response Output</p>
              <div className="p-6 bg-zinc-900 text-white rounded-2xl text-sm leading-relaxed font-medium">"{selectedAudit.response}"</div>
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-zinc-100">
                <div><p className="text-[8px] font-black text-zinc-400 uppercase">Engine</p><p className="text-xs font-black">{selectedAudit.engine}</p></div>
                <div><p className="text-[8px] font-black text-zinc-400 uppercase">Timestamp</p><p className="text-xs font-black">{selectedAudit.timestamp}</p></div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
