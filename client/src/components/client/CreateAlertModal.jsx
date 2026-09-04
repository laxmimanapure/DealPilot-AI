import React, { useState } from 'react';
import { X, Bell, TrendingDown, Check, Sparkles } from 'lucide-react';
import { formatINR } from '../../utils/currency';

export default function CreateAlertModal({
  product,
  isOpen,
  onClose,
  onSaveAlert
}) {
  if (!isOpen || !product) return null;

  const [targetPrice, setTargetPrice] = useState(
    Math.round(product.currentPrice * 0.9)
  );
  const [notifyEmail, setNotifyEmail] = useState(true);
  const [notifyApp, setNotifyApp] = useState(true);
  const [isSavedSuccess, setIsSavedSuccess] = useState(false);

  const applyPercentDiscount = (percent) => {
    setTargetPrice(Math.round(product.currentPrice * (1 - percent / 100)));
  };

  const handleSave = (e) => {
    e.preventDefault();
    onSaveAlert({
      id: `alert-${Date.now()}`,
      productId: product.id,
      productName: product.name,
      imageUrl: product.imageUrl,
      brand: product.brand,
      currentPrice: product.currentPrice,
      targetPrice: Number(targetPrice),
      originalPrice: product.originalPrice,
      status: Number(targetPrice) >= product.currentPrice ? 'Target Met' : 'Watching',
      active: true,
      createdDate: 'Just now',
      store: product.store,
      notifyEmail,
      notifyApp
    });

    setIsSavedSuccess(true);
    setTimeout(() => {
      setIsSavedSuccess(false);
      onClose();
    }, 1200);
  };

  const savingsPotential = Math.max(0, product.currentPrice - targetPrice);
  const percentBelow = Math.round((savingsPotential / product.currentPrice) * 100);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="bg-neutral-900 border border-neutral-800 rounded-2xl max-w-md w-full p-6 text-white space-y-5 shadow-2xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header */}
        <div className="flex items-center space-x-2 text-xs font-semibold text-amber-400">
          <Bell className="w-3.5 h-3.5" />
          <span>Price Drop Alert</span>
        </div>
        <div>
          <h3 className="text-lg font-bold text-white tracking-tight">
            Track Price for this Deal
          </h3>
          <p className="text-xs text-neutral-400 mt-0.5">
            We will notify you immediately when the price reaches your target.
          </p>
        </div>

        {/* Product Snippet */}
        <div className="p-3 rounded-xl bg-neutral-950 border border-neutral-800 flex items-center space-x-3">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-12 h-12 object-cover rounded-lg border border-neutral-800 flex-shrink-0"
          />
          <div className="min-w-0 flex-1">
            <h4 className="text-xs font-semibold text-white truncate">{product.name}</h4>
            <div className="flex items-center space-x-2 text-[11px] text-neutral-400 mt-0.5">
              <span>Current: <strong>{formatINR(product.currentPrice)}</strong></span>
              <span>•</span>
              <span className="text-neutral-500">{product.store}</span>
            </div>
          </div>
        </div>

        {/* Target Price Form */}
        <form onSubmit={handleSave} className="space-y-4 text-xs">
          <div>
            <label className="block text-neutral-400 mb-1 font-medium">
              Target Price (₹)
            </label>
            <input
              type="number"
              min="100"
              max={product.currentPrice}
              value={targetPrice}
              onChange={(e) => setTargetPrice(Number(e.target.value))}
              className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-950 border border-neutral-800 text-white font-mono font-bold text-base focus:outline-none focus:border-neutral-600"
            />
          </div>

          {/* Quick Presets */}
          <div className="flex items-center space-x-2">
            <span className="text-[11px] text-neutral-500">Presets:</span>
            {[5, 10, 15, 20].map((pct) => (
              <button
                type="button"
                key={pct}
                onClick={() => applyPercentDiscount(pct)}
                className="px-2.5 py-1 rounded-lg bg-neutral-800 hover:bg-neutral-750 text-neutral-300 text-[11px] font-medium transition-colors"
              >
                -{pct}%
              </button>
            ))}
          </div>

          {/* Projected savings notice */}
          {savingsPotential > 0 && (
            <div className="p-2.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs flex items-center justify-between">
              <span className="flex items-center space-x-1.5">
                <TrendingDown className="w-3.5 h-3.5 text-emerald-400" />
                <span>Notify when price drops by:</span>
              </span>
              <span className="font-mono font-bold">
                {formatINR(savingsPotential)} ({percentBelow}% off)
              </span>
            </div>
          )}

          {/* Notification toggles */}
          <div className="space-y-2 pt-1">
            <label className="flex items-center space-x-2 text-neutral-300 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={notifyApp}
                onChange={(e) => setNotifyApp(e.target.checked)}
                className="rounded bg-neutral-950 border-neutral-700 text-white focus:ring-0 w-3.5 h-3.5"
              />
              <span>Send in-app notifications</span>
            </label>
            <label className="flex items-center space-x-2 text-neutral-300 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={notifyEmail}
                onChange={(e) => setNotifyEmail(e.target.checked)}
                className="rounded bg-neutral-950 border-neutral-700 text-white focus:ring-0 w-3.5 h-3.5"
              />
              <span>Send price drop alert to my email</span>
            </label>
          </div>

          {/* Action Buttons */}
          <div className="pt-3 border-t border-neutral-800 flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-750 text-neutral-300 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSavedSuccess}
              className="px-5 py-2 rounded-xl bg-white text-black font-bold hover:bg-neutral-200 transition-colors flex items-center space-x-1.5"
            >
              {isSavedSuccess ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600 stroke-[3]" />
                  <span>Alert Set!</span>
                </>
              ) : (
                <span>Activate Alert</span>
              )}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
