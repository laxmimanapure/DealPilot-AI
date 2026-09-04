import React from 'react';
import { 
  Bookmark, 
  Trash2, 
  ArrowRight, 
  ShoppingBag, 
  TrendingDown, 
  Bell, 
  Store, 
  Clock,
  ExternalLink
} from 'lucide-react';
import { formatINR } from '../../utils/currency';

export default function ClientSavedDeals({
  products,
  savedProductIds,
  priceAlerts,
  onToggleSave,
  onOpenAlertModal,
  onViewProduct,
  onNavigateTab
}) {
  const savedProducts = products.filter(p => savedProductIds.includes(p.id));

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-neutral-800">
        <div>
          <div className="flex items-center space-x-2 text-xs font-semibold text-neutral-400 mb-1">
            <Bookmark className="w-3.5 h-3.5 text-red-400 fill-red-400" />
            <span>Personal Wishlist</span>
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">
            Saved Deals ({savedProducts.length})
          </h1>
          <p className="text-xs text-neutral-400 mt-1">
            Products you are watching. DealPilot tracks their price daily and will alert you to drops.
          </p>
        </div>

        {savedProducts.length > 0 && (
          <button
            onClick={() => onNavigateTab('discover')}
            className="px-4 py-2 rounded-xl bg-neutral-900 border border-neutral-800 hover:border-neutral-700 text-xs text-neutral-300 hover:text-white transition-colors self-start sm:self-auto"
          >
            + Add More Deals
          </button>
        )}
      </div>

      {/* Saved Deals List */}
      {savedProducts.length === 0 ? (
        <div className="py-20 text-center rounded-2xl bg-neutral-900/40 border border-neutral-800/80 space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-500 mx-auto">
            <Bookmark className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <h3 className="text-base font-bold text-white">No saved deals yet</h3>
            <p className="text-xs text-neutral-400 max-w-sm mx-auto">
              Save products you're interested in and DealPilot will quietly keep an eye on their prices.
            </p>
          </div>
          <button
            onClick={() => onNavigateTab('discover')}
            className="px-5 py-2.5 rounded-xl bg-white text-black text-xs font-bold hover:bg-neutral-200 transition-colors shadow-md"
          >
            Discover Deals
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {savedProducts.map((prod) => {
            const hasAlert = priceAlerts.some(a => a.productId === prod.id && a.active);
            const savings = prod.originalPrice - prod.currentPrice;

            return (
              <div
                key={prod.id}
                className="rounded-2xl bg-neutral-900/80 border border-neutral-800 hover:border-neutral-700/80 transition-all p-5 flex flex-col justify-between space-y-4 group"
              >
                <div className="space-y-3">
                  
                  {/* Image & Quick Controls */}
                  <div className="aspect-video w-full rounded-xl overflow-hidden bg-neutral-950 border border-neutral-800 relative">
                    <img
                      src={prod.imageUrl}
                      alt={prod.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-2 right-2 flex items-center space-x-1">
                      <button
                        onClick={() => onOpenAlertModal(prod)}
                        className={`p-1.5 rounded-lg backdrop-blur-md transition-colors ${
                          hasAlert 
                            ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40' 
                            : 'bg-black/60 text-neutral-400 hover:text-white'
                        }`}
                        title={hasAlert ? 'Price alert active' : 'Set price alert'}
                      >
                        <Bell className={`w-3.5 h-3.5 ${hasAlert ? 'fill-amber-400' : ''}`} />
                      </button>

                      <button
                        onClick={() => onToggleSave(prod.id)}
                        className="p-1.5 rounded-lg bg-black/60 backdrop-blur-md text-neutral-400 hover:text-red-400 transition-colors"
                        title="Remove from saved"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <span className="absolute bottom-2 left-2 px-2 py-0.5 rounded text-[10px] font-bold bg-black/80 text-emerald-400">
                      {prod.discountPercent}% OFF
                    </span>
                  </div>

                  {/* Store & Saved Date */}
                  <div className="flex items-center justify-between text-[11px] text-neutral-400">
                    <span>Store: <strong className="text-neutral-300">{prod.store}</strong></span>
                    <span className="flex items-center space-x-1">
                      <Clock className="w-3 h-3 text-neutral-500" />
                      <span>Saved recently</span>
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-white line-clamp-2 leading-snug">
                    {prod.name}
                  </h3>

                  {/* Price Drop Indicator */}
                  {prod.isPriceDrop && (
                    <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs flex items-center space-x-1.5">
                      <TrendingDown className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                      <span>Price reduced by {formatINR(prod.priceDropAmount || savings)}</span>
                    </div>
                  )}

                  {/* Pricing Details */}
                  <div className="flex items-baseline space-x-2 pt-1">
                    <span className="text-xl font-bold text-white font-mono">
                      {formatINR(prod.currentPrice)}
                    </span>
                    <span className="text-xs text-neutral-500 line-through font-mono">
                      {formatINR(prod.originalPrice)}
                    </span>
                  </div>

                </div>

                {/* Actions */}
                <div className="pt-3 border-t border-neutral-800/80 flex items-center space-x-2">
                  <button
                    onClick={() => onViewProduct(prod)}
                    className="flex-1 py-2 px-3 rounded-xl bg-white text-black text-xs font-bold hover:bg-neutral-200 transition-colors flex items-center justify-center space-x-1"
                  >
                    <span>View Deal</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => onOpenAlertModal(prod)}
                    className={`p-2 rounded-xl border text-xs transition-colors ${
                      hasAlert
                        ? 'bg-amber-500/15 border-amber-500/30 text-amber-300'
                        : 'bg-neutral-800 border-neutral-700 text-neutral-300 hover:text-white'
                    }`}
                    title="Configure price alert"
                  >
                    <Bell className="w-4 h-4" />
                  </button>
                </div>

              </div>
            );
          })}
        </div>
      )}

    </div>
  );
}
