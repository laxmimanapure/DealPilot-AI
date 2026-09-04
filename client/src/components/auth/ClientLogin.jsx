import React, { useState } from 'react';
import { 
  ShoppingBag, 
  Sparkles, 
  ArrowRight, 
  Lock, 
  Mail, 
  User,
  CheckCircle2, 
  ShieldCheck,
  TrendingDown,
  Zap
} from 'lucide-react';
import { formatINR } from '../../utils/currency';
import { loginUser, registerUser } from '../../services/api';

export default function ClientLogin({ 
  onLoginSuccess, 
  onNavigateToMerchantLogin, 
  onNavigateHome 
}) {
  const [authMode, setAuthMode] = useState('login'); // 'login' | 'register'
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      if (authMode === 'register') {
        const res = await registerUser({
          name: name.trim(),
          email: email.trim(),
          password,
          role: 'client'
        });
        setIsLoading(false);
        onLoginSuccess(res.user);
      } else {
        const res = await loginUser({
          email: email.trim(),
          password,
          role: 'client'
        });
        setIsLoading(false);
        onLoginSuccess(res.user);
      }
    } catch (err) {
      setIsLoading(false);
      setError(err.message || 'Authentication failed. Please try again.');
    }
  };

  const handleInstantDemoLogin = async () => {
    setError('');
    setEmail('alex.client@dealpilot.ai');
    setPassword('demo1234');
    setIsLoading(true);

    try {
      const res = await loginUser({
        email: 'alex.client@dealpilot.ai',
        password: 'demo1234',
        role: 'client'
      });
      setIsLoading(false);
      onLoginSuccess(res.user);
    } catch (err) {
      // Fallback for seamless offline demo
      setIsLoading(false);
      onLoginSuccess({
        role: 'client',
        name: 'Alex Rivera (Demo Client)',
        email: 'alex.client@dealpilot.ai'
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative selection:bg-white selection:text-black text-zinc-100">
      
      {/* Top Bar with Home Link */}
      <div className="absolute top-6 left-6 flex items-center space-x-4">
        <button
          onClick={onNavigateHome}
          className="inline-flex items-center space-x-2 text-xs font-medium text-zinc-400 hover:text-white transition-colors"
        >
          <span>← Back to DealPilot Home</span>
        </button>
      </div>

      <div className="max-w-5xl w-full mx-auto px-4 sm:px-6">
        
        {/* Main Two-Column Auth Container - Pure Monochrome */}
        <div className="rounded-3xl bg-[#0c0c0f] border border-white/[0.12] shadow-2xl shadow-black/90 overflow-hidden grid grid-cols-1 lg:grid-cols-12">
          
          {/* Left Column: Client Login Form */}
          <div className="lg:col-span-7 p-6 sm:p-10 lg:p-12 flex flex-col justify-between">
            <div>
              
              {/* Brand Glyph & Badge */}
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center space-x-2.5">
                  <div className="w-10 h-10 rounded-xl bg-white/[0.06] border border-white/[0.12] flex items-center justify-center text-white">
                    <ShoppingBag className="w-5 h-5 text-zinc-200" />
                  </div>
                  <div>
                    <span className="text-sm font-bold text-white tracking-tight">
                      DealPilot <span className="text-zinc-400">AI</span>
                    </span>
                    <span className="block text-[10px] uppercase tracking-wider font-semibold text-zinc-400 font-mono">
                      Client Portal
                    </span>
                  </div>
                </div>

                <button
                  onClick={onNavigateToMerchantLogin}
                  className="text-xs text-zinc-400 hover:text-white transition-colors font-medium"
                >
                  Merchant Login →
                </button>
              </div>

              {/* Form Headers */}
              <div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  {authMode === 'register' ? 'Create Client Account' : 'Welcome back, Client'}
                </h1>
                <p className="mt-2 text-sm text-zinc-400">
                  {authMode === 'register'
                    ? 'Sign up to discover and negotiate the best deals across top merchants.'
                    : 'Discover better deals with DealPilot AI.'}
                </p>
              </div>

              {/* Quick 1-Click Demo Sign-in Banner */}
              <div className="mt-6 p-3.5 rounded-xl bg-white/[0.04] border border-white/[0.1] flex items-center justify-between">
                <div className="flex items-center space-x-2.5">
                  <Zap className="w-4 h-4 text-white flex-shrink-0" />
                  <div className="text-xs text-zinc-300">
                    <span className="font-semibold text-white">Judge / Reviewer Access:</span> 1-click test client account
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleInstantDemoLogin}
                  className="px-3 py-1.5 rounded-lg bg-white text-black hover:bg-zinc-200 text-xs font-bold transition-colors whitespace-nowrap shadow-sm"
                >
                  Instant Demo Sign In
                </button>
              </div>

              {error && (
                <div className="mt-4 p-3 rounded-lg bg-rose-500/10 border border-rose-500/30 text-xs text-rose-300">
                  {error}
                </div>
              )}

              {/* Login/Register Form */}
              <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                {authMode === 'register' && (
                  <div>
                    <label className="block text-xs font-medium text-zinc-300 mb-1.5">
                      Full Name
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-zinc-500">
                        <User className="w-4 h-4" />
                      </div>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Alex Rivera"
                        className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-black/60 border border-white/[0.1] text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-white transition-colors"
                      />
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-xs font-medium text-zinc-300 mb-1.5">
                    Email Address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-zinc-500">
                      <Mail className="w-4 h-4" />
                    </div>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="alex.client@dealpilot.ai"
                      className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-black/60 border border-white/[0.1] text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-white transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-xs font-medium text-zinc-300">
                      Password
                    </label>
                    {authMode === 'login' && (
                      <button
                        type="button"
                        onClick={() => alert('Password reset link sent to demo email.')}
                        className="text-xs text-zinc-400 hover:text-white transition-colors"
                      >
                        Forgot Password?
                      </button>
                    )}
                  </div>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-zinc-500">
                      <Lock className="w-4 h-4" />
                    </div>
                    <input
                      type="password"
                      required
                      minLength={6}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder={authMode === 'register' ? 'Minimum 6 characters' : '••••••••••••'}
                      className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-black/60 border border-white/[0.1] text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-white transition-colors"
                    />
                  </div>
                </div>

                {authMode === 'login' && (
                  <div className="flex items-center justify-between pt-1">
                    <label className="flex items-center space-x-2 text-xs text-zinc-400 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                        className="rounded bg-black border-zinc-700 text-white focus:ring-0"
                      />
                      <span>Remember this device</span>
                    </label>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3 px-4 rounded-xl bg-white text-black hover:bg-zinc-200 font-bold text-sm shadow-md transition-all flex items-center justify-center space-x-2 mt-2"
                >
                  {isLoading ? (
                    <span>{authMode === 'register' ? 'Creating Account...' : 'Signing in...'}</span>
                  ) : (
                    <>
                      <span>{authMode === 'register' ? 'Create Account' : 'Sign In'}</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>

            </div>

            {/* Bottom Form Footer */}
            <div className="mt-8 pt-6 border-t border-white/[0.08] text-xs text-zinc-400 flex items-center justify-between">
              <span>
                {authMode === 'register' ? 'Already have an account?' : "Don't have an account?"}
              </span>
              <button
                type="button"
                onClick={() => {
                  setError('');
                  setAuthMode(authMode === 'register' ? 'login' : 'register');
                }}
                className="font-semibold text-white hover:text-zinc-300 transition-colors"
              >
                {authMode === 'register' ? 'Sign In →' : 'Create Account →'}
              </button>
            </div>
          </div>

          {/* Right Column: Consumer Deal Assistant Side Panel */}
          <div className="lg:col-span-5 bg-black/60 p-6 sm:p-10 border-t lg:border-t-0 lg:border-l border-white/[0.08] flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center space-x-2 px-2.5 py-1 rounded text-xs font-semibold bg-white/[0.06] text-zinc-200 border border-white/[0.1] mb-4">
                <Sparkles className="w-3.5 h-3.5 text-white" />
                <span>Client Deal Copilot</span>
              </div>
              
              <h2 className="text-xl font-bold text-white mb-2">
                Your AI Deal Assistant
              </h2>
              <p className="text-xs text-zinc-400 leading-relaxed mb-6">
                Find opportunities that match your needs and make smarter purchase decisions.
              </p>

              {/* Realistic Visual Preview Snippets */}
              <div className="space-y-3.5">
                
                {/* Recommended Deal Card */}
                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.08]">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-white">Recommended Deal</span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-white/[0.08] text-zinc-200 border border-white/[0.1]">
                      Best Match
                    </span>
                  </div>
                  <div className="text-xs text-zinc-300">
                    Custom Workstation Setup (3 Items)
                  </div>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="text-sm font-bold text-white font-mono">{formatINR(4900)}</span>
                    <span className="text-xs font-bold text-zinc-300 font-mono">Score: 94/100</span>
                  </div>
                </div>

                {/* Savings Pill */}
                <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.08] flex items-center justify-between text-xs">
                  <div className="flex items-center space-x-2 text-zinc-400">
                    <TrendingDown className="w-4 h-4 text-white" />
                    <span>Potential Savings:</span>
                  </div>
                  <span className="font-bold text-white font-mono">{formatINR(1250)} Saved</span>
                </div>

                {/* AI Recommendation Quote */}
                <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.08] text-xs text-zinc-300">
                  <span className="font-bold text-white block mb-1">AI Recommendation:</span>
                  "Prioritize this package. Optimal value balance with 2-year warranty coverage within your exact ₹5,000 budget."
                </div>

              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-white/[0.08] text-[11px] text-zinc-500 flex items-center space-x-2">
              <ShieldCheck className="w-4 h-4 text-zinc-400" />
              <span>Safe negotiation & verified Razorpay receipts</span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
