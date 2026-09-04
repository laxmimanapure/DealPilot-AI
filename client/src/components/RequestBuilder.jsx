import React, { useState } from 'react';
import { Sparkles, Sliders, ArrowRight, Check, RefreshCw } from 'lucide-react';
import { formatINR } from '../utils/currency';

const AVAILABLE_CATEGORIES = [
  { id: 'keyboard', label: 'Keyboard', icon: '⌨️', defaultIncluded: true },
  { id: 'mouse', label: 'Mouse', icon: '🖱️', defaultIncluded: true },
  { id: 'headphones', label: 'Headphones', icon: '🎧', defaultIncluded: true },
  { id: 'monitor', label: 'Monitor', icon: '🖥️', defaultIncluded: false },
  { id: 'desk_mat', label: 'Desk Mat', icon: '🪄', defaultIncluded: false },
  { id: 'webcam', label: 'Webcam', icon: '📹', defaultIncluded: false },
  { id: 'mic', label: 'Microphone', icon: '🎙️', defaultIncluded: false },
  { id: 'stand', label: 'Laptop Stand', icon: '📐', defaultIncluded: false },
  { id: 'smartwatch', label: 'Smartwatch', icon: '⌚', defaultIncluded: false },
  { id: 'speaker', label: 'Speakers', icon: '🔊', defaultIncluded: false },
];

export default function RequestBuilder({
  onGeneratePlans,
  isLoading,
  initialBudget = 5000,
  initialCategories = ['keyboard', 'mouse', 'headphones'],
  initialPrompt = 'I have ₹5000 and need a keyboard, mouse, and headphones.'
}) {
  const [prompt, setPrompt] = useState(initialPrompt);
  const [budget, setBudget] = useState(initialBudget);
  const [selectedCategories, setSelectedCategories] = useState(initialCategories);
  const [useNaturalLanguage, setUseNaturalLanguage] = useState(true);

  // Sync state if props change (from demo preset click)
  React.useEffect(() => {
    setBudget(initialBudget);
    setSelectedCategories(initialCategories);
    setPrompt(initialPrompt);
  }, [initialBudget, initialCategories, initialPrompt]);

  const toggleCategory = (catId) => {
    if (selectedCategories.includes(catId)) {
      if (selectedCategories.length > 1) {
        setSelectedCategories(selectedCategories.filter(c => c !== catId));
      }
    } else {
      setSelectedCategories([...selectedCategories, catId]);
    }
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    onGeneratePlans({
      budget: Number(budget),
      categories: selectedCategories,
      query: useNaturalLanguage ? prompt : ''
    });
  };

  return (
    <div className="glass-panel rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-800 relative overflow-hidden">
      
      {/* Background ambient lighting */}
      <div className="absolute -top-24 -right-24 w-72 h-72 bg-brand-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800/80">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-brand-500/10 border border-brand-500/30 text-brand-400 text-xs font-semibold mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI Budget Shopping Planner</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Tell DealPilot what you need & your budget
          </h2>
          <p className="text-sm text-slate-400 mt-1">
            Our AI planner builds 3 optimized bundle options and safely negotiates any budget gap.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setUseNaturalLanguage(!useNaturalLanguage)}
          className="self-start md:self-auto inline-flex items-center space-x-2 text-xs font-medium text-slate-400 hover:text-slate-200 bg-slate-800/70 hover:bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-700/60 transition-all"
        >
          <Sliders className="w-3.5 h-3.5" />
          <span>{useNaturalLanguage ? 'Switch to Manual Controls' : 'Switch to Natural Language'}</span>
        </button>
      </div>

      <form onSubmit={handleSubmit} className="mt-6 space-y-6">
        
        {/* Natural Language Prompt Input */}
        {useNaturalLanguage ? (
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
              Natural Language Request
            </label>
            <div className="relative">
              <input
                type="text"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="e.g. I have ₹5000 and need a keyboard, mouse, and headphones"
                className="w-full bg-slate-900/90 border border-slate-700/80 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 rounded-xl px-4 py-3.5 text-sm sm:text-base text-white placeholder-slate-500 outline-none transition-all"
              />
              <span className="absolute right-3.5 top-3.5 text-xs text-slate-500 hidden sm:inline-block">
                Press Enter ↵
              </span>
            </div>
          </div>
        ) : null}

        {/* Categories Selector */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
            Selected Products ({selectedCategories.length})
          </label>
          <div className="flex flex-wrap gap-2">
            {AVAILABLE_CATEGORIES.map(cat => {
              const isSelected = selectedCategories.includes(cat.id);
              return (
                <button
                  type="button"
                  key={cat.id}
                  onClick={() => toggleCategory(cat.id)}
                  className={`flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all ${
                    isSelected
                      ? 'bg-brand-500/20 text-brand-300 border border-brand-500/50 shadow-glow'
                      : 'bg-slate-900/80 text-slate-400 border border-slate-800 hover:border-slate-700 hover:text-slate-200'
                  }`}
                >
                  <span>{cat.icon}</span>
                  <span>{cat.label}</span>
                  {isSelected && <Check className="w-3.5 h-3.5 text-brand-400 ml-1" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* Budget Slider & Direct Input */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          <div className="sm:col-span-2 space-y-2">
            <div className="flex justify-between items-center text-xs font-semibold uppercase tracking-wider text-slate-300">
              <span>Target Budget Slider</span>
              <span className="text-brand-400 font-mono font-bold text-sm">
                {formatINR(budget)}
              </span>
            </div>
            <input
              type="range"
              min="1000"
              max="25000"
              step="500"
              value={budget}
              onChange={(e) => {
                const val = Number(e.target.value);
                setBudget(val);
                if (useNaturalLanguage) {
                  setPrompt(`I have ₹${val} and need ${selectedCategories.join(', ')}.`);
                }
              }}
              className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-brand-500"
            />
            <div className="flex justify-between text-[10px] text-slate-500">
              <span>₹1,000</span>
              <span>₹5,000</span>
              <span>₹10,000</span>
              <span>₹15,000</span>
              <span>₹25,000</span>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
              Exact Amount (₹)
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-2.5 text-slate-400 font-semibold">₹</span>
              <input
                type="number"
                min="500"
                max="100000"
                step="100"
                value={budget}
                onChange={(e) => {
                  const val = Number(e.target.value);
                  setBudget(val);
                  if (useNaturalLanguage) {
                    setPrompt(`I have ₹${val} and need ${selectedCategories.join(', ')}.`);
                  }
                }}
                className="w-full bg-slate-900 border border-slate-700/80 focus:border-brand-500 rounded-xl pl-8 pr-3 py-2 text-sm text-white font-mono outline-none"
              />
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-4 flex items-center justify-end">
          <button
            type="submit"
            disabled={isLoading || selectedCategories.length === 0}
            className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 bg-gradient-to-r from-brand-500 to-brand-600 hover:from-brand-400 hover:to-brand-500 text-slate-950 font-bold px-8 py-3.5 rounded-xl shadow-glow transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <RefreshCw className="w-5 h-5 animate-spin" />
                <span>Generating 3 Smart Plans...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5 stroke-[2.5]" />
                <span>Generate Smart Plans</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </>
            )}
          </button>
        </div>

      </form>
    </div>
  );
}
