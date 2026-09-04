import React from 'react';
import { Sparkles, X, ArrowRight, Zap, Target, ShieldAlert } from 'lucide-react';
import { formatINR } from '../utils/currency';

export default function DemoPresets({ isOpen, onClose, onSelectPreset }) {
  if (!isOpen) return null;

  const presets = [
    {
      id: 'hackathon-hero',
      title: '🎯 The ₹5,000 Trio (Hackathon Hero Scenario)',
      badge: 'Featured Demo',
      badgeColor: 'bg-brand-500/20 text-brand-400 border-brand-500/40',
      budget: 5000,
      categories: ['keyboard', 'mouse', 'headphones'],
      prompt: 'I have ₹5000 and need a keyboard, mouse, and headphones.',
      description: 'Generates Best Quality (₹5,700), Best Value (₹4,900), and Budget Saver (₹3,600). Demonstrates AI negotiation with ₹500 rule clamp, 25% margin safety, and boAt headphone swap!',
      highlights: ['3 Tier Plans', '₹500 Max Discount Clamp', 'Headphone Substitution', 'Freebie Cable Perk']
    },
    {
      id: 'wfh-studio',
      title: '💼 WFH Executive Setup (₹12,000)',
      badge: 'High Value',
      badgeColor: 'bg-indigo-500/20 text-indigo-400 border-indigo-500/40',
      budget: 12000,
      categories: ['monitor', 'webcam', 'stand', 'desk_mat'],
      prompt: 'I have ₹12000 for a monitor, webcam, laptop stand, and desk mat.',
      description: 'Multi-category setup comparing 144Hz vs 100Hz IPS monitors, Pro stream webcams, and ergonomic aluminum risers.',
      highlights: ['4 Categories', 'Automated Rule Clamp', 'Margin Protection']
    },
    {
      id: 'student-essentials',
      title: '🎓 Student Budget Essentials (₹3,500)',
      badge: 'Smart Budget',
      badgeColor: 'bg-amber-500/20 text-amber-400 border-amber-500/40',
      budget: 3500,
      categories: ['keyboard', 'mouse', 'stand'],
      prompt: 'I have ₹3500 and need a keyboard, mouse, and laptop stand for college.',
      description: 'Highlights how DealPilot AI maximizes pocket savings without sacrificing essential reliability.',
      highlights: ['Tight Budget', 'Budget Saver Savings', 'Instant Checkout']
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in">
      <div className="bg-slate-900 border border-slate-700/80 rounded-2xl max-w-2xl w-full p-6 shadow-2xl relative">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-amber-500/20 flex items-center justify-center text-amber-400">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">1-Click Hackathon Demo Scenarios</h3>
              <p className="text-xs text-slate-400">Select any scenario to pre-fill and trigger live AI planning & negotiation</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Preset Cards */}
        <div className="mt-4 space-y-3 max-h-[70vh] overflow-y-auto pr-1">
          {presets.map(preset => (
            <div
              key={preset.id}
              onClick={() => {
                onSelectPreset(preset);
                onClose();
              }}
              className="p-4 rounded-xl bg-slate-850/80 border border-slate-700/60 hover:border-brand-500/50 hover:bg-slate-800/80 cursor-pointer transition-all group"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <h4 className="font-semibold text-white text-sm sm:text-base group-hover:text-brand-300 transition-colors">
                    {preset.title}
                  </h4>
                  <span className={`px-2 py-0.5 text-[10px] font-medium rounded-full border ${preset.badgeColor}`}>
                    {preset.badge}
                  </span>
                </div>
                <span className="text-sm font-bold text-brand-400 font-mono">
                  {formatINR(preset.budget)}
                </span>
              </div>

              <p className="text-xs text-slate-300 mt-1.5 italic font-mono bg-slate-900/60 px-2.5 py-1 rounded border border-slate-800">
                "{preset.prompt}"
              </p>

              <p className="text-xs text-slate-400 mt-2">
                {preset.description}
              </p>

              <div className="flex flex-wrap items-center justify-between gap-2 mt-3 pt-2 border-t border-slate-800/60">
                <div className="flex flex-wrap gap-1.5">
                  {preset.highlights.map((h, i) => (
                    <span key={i} className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700/50">
                      ✓ {h}
                    </span>
                  ))}
                </div>
                <div className="flex items-center text-xs font-semibold text-brand-400 group-hover:translate-x-1 transition-transform">
                  Launch Demo <ArrowRight className="w-3.5 h-3.5 ml-1" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-4 pt-3 border-t border-slate-800 text-center text-xs text-slate-400">
          💡 You can also type any custom budget and product combination in the input bar!
        </div>

      </div>
    </div>
  );
}
