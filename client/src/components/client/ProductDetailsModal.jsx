import React, { useState } from 'react';
import { 
  X, 
  ExternalLink, 
  Sparkles, 
  Bookmark, 
  Bell, 
  TrendingDown, 
  Check, 
  Star, 
  ShieldCheck, 
  Store, 
  Zap,
  ArrowRight
} from 'lucide-react';
import { formatINR } from '../../utils/currency';

export default function ProductDetailsModal({
  product,
  isOpen,
  onClose,
  isSaved,
  onToggleSave,
  onOpenAlertModal,
  onStartNegotiation,
  onDirectCheckout
}) {
  if (!isOpen || !product) return null;

  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'history'

  const lowestPrice = Math.min(
    ...(product.priceHistory ? product.priceHistory.map(p => p.price) : [product.currentPrice])
  );
  const highestPrice = Math.max(
    product.originalPrice,
    ...(product.priceHistory ? product.priceHistory.map(p => p.price) : [product.originalPrice])
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="bg-neutral-900 border border-neutral-800 rounded-2xl sm:rounded-3xl max-w-2xl w-full p-5 sm:p-7 shadow-2xl relative overflow-hidden max-h-[90vh] flex flex-col text-white"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Scrollable Content */}
        <div className="overflow-y-auto pr-1 space-y-6">
          
          {/* Main Product Header Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-5 items-start">
            
            {/* Image Preview */}
            <div className="sm:col-span-5 rounded-2xl overflow-hidden bg-neutral-950 border border-neutral-800 relative group aspect-square flex items-center justify-center">
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-black/75 backdrop-blur-md text-emerald-400 border border-emerald-500/30">
                {product.badge || `${product.discountPercent}% OFF`}
              </span>
            </div>

            {/* Info & Price Column */}
            <div className="sm:col-span-7 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase font-semibold text-neutral-400 tracking-wider">
                  {product.brand} • <span className="text-neutral-300">{product.store}</span>
                </span>
                <div className="flex items-center space-x-1 text-xs text-amber-400">
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  <span className="font-semibold">{product.rating}</span>
                  <span className="text-neutral-500">({product.reviewsCount?.toLocaleString()})</span>
                </div>
              </div>

              <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight leading-snug">
                {product.name}
              </h2>

              {/* Pricing Box */}
              <div className="p-3.5 rounded-xl bg-neutral-950 border border-neutral-800/80 flex items-baseline justify-between">
                <div>
                  <div className="flex items-baseline space-x-2.5">
                    <span className="text-2xl font-extrabold text-white font-mono">
                      {formatINR(product.currentPrice)}
                    </span>
                    <span className="text-xs text-neutral-500 line-through font-mono">
                      {formatINR(product.originalPrice)}
                    </span>
                  </div>
                  <div className="text-[11px] text-emerald-400 font-medium mt-0.5">
                    Save {formatINR(product.originalPrice - product.currentPrice)} ({product.discountPercent}% off)
                  </div>
                </div>

                <span className="px-2 py-1 rounded-md text-[11px] font-medium bg-neutral-900 border border-neutral-800 text-neutral-300">
                  {product.availability || 'In Stock'}
                </span>
              </div>

              {/* Quick Actions Row */}
              <div className="flex items-center space-x-2 pt-1">
                <button
                  onClick={() => onToggleSave(product.id)}
                  className={`flex-1 py-2 px-3 rounded-xl border text-xs font-semibold flex items-center justify-center space-x-1.5 transition-colors ${
                    isSaved
                      ? 'bg-red-500/10 border-red-500/30 text-red-400 hover:bg-red-500/20'
                      : 'bg-neutral-800 border-neutral-700 text-neutral-300 hover:bg-neutral-750 hover:text-white'
                  }`}
                >
                  <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-red-400' : ''}`} />
                  <span>{isSaved ? 'Saved in Wishlist' : 'Save Deal'}</span>
                </button>

                <button
                  onClick={() => onOpenAlertModal(product)}
                  className="flex-1 py-2 px-3 rounded-xl bg-neutral-800 hover:bg-neutral-750 border border-neutral-700 text-neutral-300 hover:text-white text-xs font-semibold flex items-center justify-center space-x-1.5 transition-colors"
                >
                  <Bell className="w-3.5 h-3.5 text-amber-400" />
                  <span>Set Price Alert</span>
                </button>
              </div>

            </div>
          </div>

          {/* DealPilot AI Analysis Card */}
          <div className="p-4 rounded-2xl bg-neutral-950 border border-emerald-500/20 text-xs space-y-1.5 relative overflow-hidden">
            <div className="flex items-center space-x-2 text-emerald-400 font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>DealPilot says: Good Deal</span>
            </div>
            <p className="text-neutral-300 leading-relaxed">
              {product.aiReasoning || "Current price is significantly lower than the 90-day tracked average. If you need this product, this is a prime time to purchase."}
            </p>
            <div className="flex items-center space-x-4 pt-1 text-[11px] text-neutral-400">
              <span>Tracked on: <strong>{product.store}</strong></span>
              <span>Confidence: <strong className="text-emerald-400">96% High</strong></span>
            </div>
          </div>

          {/* Price History Section */}
          {product.priceHistory && product.priceHistory.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-neutral-300">Price Trend History</span>
                <span className="text-emerald-400 font-medium">
                  Lowest price tracked: <strong>{formatINR(lowestPrice)}</strong>
                </span>
              </div>

              {/* Visual Price History Graph */}
              <div className="p-4 rounded-2xl bg-neutral-950 border border-neutral-800">
                <div className="flex items-end justify-between h-24 pt-4 gap-2">
                  {product.priceHistory.map((item, idx) => {
                    const range = highestPrice - lowestPrice || 1;
                    const heightPercent = Math.max(20, Math.round(((item.price - lowestPrice) / range) * 80) + 20);
                    const isLowest = item.price === lowestPrice;

                    return (
                      <div key={idx} className="flex-1 flex flex-col items-center gap-1.5 group">
                        <span className="text-[10px] font-mono text-neutral-400 group-hover:text-white transition-colors">
                          {formatINR(item.price)}
                        </span>
                        <div className="w-full max-w-[28px] rounded-t-md bg-neutral-800 group-hover:bg-neutral-700 transition-all relative flex items-end justify-center" style={{ height: `${heightPercent}%` }}>
                          {isLowest && (
                            <div className="w-full h-full bg-emerald-500/30 rounded-t-md border-t-2 border-emerald-400" />
                          )}
                        </div>
                        <span className="text-[10px] text-neutral-500">{item.date}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* Bottom Action Triggers */}
          <div className="pt-2 border-t border-neutral-800 grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              onClick={() => {
                onClose();
                const merchantName = product.merchantName || product.store || 'OmniTech Solutions';
                const merchantId = product.merchantId || 'merchant-omni';
                const price = Number(product.sellingPrice || product.currentPrice || 5000);

                onStartNegotiation({
                  id: product.id || product.productId,
                  productId: product.productId || product.id,
                  title: product.name,
                  name: product.name,
                  merchantId,
                  merchantName,
                  soldBy: merchantName,
                  totalPrice: price,
                  retailPrice: price,
                  sellingPrice: price,
                  resolvedProduct: product,
                  resolvedMerchant: {
                    merchantId,
                    merchantName,
                    rating: product.rating || 4.8
                  },
                  items: [
                    {
                      id: product.id || product.productId,
                      productId: product.productId || product.id,
                      name: product.name,
                      category: product.category,
                      sellingPrice: price,
                      retailPrice: price,
                      brand: product.brand,
                      imageUrl: product.imageUrl,
                      specs: product.specs
                    }
                  ]
                });
              }}
              className="w-full py-2.5 px-4 rounded-xl bg-neutral-800 hover:bg-neutral-750 text-neutral-200 text-xs font-bold transition-colors flex items-center justify-center space-x-2"
            >
              <Zap className="w-4 h-4 text-amber-400" />
              <span>Negotiate Price with AI</span>
            </button>

            <button
              onClick={() => {
                onClose();
                const merchantName = product.merchantName || product.store || 'OmniTech Solutions';
                const merchantId = product.merchantId || 'merchant-omni';
                const price = Number(product.sellingPrice || product.currentPrice || 5000);

                onDirectCheckout({
                  id: product.id || product.productId,
                  productId: product.productId || product.id,
                  title: product.name,
                  name: product.name,
                  merchantId,
                  merchantName,
                  soldBy: merchantName,
                  totalPrice: price,
                  retailPrice: price,
                  sellingPrice: price,
                  finalPrice: price,
                  finalAmount: price,
                  discountAmount: 0,
                  resolvedProduct: product,
                  resolvedMerchant: {
                    merchantId,
                    merchantName,
                    rating: product.rating || 4.8
                  },
                  items: [
                    {
                      id: product.id || product.productId,
                      productId: product.productId || product.id,
                      name: product.name,
                      category: product.category,
                      sellingPrice: price,
                      retailPrice: price,
                      brand: product.brand,
                      imageUrl: product.imageUrl,
                      specs: product.specs
                    }
                  ]
                });
              }}
              className="w-full py-2.5 px-4 rounded-xl bg-white hover:bg-neutral-200 text-black text-xs font-bold transition-colors flex items-center justify-center space-x-1.5 shadow-md"
            >
              <span>Buy from {product.merchantName || product.store || 'Seller'} ({formatINR(product.sellingPrice || product.currentPrice)})</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
