import React, { useState } from 'react';
import { 
  BarChart3, 
  Tag, 
  Package, 
  ShoppingBag, 
  Sparkles, 
  Sliders, 
  FileText, 
  Activity, 
  Bell, 
  Settings, 
  HelpCircle, 
  User, 
  LogOut, 
  ChevronDown, 
  Menu, 
  X, 
  Calendar,
  CheckCircle2,
  AlertTriangle,
  Building2,
  ExternalLink
} from 'lucide-react';
import { MOCK_BUSINESS_NOTIFICATIONS } from '../../data/mockMerchantData';

export default function MerchantLayout({
  user,
  activeTab,
  setActiveTab,
  timeRange = '30D',
  setTimeRange,
  onLogout,
  onNavigateHome,
  rulesSummary,
  children
}) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isStoreOnline, setIsStoreOnline] = useState(true);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);

  const [notifications, setNotifications] = useState(MOCK_BUSINESS_NOTIFICATIONS);

  // Tab Title & Subtitle Mapping
  const pageMeta = {
    overview: {
      title: 'Business Overview',
      subtitle: "Here's how your business is performing today."
    },
    deals: {
      title: 'Deals & Offers',
      subtitle: 'Manage active customer bundles, discounts, and margin constraints.'
    },
    inventory: {
      title: 'Inventory & Catalog',
      subtitle: 'Track wholesale unit costs, price controls, and live stock velocity.'
    },
    orders: {
      title: 'Orders & Settlements',
      subtitle: 'Real-time ledger of completed customer purchases and merchant payouts.'
    },
    analytics: {
      title: 'Revenue & Sales Analytics',
      subtitle: 'Deep performance metrics, volume trends, and margin analysis.'
    },
    insights: {
      title: 'AI Business Advisor',
      subtitle: 'Algorithmic market intelligence, margin warnings, and growth actions.'
    },
    guardrails: {
      title: 'Policy Guardrails',
      subtitle: 'Autonomous negotiation safety limits and minimum profit margin floors.'
    },
    audit: {
      title: 'Verification Audit Trail',
      subtitle: '100% explainable mathematical log of every negotiation and policy rule.'
    }
  };

  const currentMeta = pageMeta[activeTab] || pageMeta.overview;

  const primaryNav = [
    { id: 'overview', label: 'Overview', icon: Activity },
    { id: 'deals', label: 'Deals & Offers', icon: Tag },
    { id: 'inventory', label: 'Inventory', icon: Package },
    { id: 'orders', label: 'Orders', icon: ShoppingBag },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'insights', label: 'AI Insights', icon: Sparkles }
  ];

  const secondaryNav = [
    { id: 'guardrails', label: 'Policy Guardrails', icon: Sliders },
    { id: 'audit', label: 'Audit Trail', icon: FileText }
  ];

  const unreadCount = notifications.filter(n => n.unread).length;

  return (
    <div className="min-h-screen bg-[#07090e] text-neutral-100 flex flex-col font-sans selection:bg-emerald-500 selection:text-black">
      
      {/* Desktop Fixed Sidebar */}
      <aside className="hidden lg:flex flex-col justify-between w-64 fixed inset-y-0 left-0 bg-[#0c1017] border-r border-white/[0.08] p-5 z-30">
        
        {/* Brand & Main Links */}
        <div className="space-y-6">
          
          {/* Brand Header */}
          <div 
            onClick={onNavigateHome}
            className="flex items-center space-x-3 cursor-pointer group"
          >
            <div className="w-9 h-9 rounded-xl bg-white text-black flex items-center justify-center font-bold text-sm shadow-sm group-hover:bg-neutral-200 transition-colors">
              <Building2 className="w-5 h-5 text-black" />
            </div>
            <div>
              <div className="text-base font-bold text-white tracking-tight flex items-center space-x-1.5">
                <span>DealPilot</span>
                <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  AI
                </span>
              </div>
              <p className="text-[10px] uppercase tracking-widest text-neutral-400 font-mono font-semibold">
                MERCHANT
              </p>
            </div>
          </div>

          {/* Primary Navigation */}
          <div className="space-y-1">
            <div className="text-[10px] uppercase font-bold tracking-wider text-neutral-500 px-3 pb-1">
              Command Center
            </div>
            {primaryNav.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-neutral-850 text-white border border-white/[0.12] shadow-sm'
                      : 'text-neutral-400 hover:text-white hover:bg-neutral-900/60'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-emerald-400' : 'text-neutral-400'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>

          {/* Secondary Controls */}
          <div className="space-y-1 pt-2 border-t border-white/[0.08]">
            <div className="text-[10px] uppercase font-bold tracking-wider text-neutral-500 px-3 pb-1">
              Safety & Compliance
            </div>
            {secondaryNav.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center space-x-3 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-neutral-850 text-white border border-white/[0.12]'
                      : 'text-neutral-400 hover:text-white hover:bg-neutral-900/60'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-emerald-400' : 'text-neutral-400'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>

        </div>

        {/* Bottom Utility & Merchant Profile */}
        <div className="space-y-3 pt-4 border-t border-white/[0.08]">
          <div className="space-y-1 text-xs">
            <button
              onClick={() => setIsSettingsModalOpen(true)}
              className="w-full flex items-center space-x-3 px-3.5 py-2 rounded-xl text-neutral-400 hover:text-white hover:bg-neutral-900/50 transition-colors"
            >
              <Settings className="w-4 h-4" />
              <span>Store Settings</span>
            </button>

            <button
              onClick={() => setIsHelpModalOpen(true)}
              className="w-full flex items-center space-x-3 px-3.5 py-2 rounded-xl text-neutral-400 hover:text-white hover:bg-neutral-900/50 transition-colors"
            >
              <HelpCircle className="w-4 h-4" />
              <span>Help & Support</span>
            </button>
          </div>

          {/* Merchant Profile Box */}
          <div className="p-3 rounded-2xl bg-[#07090e] border border-white/[0.08] flex items-center justify-between">
            <div className="flex items-center space-x-2.5 min-w-0">
              <div className="w-8 h-8 rounded-full bg-neutral-800 border border-neutral-700 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                {user?.name ? user.name.charAt(0).toUpperCase() : 'M'}
              </div>
              <div className="min-w-0">
                <div className="text-xs font-bold text-white truncate">
                  {user?.name || 'OmniTech Store'}
                </div>
                <div className="text-[10px] text-neutral-400 truncate">
                  {user?.email || 'merchant@dealpilot.ai'}
                </div>
              </div>
            </div>

            <button
              onClick={onLogout}
              className="p-1.5 rounded-lg text-neutral-500 hover:text-red-400 hover:bg-neutral-850 transition-colors"
              title="Sign Out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>

      </aside>

      {/* Main Merchant Content Area */}
      <div className="lg:pl-64 flex flex-col flex-1 min-w-0">
        
        {/* Merchant Top Bar */}
        <header className="sticky top-0 z-40 bg-[#0c1017]/95 backdrop-blur-md border-b border-white/[0.08] px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          
          {/* Left: Hamburger & Title */}
          <div className="flex items-center space-x-3 min-w-0">
            <button
              onClick={() => setIsMobileOpen(true)}
              className="lg:hidden p-2 rounded-xl bg-neutral-900 border border-white/[0.08] text-neutral-400 hover:text-white transition-colors"
            >
              <Menu className="w-5 h-5" />
            </button>

            <div>
              <h1 className="text-base sm:text-lg font-bold text-white tracking-tight leading-none">
                {currentMeta.title}
              </h1>
              <p className="text-[11px] text-neutral-400 mt-1 hidden sm:block truncate">
                {currentMeta.subtitle}
              </p>
            </div>
          </div>

          {/* Right Controls */}
          <div className="flex items-center space-x-3">
            
            {/* Date Range Selector */}
            <div className="hidden sm:flex items-center bg-[#07090e] border border-white/[0.08] rounded-xl p-0.5 text-xs font-medium">
              {['7D', '30D', '90D'].map((range) => (
                <button
                  key={range}
                  onClick={() => setTimeRange && setTimeRange(range)}
                  className={`px-2.5 py-1 rounded-lg transition-colors ${
                    timeRange === range
                      ? 'bg-neutral-800 text-white font-bold shadow-sm'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  {range}
                </button>
              ))}
            </div>

            {/* Store Online Status Pill */}
            <button
              onClick={() => setIsStoreOnline(!isStoreOnline)}
              className="hidden md:flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-[#07090e] border border-white/[0.08] text-xs transition-colors"
              title="Click to toggle store availability"
            >
              <span className={`w-2 h-2 rounded-full ${isStoreOnline ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`} />
              <span className={`font-medium ${isStoreOnline ? 'text-neutral-200' : 'text-amber-300'}`}>
                {isStoreOnline ? 'Store Online' : 'Store Paused'}
              </span>
            </button>

            {/* Notification Bell with Business Popover */}
            <div className="relative">
              <button
                onClick={() => setIsNotifOpen(!isNotifOpen)}
                className="p-2 rounded-xl bg-[#07090e] border border-white/[0.08] text-neutral-400 hover:text-white transition-colors relative"
                title="Business Notifications"
              >
                <Bell className="w-4 h-4" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 text-black font-bold text-[10px] flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </button>

              {/* Notification Popover */}
              {isNotifOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setIsNotifOpen(false)} />
                  <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-2xl bg-[#0c1017] border border-white/[0.12] shadow-2xl p-4 z-50 text-white space-y-3 animate-in fade-in zoom-in-95 duration-150">
                    <div className="flex items-center justify-between pb-2 border-b border-white/[0.08]">
                      <div className="text-xs font-bold text-white flex items-center space-x-1.5">
                        <Bell className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Business Alerts</span>
                      </div>
                      <button
                        onClick={() => setNotifications(prev => prev.map(n => ({ ...n, unread: false })))}
                        className="text-[11px] text-neutral-400 hover:text-white"
                      >
                        Mark all read
                      </button>
                    </div>

                    <div className="space-y-2 max-h-72 overflow-y-auto pr-1 text-xs">
                      {notifications.map((n) => (
                        <div
                          key={n.id}
                          className={`p-3 rounded-xl border transition-colors ${
                            n.unread 
                              ? 'bg-[#07090e] border-white/[0.12]' 
                              : 'bg-[#07090e]/50 border-transparent text-neutral-400'
                          }`}
                        >
                          <div className="flex justify-between items-start gap-1">
                            <span className="font-semibold text-white">{n.title}</span>
                            <span className="text-[10px] text-neutral-500">{n.time}</span>
                          </div>
                          <p className="text-[11px] text-neutral-300 mt-1 leading-snug">{n.message}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Merchant Profile Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center space-x-2 p-1.5 sm:px-3 sm:py-1.5 rounded-xl bg-[#07090e] border border-white/[0.08] hover:border-white/[0.16] text-xs font-semibold text-white transition-colors"
              >
                <div className="w-6 h-6 rounded-full bg-white text-black flex items-center justify-center text-[11px] font-bold">
                  {user?.name ? user.name.charAt(0).toUpperCase() : 'M'}
                </div>
                <span className="hidden sm:inline text-xs font-medium">{user?.name || 'OmniTech'}</span>
                <ChevronDown className="w-3.5 h-3.5 text-neutral-400" />
              </button>

              {isUserMenuOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setIsUserMenuOpen(false)} />
                  <div className="absolute right-0 mt-2 w-52 rounded-2xl bg-[#0c1017] border border-white/[0.12] shadow-2xl p-2 z-50 text-xs space-y-1">
                    <div className="p-2 border-b border-white/[0.08] text-neutral-400 text-[11px]">
                      Store Operator <strong className="text-white block truncate">{user?.email || 'merchant@dealpilot.ai'}</strong>
                    </div>
                    <button
                      onClick={() => {
                        setIsUserMenuOpen(false);
                        setActiveTab('guardrails');
                      }}
                      className="w-full text-left px-3 py-2 rounded-xl hover:bg-neutral-800 text-neutral-300 hover:text-white transition-colors"
                    >
                      Policy Guardrails
                    </button>
                    <button
                      onClick={() => {
                        setIsUserMenuOpen(false);
                        setIsSettingsModalOpen(true);
                      }}
                      className="w-full text-left px-3 py-2 rounded-xl hover:bg-neutral-800 text-neutral-300 hover:text-white transition-colors"
                    >
                      Store Settings
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
                    <div className="pt-1 border-t border-white/[0.08]">
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

      {/* Mobile Drawer */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div 
            className="fixed inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => setIsMobileOpen(false)}
          />
          <div className="relative w-72 max-w-[80vw] bg-[#0c1017] border-r border-white/[0.08] p-5 flex flex-col justify-between z-50 animate-in slide-in-from-left duration-200">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2.5">
                  <div className="w-8 h-8 rounded-xl bg-white text-black flex items-center justify-center font-bold">
                    <Building2 className="w-4 h-4 text-black" />
                  </div>
                  <div>
                    <span className="font-bold text-white text-sm block">DealPilot AI</span>
                    <span className="text-[10px] text-emerald-400 uppercase font-mono font-semibold">MERCHANT</span>
                  </div>
                </div>
                <button
                  onClick={() => setIsMobileOpen(false)}
                  className="p-1.5 rounded-lg text-neutral-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <nav className="space-y-1">
                {primaryNav.concat(secondaryNav).map((item) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        setActiveTab(item.id);
                        setIsMobileOpen(false);
                      }}
                      className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl text-xs font-semibold ${
                        isActive ? 'bg-neutral-850 text-white' : 'text-neutral-400 hover:text-white'
                      }`}
                    >
                      <Icon className={`w-4 h-4 ${isActive ? 'text-emerald-400' : ''}`} />
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </nav>
            </div>

            <div className="pt-4 border-t border-white/[0.08]">
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

      {/* Settings Modal */}
      {isSettingsModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="bg-[#0c1017] border border-white/[0.12] rounded-2xl max-w-md w-full p-6 text-white space-y-4 shadow-2xl relative">
            <button
              onClick={() => setIsSettingsModalOpen(false)}
              className="absolute top-4 right-4 p-1 rounded-lg text-neutral-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
            <div className="flex items-center space-x-2 text-xs font-semibold text-emerald-400">
              <Settings className="w-4 h-4" />
              <span>Store Configuration</span>
            </div>
            <h3 className="text-lg font-bold text-white">Merchant Settings</h3>
            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-neutral-400 mb-1">Settlement Currency</label>
                <select className="w-full px-3 py-2 rounded-xl bg-[#07090e] border border-white/[0.08] text-white">
                  <option>INR (₹) - Indian Rupee (Razorpay Standard)</option>
                  <option>USD ($) - US Dollar</option>
                </select>
              </div>
              <div>
                <label className="block text-neutral-400 mb-1">Target Minimum Margin Alarm</label>
                <select className="w-full px-3 py-2 rounded-xl bg-[#07090e] border border-white/[0.08] text-white">
                  <option>Notify when deal margin drops below 25% (Recommended)</option>
                  <option>Notify when deal margin drops below 20%</option>
                  <option>Notify when deal margin drops below 15%</option>
                </select>
              </div>
            </div>
            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setIsSettingsModalOpen(false)}
                className="px-4 py-2 rounded-xl bg-white text-black font-bold text-xs hover:bg-neutral-200 transition-colors"
              >
                Save Settings
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Help Modal */}
      {isHelpModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="bg-[#0c1017] border border-white/[0.12] rounded-2xl max-w-md w-full p-6 text-white space-y-4 shadow-2xl relative">
            <button
              onClick={() => setIsHelpModalOpen(false)}
              className="absolute top-4 right-4 p-1 rounded-lg text-neutral-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
            <div className="flex items-center space-x-2 text-xs font-semibold text-emerald-400">
              <HelpCircle className="w-4 h-4" />
              <span>Merchant Advisory</span>
            </div>
            <h3 className="text-lg font-bold text-white">Merchant Support</h3>
            <div className="text-xs text-neutral-300 space-y-2 leading-relaxed">
              <p>
                DealPilot AI protects your margins while automatically closing deals with buyers who need pricing flexibility.
              </p>
              <div className="p-3 rounded-xl bg-[#07090e] border border-white/[0.08] space-y-1">
                <div className="font-semibold text-white">Merchant Operations Desk</div>
                <div className="text-neutral-400">Email: merchant-ops@dealpilot.ai</div>
                <div className="text-neutral-400">Direct Line: +91 80 4019 9200</div>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
