
import React, { useEffect, useState, useRef } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';

interface LayoutProps {
  onLogout: () => void;
}

interface UserProfile {
  name: string;
  email: string;
  role: string;
}

const Layout: React.FC<LayoutProps> = ({ onLogout }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState<UserProfile>({
    name: 'Aram62549',
    email: 'aram@promptzero.io',
    role: 'Strategic Director'
  });
  
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  
  const notificationRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const storedName = localStorage.getItem('lodestone_user_name');
    const storedEmail = localStorage.getItem('lodestone_user_email');
    const storedRole = localStorage.getItem('lodestone_user_role');
    
    setUser({
      name: storedName || 'Aram62549',
      email: storedEmail || 'aram@promptzero.io',
      role: storedRole || 'Strategic Director'
    });

    const handleClickOutside = (event: MouseEvent) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setIsNotificationsOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = (e: React.MouseEvent) => {
    e.stopPropagation();
    localStorage.removeItem('lodestone_auth');
    onLogout();
    navigate('/');
  };

  const handleSaveProfile = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const updatedUser = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      role: formData.get('role') as string,
    };
    
    setUser(updatedUser);
    localStorage.setItem('lodestone_user_name', updatedUser.name);
    localStorage.setItem('lodestone_user_email', updatedUser.email);
    localStorage.setItem('lodestone_user_role', updatedUser.role);
    
    setIsEditModalOpen(false);
    setIsProfileOpen(false);
  };

  const navItems = [
    { name: 'Dashboard', path: '/app', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
    { name: 'Prompts', path: '/app/prompts', icon: 'M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z' },
    { name: 'Alerts', path: '/app/alerts', icon: 'M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9' },
    { name: 'Competitors', path: '/app/competitors', icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z' },
    { name: 'Settings', path: '/app/settings', icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924-1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z' },
    { name: 'Billing', path: '/app/billing', icon: 'M3 10h18M7 15h1m4 0h1m-7 4h12a2 2 0 002-2V5a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z' },
  ];

  const notifications = [
    { id: 1, text: 'Competitor CloudBox mentioned in "Best security" query', time: '2m ago', type: 'alert' },
    { id: 2, text: 'Visibility Index improved by 4%', time: '1h ago', type: 'info' },
    { id: 3, text: 'Audit of Gemini Pro completed', time: '5h ago', type: 'info' }
  ];

  return (
    <div className="flex h-screen bg-zinc-50 overflow-hidden text-zinc-900">
      {/* Sidebar */}
      <aside className="w-72 bg-white border-r border-zinc-200 hidden md:flex flex-col">
        <div className="p-8">
          <h1 className="text-2xl font-black text-black tracking-tighter uppercase">Prompt Zero</h1>
        </div>
        <nav className="flex-1 px-6 space-y-2 mt-4">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              end={item.path === '/app'}
              className={({ isActive }) =>
                `flex items-center px-4 py-3.5 text-sm font-semibold rounded-xl transition-all ${
                  isActive
                    ? 'bg-zinc-900 text-white shadow-xl shadow-zinc-200'
                    : 'text-zinc-500 hover:bg-zinc-50 hover:text-black'
                }`
              }
            >
              <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
              </svg>
              {item.name}
            </NavLink>
          ))}
        </nav>
        <div className="p-6 border-t border-zinc-100">
          <button
            onClick={handleLogout}
            className="flex items-center w-full px-4 py-3 text-sm font-semibold text-zinc-500 rounded-xl hover:bg-zinc-900 hover:text-white transition-all group"
          >
            <svg className="w-5 h-5 mr-3 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 11-6 0v-1m6-6V5a3 3 0 00-6 0v1" />
            </svg>
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Header */}
        <header className="h-20 bg-white border-b border-zinc-200 flex items-center justify-between px-10 shrink-0 z-40">
          <div className="flex items-center gap-4">
            <h2 className="text-sm font-black text-zinc-900 uppercase tracking-widest">Project: AcmeCloud Core</h2>
            <div className="h-4 w-px bg-zinc-200"></div>
            <span className="text-xs font-bold text-zinc-400 uppercase tracking-tight">System: Zero-Alpha</span>
          </div>
          <div className="flex items-center gap-6">
            <div className="relative" ref={notificationRef}>
              <button 
                type="button"
                onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                className={`p-2.5 rounded-full transition-all relative ${isNotificationsOpen ? 'bg-zinc-900 text-white' : 'text-zinc-400 hover:text-black hover:bg-zinc-50'}`}
              >
                <span className="absolute top-2.5 right-2.5 h-2 w-2 bg-rose-500 rounded-full border-2 border-white animate-pulse"></span>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
              </button>

              {isNotificationsOpen && (
                <div className="absolute top-full right-0 mt-2 w-80 bg-white border border-zinc-200 rounded-[2rem] shadow-2xl z-[100] overflow-hidden animate-in slide-in-from-top-2 duration-200">
                  <div className="px-6 py-4 border-b border-zinc-100 bg-zinc-50/50 flex items-center justify-between">
                    <h3 className="text-[10px] font-black uppercase tracking-widest text-black">Audit Signals</h3>
                    <button onClick={() => setIsNotificationsOpen(false)} className="text-[8px] font-black uppercase text-zinc-400 hover:text-black transition-colors">Dismiss</button>
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    {notifications.map((n) => (
                      <div key={n.id} className="px-6 py-4 border-b border-zinc-50 last:border-0 hover:bg-zinc-50 transition-colors cursor-pointer group">
                        <p className="text-[11px] font-bold text-zinc-800 leading-snug group-hover:text-black">{n.text}</p>
                        <span className="text-[8px] font-black text-zinc-400 uppercase mt-2 block">{n.time}</span>
                      </div>
                    ))}
                  </div>
                  <NavLink to="/app/alerts" onClick={() => setIsNotificationsOpen(false)} className="block w-full text-center py-4 bg-black text-[9px] font-black uppercase tracking-[0.2em] text-white hover:bg-zinc-800 transition-all">
                    Access Incident Ledger
                  </NavLink>
                </div>
              )}
            </div>

            <div className="relative" ref={profileRef}>
              <div 
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center gap-3 cursor-pointer group hover:opacity-80 transition-all"
              >
                 <div className="text-right hidden sm:block">
                    <p className="text-xs font-black text-black leading-none">{user.name}</p>
                    <p className="text-[10px] text-zinc-400 font-bold mt-1 uppercase tracking-widest">Authorized Node</p>
                 </div>
                 <div className="h-10 w-10 rounded-xl bg-black flex items-center justify-center text-white font-black text-sm uppercase shadow-lg shadow-zinc-200 transition-transform group-hover:scale-105">
                   {user.name.substring(0, 2)}
                 </div>
              </div>

              {isProfileOpen && (
                <div className="absolute top-full right-0 mt-2 w-72 bg-white border border-zinc-200 rounded-[2.5rem] shadow-2xl z-[100] overflow-hidden animate-in zoom-in-95 duration-200">
                   <div className="p-10 text-center bg-zinc-50/50 border-b border-zinc-100">
                      <div className="h-20 w-20 bg-black text-white rounded-[1.5rem] flex items-center justify-center text-3xl font-black mx-auto mb-6 uppercase shadow-2xl shadow-zinc-300">
                        {user.name.substring(0, 2)}
                      </div>
                      <h4 className="text-lg font-black text-black uppercase tracking-tight">{user.name}</h4>
                      <p className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.2em] mt-2">{user.role}</p>
                   </div>
                   <div className="p-6 space-y-2">
                      <button 
                        type="button"
                        onClick={() => setIsEditModalOpen(true)}
                        className="w-full flex items-center gap-4 px-5 py-4 rounded-2xl text-[11px] font-black uppercase tracking-widest text-zinc-600 hover:bg-zinc-900 hover:text-white transition-all text-left group"
                      >
                         <svg className="w-5 h-5 transition-transform group-hover:rotate-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                         Edit Profile
                      </button>
                      <div className="h-px bg-zinc-100 my-4 mx-2"></div>
                      <button 
                        type="button"
                        onClick={handleLogout}
                        className="w-full flex items-center gap-4 px-5 py-4 rounded-2xl text-[11px] font-black uppercase tracking-widest text-rose-600 hover:bg-rose-600 hover:text-white transition-all text-left shadow-rose-100"
                      >
                         <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 11-6 0v-1m6-6V5a3 3 0 00-6 0v1" /></svg>
                         Logout
                      </button>
                   </div>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Edit Profile Modal */}
        {isEditModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/60 backdrop-blur-md animate-in fade-in duration-300">
            <div className="bg-white w-full max-w-lg rounded-[3rem] shadow-3xl border border-zinc-200 overflow-hidden animate-in zoom-in-95 duration-200">
              <div className="p-10 border-b border-zinc-100 bg-zinc-50/50 flex items-center justify-between">
                <div>
                  <h4 className="text-2xl font-black text-black uppercase tracking-tight">Identity Access</h4>
                  <p className="text-[10px] font-black text-zinc-400 uppercase mt-2 tracking-widest">Update Authorized Node Parameters</p>
                </div>
                <button 
                  onClick={() => setIsEditModalOpen(false)} 
                  className="p-3 bg-white border border-zinc-200 rounded-full hover:bg-black hover:text-white transition-all shadow-xl shadow-zinc-200"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              </div>
              <form onSubmit={handleSaveProfile} className="p-10 space-y-8">
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Display Name</label>
                  <input 
                    name="name"
                    type="text" 
                    defaultValue={user.name}
                    required
                    className="w-full px-6 py-4 bg-zinc-50 border border-zinc-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-black focus:bg-white transition-all text-black font-black text-sm"
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Corporate Email</label>
                  <input 
                    name="email"
                    type="email" 
                    defaultValue={user.email}
                    required
                    className="w-full px-6 py-4 bg-zinc-50 border border-zinc-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-black focus:bg-white transition-all text-black font-black text-sm"
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Strategic Role</label>
                  <select 
                    name="role"
                    defaultValue={user.role}
                    className="w-full px-6 py-4 bg-zinc-50 border border-zinc-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-black focus:bg-white transition-all text-black font-black text-sm uppercase"
                  >
                    <option value="Strategic Director">Strategic Director</option>
                    <option value="AI Ops Manager">AI Ops Manager</option>
                    <option value="Brand Analyst">Brand Analyst</option>
                    <option value="Compliance Officer">Compliance Officer</option>
                  </select>
                </div>
                <button 
                  type="submit"
                  className="w-full py-6 bg-black text-white rounded-[2rem] font-black uppercase text-xs tracking-[0.2em] shadow-2xl shadow-zinc-400 hover:bg-zinc-800 transition-all mt-6 active:scale-95"
                >
                  Confirm Identity Update
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Dynamic Route Content */}
        <main className="flex-1 overflow-y-auto p-10 bg-zinc-50/30">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
