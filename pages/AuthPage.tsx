
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface AuthPageProps {
  onLogin: () => void;
}

const AuthPage: React.FC<AuthPageProps> = ({ onLogin }) => {
  const [mode, setMode] = useState<'login' | 'signup' | 'forgot'>('login');
  const [formData, setFormData] = useState({ email: '', password: '', fullName: '' });
  const [isRecovering, setIsRecovering] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (mode === 'forgot') {
      setIsRecovering(true);
      // Simulate API call for password reset
      setTimeout(() => {
        alert(`Access recovery protocols initiated for ${formData.email}. Check your corporate inbox for the decryption link.`);
        setIsRecovering(false);
        setMode('login');
      }, 1500);
      return;
    }

    // Store the user name for display in the layout
    const nameToStore = mode === 'signup' ? formData.fullName : (formData.email.split('@')[0] || 'User');
    localStorage.setItem('lodestone_user_name', nameToStore);
    onLogin();
    navigate('/app');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-10 animate-in fade-in duration-500">
      <div className="max-w-xl w-full">
        <div className="text-center mb-16">
          <div className="text-4xl font-black text-black tracking-tighter inline-block mb-8 uppercase">Prompt Zero</div>
          <h2 className="text-4xl font-black text-black tracking-tight uppercase">
            {mode === 'login' && 'Authentication Required'}
            {mode === 'signup' && 'Initialize Account'}
            {mode === 'forgot' && 'Reset Access Key'}
          </h2>
          <p className="text-zinc-500 mt-3 font-medium">
            {mode === 'forgot' 
              ? 'Initiate neural handshake for credential recovery.' 
              : 'Access the brand intelligence terminal.'}
          </p>
        </div>

        {/* Auth Selector - Hidden in forgot mode */}
        {mode !== 'forgot' && (
          <div className="bg-zinc-50 p-2 rounded-2xl border border-zinc-200 flex mb-12">
            <button 
              type="button"
              onClick={() => setMode('login')}
              className={`flex-1 py-4 text-xs font-black uppercase tracking-widest rounded-xl transition-all ${mode === 'login' ? 'bg-black text-white shadow-xl shadow-zinc-300' : 'text-zinc-400 hover:text-black'}`}
            >
              Login
            </button>
            <button 
              type="button"
              onClick={() => setMode('signup')}
              className={`flex-1 py-4 text-xs font-black uppercase tracking-widest rounded-xl transition-all ${mode === 'signup' ? 'bg-black text-white shadow-xl shadow-zinc-300' : 'text-zinc-400 hover:text-black'}`}
            >
              Sign Up
            </button>
          </div>
        )}

        {/* Main Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {mode === 'signup' && (
            <div className="space-y-2">
              <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Full Name</label>
              <input 
                name="fullName"
                type="text" 
                required
                value={formData.fullName}
                onChange={handleChange}
                className="w-full px-6 py-4 bg-zinc-50 border border-zinc-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-black focus:bg-white transition-all text-black font-medium"
                placeholder="Identity Reference"
              />
            </div>
          )}
          
          <div className="space-y-2">
            <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Corporate Email</label>
            <input 
              name="email"
              type="email" 
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full px-6 py-4 bg-zinc-50 border border-zinc-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-black focus:bg-white transition-all text-black font-medium"
              placeholder="name@enterprise.io"
            />
          </div>

          {mode !== 'forgot' && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Access Key</label>
                {mode === 'login' && (
                  <button 
                    type="button" 
                    onClick={() => setMode('forgot')}
                    className="text-[10px] font-black text-zinc-400 hover:text-black uppercase tracking-widest transition-colors"
                  >
                    Forgot Key?
                  </button>
                )}
              </div>
              <input 
                name="password"
                type="password" 
                required
                value={formData.password}
                onChange={handleChange}
                className="w-full px-6 py-4 bg-zinc-50 border border-zinc-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-black focus:bg-white transition-all text-black font-medium"
                placeholder="••••••••"
              />
            </div>
          )}

          <button 
            type="submit" 
            disabled={isRecovering}
            className="w-full py-5 bg-black text-white rounded-2xl font-black text-xl hover:bg-zinc-800 transition-all shadow-3xl shadow-zinc-400 mt-10 disabled:bg-zinc-400"
          >
            {isRecovering ? 'Processing...' : (
              mode === 'login' ? 'Execute Login' : 
              mode === 'signup' ? 'Register Terminal' : 
              'Request Recovery'
            )}
          </button>

          {mode === 'forgot' && (
            <button 
              type="button"
              onClick={() => setMode('login')}
              className="w-full text-[10px] font-black text-zinc-400 hover:text-black uppercase tracking-widest transition-colors mt-4"
            >
              Return to Authentication
            </button>
          )}
        </form>

        {mode !== 'forgot' && (
          <>
            <div className="relative my-12">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-zinc-100"></div></div>
              <div className="relative flex justify-center text-[10px] uppercase font-black">
                <span className="bg-white px-6 text-zinc-300 tracking-[0.5em]">System Sync</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button type="button" className="flex items-center justify-center gap-3 py-4 bg-white border border-zinc-200 rounded-2xl hover:bg-zinc-50 transition-all font-black text-[10px] uppercase tracking-widest text-zinc-600">
                Google SSO
              </button>
              <button type="button" className="flex items-center justify-center gap-3 py-4 bg-white border border-zinc-200 rounded-2xl hover:bg-zinc-50 transition-all font-black text-[10px] uppercase tracking-widest text-zinc-600">
                SAML Auth
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AuthPage;
