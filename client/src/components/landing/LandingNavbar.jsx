import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  Menu, 
  X, 
  ChevronDown, 
  ShoppingBag, 
  Store, 
  ArrowRight
} from 'lucide-react';

export default function LandingNavbar({ 
  onOpenRoleSelect, 
  onNavigateToClientLogin, 
  onNavigateToMerchantLogin 
}) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [loginDropdownOpen, setLoginDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Product', href: '#product' },
    { name: 'Experiences', href: '#experiences' },
    { name: 'How It Works', href: '#how-it-works' },
  ];

  const handleLinkClick = (e, href) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-4 sm:top-5 left-0 right-0 z-50 px-4 pointer-events-none">
      <div className="max-w-4xl mx-auto pointer-events-auto">
        <div 
          className={`flex items-center justify-between px-4 sm:px-5 py-2.5 rounded-full transition-all duration-300 ${
            isScrolled 
              ? 'bg-[#080808]/85 backdrop-blur-xl border border-white/[0.12] shadow-2xl shadow-black/90' 
              : 'bg-[#080808]/60 backdrop-blur-md border border-white/[0.08] shadow-lg shadow-black/50'
          }`}
        >
          
          {/* Brand Logo & Mark - Pure Monochrome */}
          <a 
            href="#" 
            onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="flex items-center space-x-2.5 group"
          >
            <div className="w-7 h-7 rounded-lg bg-white/[0.08] border border-white/[0.14] flex items-center justify-center text-white group-hover:border-white/40 transition-colors shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-zinc-100" />
            </div>
            <span className="text-sm font-bold tracking-tight text-white">
              DealPilot <span className="text-zinc-400 font-medium">AI</span>
            </span>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1 text-xs">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="px-3.5 py-1.5 rounded-full text-zinc-400 hover:text-white hover:bg-white/[0.05] transition-colors"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden sm:flex items-center space-x-2">
            
            {/* Log In Dropdown */}
            <div className="relative">
              <button
                onClick={() => setLoginDropdownOpen(!loginDropdownOpen)}
                onBlur={() => setTimeout(() => setLoginDropdownOpen(false), 200)}
                className="flex items-center space-x-1.5 px-3 py-1.5 rounded-full text-xs font-medium text-zinc-300 hover:text-white hover:bg-white/[0.06] transition-colors"
                aria-expanded={loginDropdownOpen}
              >
                <span>Log in</span>
                <ChevronDown className={`w-3 h-3 text-zinc-400 transition-transform ${loginDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Minimal Platinum Dropdown */}
              {loginDropdownOpen && (
                <div className="absolute right-0 mt-2 w-52 rounded-2xl bg-[#0e0e11] border border-white/[0.12] shadow-2xl p-1.5 z-50 animate-in fade-in slide-in-from-top-2">
                  <div className="px-3 py-1 text-[10px] font-semibold text-zinc-500 uppercase tracking-wider">
                    Log in as
                  </div>
                  <button
                    onClick={() => { setLoginDropdownOpen(false); onNavigateToClientLogin(); }}
                    className="w-full flex items-center space-x-2.5 px-3 py-2 text-left rounded-xl text-xs text-zinc-200 hover:text-white hover:bg-white/[0.08] transition-colors"
                  >
                    <ShoppingBag className="w-3.5 h-3.5 text-zinc-300" />
                    <div>
                      <div className="font-semibold">Client Login</div>
                      <div className="text-[10px] text-zinc-400">Buyer deal discovery</div>
                    </div>
                  </button>
                  <button
                    onClick={() => { setLoginDropdownOpen(false); onNavigateToMerchantLogin(); }}
                    className="w-full flex items-center space-x-2.5 px-3 py-2 text-left rounded-xl text-xs text-zinc-200 hover:text-white hover:bg-white/[0.08] transition-colors"
                  >
                    <Store className="w-3.5 h-3.5 text-zinc-300" />
                    <div>
                      <div className="font-semibold">Merchant Login</div>
                      <div className="text-[10px] text-zinc-400">Offer management & analytics</div>
                    </div>
                  </button>
                </div>
              )}
            </div>

            {/* Primary CTA - Crisp White with Black Text */}
            <button
              onClick={onOpenRoleSelect}
              className="inline-flex items-center space-x-1.5 bg-white text-black hover:bg-zinc-200 font-semibold px-4 py-1.5 rounded-full text-xs transition-all active:scale-[0.98] shadow-sm"
            >
              <span>Get Started</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          {/* Mobile Menu Trigger */}
          <div className="flex items-center space-x-2 sm:hidden">
            <button
              onClick={onOpenRoleSelect}
              className="bg-white text-black text-xs font-semibold px-3 py-1 rounded-full"
            >
              Get Started
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 rounded-full text-zinc-400 hover:text-white"
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>

        </div>

        {/* Mobile Dropdown Drawer */}
        {mobileMenuOpen && (
          <div className="sm:hidden mt-2 p-4 rounded-3xl bg-[#0a0a0d]/95 backdrop-blur-2xl border border-white/[0.12] shadow-2xl space-y-3 animate-in fade-in slide-in-from-top-2">
            <nav className="space-y-1">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className="block px-3 py-2 rounded-xl text-xs font-medium text-zinc-300 hover:text-white hover:bg-white/[0.05]"
                >
                  {link.name}
                </a>
              ))}
            </nav>
            <div className="pt-2 border-t border-white/[0.08] grid grid-cols-2 gap-2">
              <button
                onClick={() => { setMobileMenuOpen(false); onNavigateToClientLogin(); }}
                className="py-2 px-3 rounded-xl text-xs font-medium bg-white/[0.05] text-zinc-200 border border-white/[0.08] text-center"
              >
                Client Login
              </button>
              <button
                onClick={() => { setMobileMenuOpen(false); onNavigateToMerchantLogin(); }}
                className="py-2 px-3 rounded-xl text-xs font-medium bg-white/[0.05] text-zinc-200 border border-white/[0.08] text-center"
              >
                Merchant Login
              </button>
            </div>
          </div>
        )}

      </div>
    </header>
  );
}
