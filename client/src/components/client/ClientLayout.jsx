import React, { useState } from 'react';
import { 
  Home, 
  Search, 
  Bookmark, 
  Bell, 
  TrendingUp, 
  HelpCircle, 
  Settings, 
  User, 
  LogOut, 
  ChevronDown, 
  Menu, 
  X,
  Compass,
  ShoppingBag,
  Sparkles,
  Store
} from 'lucide-react';

export default function ClientLayout({
  user,
  activeTab,
  setActiveTab,
  searchQuery,
  onSearchChange,
  savedCount,
  activeAlertsCount,
  notifications,
  onLogout,
  onNavigateHome,
  onOpenNotifications,
  children
}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'discover', label: 'Discover Deals', icon: Search },
    { id: 'saved', label: 'Saved Deals', icon: Bookmark, badge: savedCount },
    { id: 'alerts', label: 'Price Alerts', icon: Bell, badge: activeAlertsCount },
    { id: 'savings', label: 'My Savings', icon: TrendingUp }
  ];

  const unreadNotifCount = notifications.filter(n => n.unread).length;

  return (
    <div className="min-h-screen bg-[#0a0a0c] text-neutral-100 flex flex-col font-sans selection:bg-white selection:text-black">
      
      {/* Fixed Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col justify-between w-64 fixed inset-y-0 left-0 bg-neutral-950 border-r border-neutral-850 p-5 z-30">
        
        {/* Top: Brand & Main Navigation */}
        <div className="space-y-7">
          
          {/* Brand Logo */}
          <div 
            onClick={onNavigateHome}
            className="flex items-center space-x-3 cursor-pointer group"
          >
            <div className="w-9 h-9 rounded-xl bg-white text-black flex items-center justify-center font-bold text-sm shadow-sm group-hover:bg-neutral-200 transition-colors">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <div className="text-base font-bold text-white tracking-tight flex items-center space-x-1.5">
                <span>DealPilot</span>
                <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-neutral-900 border border-neutral-800 text-neutral-400">
                  AI
                </span>
              </div>
              <p className="text-[10px] text-neutral-500 font-medium">
                Shopper Experience
              </p>
            </div>
          </div>

          {/* Nav List */}
          <nav className="space-y-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                  }}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-neutral-900 text-white border border-neutral-800 shadow-sm'
                      : 'text-neutral-400 hover:text-white hover:bg-neutral-900/50'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-neutral-400'}`} />
                    <span>{item.label}</span>
                  </div>

                  {item.badge !== undefined && item.badge > 0 && (
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      isActive ? 'bg-white text-black' : 'bg-neutral-900 border border-neutral-800 text-neutral-400'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

        </div>

        {/* Bottom Section: Help, Settings & User */}
        <div className="space-y-3 pt-4 border-t border-neutral-850">
          
          <div className="space-y-1">
            <button
              onClick={() => setIsHelpOpen(true)}
              className="w-full flex items-center space-x-3 px-3.5 py-2 rounded-xl text-xs font-medium text-neutral-400 hover:text-white hover:bg-neutral-900/50 transition-colors"
            >
              <HelpCircle className="w-4 h-4" />
              <span>Help & Support</span>
            </button>

            <button
              onClick={() => setIsSettingsOpen(true)}
              className="w-full flex items-center space-x-3 px-3.5 py-2 rounded-xl text-xs font-medium text-neutral-400 hover:text-white hover:bg-neutral-900/50 transition-colors"
            >
              <Settings className="w-4 h-4" />
              <span>Settings</span>
            </button>
          </div>

          {/* User Profile Box */}
          <div className="p-2.5 rounded-2xl bg-neutral-900/80 border border-neutral-800 flex items-center justify-between">
            <div className="flex items-center space-x-2.5 min-w-0">
              <div className="w-8 h-8 rounded-full bg-neutral-800 border border-neutral-700 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                {user?.name ? user.name.charAt(0).toUpperCase() : 'C'}
              </div>
              <div className="min-w-0">
                <div className="text-xs font-bold text-white truncate">
                  {user?.name || 'Customer'}
                </div>
                <div className="text-[10px] text-neutral-500 truncate">
                  {user?.email || 'client@dealpilot.ai'}
                </div>
              </div>
            </div>

            <button
              onClick={onLogout}
              className="p-1.5 rounded-lg text-neutral-500 hover:text-red-400 hover:bg-neutral-800 transition-colors"
              title="Sign Out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>

        </div>

      </aside>

      {/* Main Content Area (offset by fixed sidebar on lg) */}
      <div className="lg:pl-64 flex flex-col flex-1 min-w-0">
        
        {/* Top Navbar */}
        <header className="sticky top-0 z-40 bg-neutral-950/90 backdrop-blur-md border-b border-neutral-850 px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          
          {/* Left: Mobile Hamburger & Search Bar */}
          <div className="flex items-center space-x-3 flex-1 max-w-xl">
            
            {/* Mobile menu trigger */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden p-2 rounded-xl bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white transition-colors"
            >
              <Menu className="w-5 h-5" />
            </button>

            {/* Global Search Input */}
            <div className="relative w-full">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-500">
                <Search className="w-4 h-4" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  onSearchChange(e.target.value);
                  if (activeTab !== 'discover' && e.target.value.trim()) {
                    setActiveTab('discover');
                  }
                }}
                placeholder="Search products, brands or stores..."
                className="w-full pl-10 pr-4 py-2 rounded-xl bg-neutral-900 border border-neutral-800 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-neutral-600 transition-colors"
              />
            </div>
          </div>

          {/* Right Action Icons & User Dropdown */}
          <div className="flex items-center space-x-3">
            
            {/* Saved Deals Quick Icon */}
            <button
              onClick={() => setActiveTab('saved')}
              className="p-2 rounded-xl bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white transition-colors relative"
              title="Saved Deals"
            >
              <Bookmark className="w-4 h-4" />
              {savedCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-white text-black font-mono font-bold text-[10px] flex items-center justify-center">
                  {savedCount}
                </span>
              )}
            </button>

            {/* Notification Bell with Badge */}
            <div className="relative">
              <button
                onClick={onOpenNotifications}
                className="p-2 rounded-xl bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white transition-colors relative"
                title="Notifications"
              >
                <Bell className="w-4 h-4" />
                {unreadNotifCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 text-black font-bold text-[10px] flex items-center justify-center">
                    {unreadNotifCount}
                  </span>
                )}
              </button>
            </div>

            {/* User Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center space-x-2 pl-2 pr-2.5 py-1.5 rounded-xl bg-neutral-900 border border-neutral-800 hover:border-neutral-700 text-xs font-semibold text-white transition-colors"
              >
                <div className="w-6 h-6 rounded-full bg-white text-black flex items-center justify-center text-[11px] font-bold">
                  {user?.name ? user.name.charAt(0).toUpperCase() : 'C'}
                </div>
                <span className="hidden sm:inline text-xs font-medium">{user?.name || 'Customer'}</span>
                <ChevronDown className="w-3.5 h-3.5 text-neutral-400" />
              </button>

              {/* User Dropdown Menu */}
              {isUserMenuOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setIsUserMenuOpen(false)} />
                  <div className="absolute right-0 mt-2 w-52 rounded-2xl bg-neutral-900 border border-neutral-800 shadow-2xl p-2 z-50 text-xs space-y-1">
                    <div className="p-2 border-b border-neutral-800 text-neutral-400 text-[11px]">
                      Signed in as <strong className="text-white block truncate">{user?.email || 'customer@dealpilot.ai'}</strong>
                    </div>
                    <button
                      onClick={() => {
                        setIsUserMenuOpen(false);
                        setActiveTab('savings');
                      }}
                      className="w-full text-left px-3 py-2 rounded-xl hover:bg-neutral-800 text-neutral-300 hover:text-white transition-colors"
                    >
                      My Savings Ledger
                    </button>
                    <button
                      onClick={() => {
                        setIsUserMenuOpen(false);
                        setIsSettingsOpen(true);
                      }}
                      className="w-full text-left px-3 py-2 rounded-xl hover:bg-neutral-800 text-neutral-300 hover:text-white transition-colors"
                    >
                      Settings & Preferences
                    </button>
                    <button
                      onClick={() => {
                        setIsUserMenuOpen(false);
                        onNavigateHome();
                      }}
                      className="w-full text-left px-3 py-2 rounded-xl hover:bg-neutral-800 text-neutral-300 hover:text-white transition-colors"
                    >
                      Public Website Home
                    </button>
                    <div className="pt-1 border-t border-neutral-800">
                      <button
                        onClick={onLogout}
                        className="w-full text-left px-3 py-2 rounded-xl hover:bg-red-500/10 text-red-400 transition-colors flex items-center space-x-1.5"
                      >
                        <LogOut className="w-3.5 h-3.5" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>

          </div>

        </header>

        {/* Dynamic Main Body Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {children}
        </main>

      </div>

      {/* Mobile Drawer Navigation */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div 
            className="fixed inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div className="relative w-72 max-w-[80vw] bg-neutral-950 border-r border-neutral-800 p-5 flex flex-col justify-between z-50 animate-in slide-in-from-left duration-200">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2.5">
                  <div className="w-8 h-8 rounded-xl bg-white text-black flex items-center justify-center font-bold">
                    <ShoppingBag className="w-4 h-4" />
                  </div>
                  <span className="font-bold text-white text-base">DealPilot AI</span>
                </div>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-1.5 rounded-lg text-neutral-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <nav className="space-y-1">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        setActiveTab(item.id);
                        setIsMobileMenuOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold ${
                        isActive ? 'bg-neutral-900 text-white' : 'text-neutral-400 hover:text-white'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <Icon className="w-4 h-4" />
                        <span>{item.label}</span>
                      </div>
                      {item.badge !== undefined && item.badge > 0 && (
                        <span className="px-2 py-0.5 rounded-full text-[10px] bg-neutral-900 text-white">
                          {item.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </nav>
            </div>

            <div className="pt-4 border-t border-neutral-850 space-y-2">
              <button
                onClick={onLogout}
                className="w-full py-2 px-3 rounded-xl bg-neutral-900 text-neutral-400 hover:text-white text-xs font-semibold flex items-center space-x-2"
              >
                <LogOut className="w-4 h-4" />
                <span>Log Out</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Help & Support Modal */}
      {isHelpOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="bg-neutral-900 border border-neutral-800 rounded-2xl max-w-md w-full p-6 text-white space-y-4 shadow-2xl relative">
            <button
              onClick={() => setIsHelpOpen(false)}
              className="absolute top-4 right-4 p-1 rounded-lg text-neutral-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
            <div className="flex items-center space-x-2 text-xs font-semibold text-neutral-400">
              <HelpCircle className="w-4 h-4 text-white" />
              <span>DealPilot Concierge</span>
            </div>
            <h3 className="text-lg font-bold text-white">Help & Support</h3>
            <div className="text-xs text-neutral-300 space-y-2 leading-relaxed">
              <p>
                DealPilot AI operates as your quiet shopping companion, tracking retail prices 24/7 across Amazon, Flipkart, Croma, and direct brands.
              </p>
              <div className="p-3 rounded-xl bg-neutral-950 border border-neutral-800 space-y-1">
                <div className="font-semibold text-white">Need personal assistance?</div>
                <div className="text-neutral-400">Email: support@dealpilot.ai</div>
                <div className="text-neutral-400">Live Hours: 9:00 AM – 9:00 PM IST</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Settings Modal */}
      {isSettingsOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="bg-neutral-900 border border-neutral-800 rounded-2xl max-w-md w-full p-6 text-white space-y-4 shadow-2xl relative">
            <button
              onClick={() => setIsSettingsOpen(false)}
              className="absolute top-4 right-4 p-1 rounded-lg text-neutral-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
            <div className="flex items-center space-x-2 text-xs font-semibold text-neutral-400">
              <Settings className="w-4 h-4 text-white" />
              <span>Client Preferences</span>
            </div>
            <h3 className="text-lg font-bold text-white">Dashboard Settings</h3>
            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-neutral-400 mb-1">Currency</label>
                <select className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-white">
                  <option>INR (₹) - Indian Rupee</option>
                  <option>USD ($) - US Dollar</option>
                </select>
              </div>
              <div>
                <label className="block text-neutral-400 mb-1">Price Drop Sensitivity</label>
                <select className="w-full px-3 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-white">
                  <option>Alert on 5%+ price drops (Recommended)</option>
                  <option>Alert on 10%+ price drops only</option>
                  <option>Alert on any price drop</option>
                </select>
              </div>
            </div>
            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setIsSettingsOpen(false)}
                className="px-4 py-2 rounded-xl bg-white text-black font-bold text-xs hover:bg-neutral-200 transition-colors"
              >
                Save Preferences
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
