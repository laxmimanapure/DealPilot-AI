import React from 'react';
import { 
  Sparkles, 
  TrendingDown, 
  TrendingUp, 
  ArrowRight, 
  Bookmark, 
  Bell, 
  Star, 
  CheckCircle2, 
  Zap, 
  ExternalLink,
  ShieldCheck,
  ShoppingBag,
  Clock
} from 'lucide-react';
import { formatINR } from '../../utils/currency';
import { CATEGORIES } from '../../data/mockClientProducts';
import ClientMarketplaceDiscovery from './ClientMarketplaceDiscovery';

export default function ClientHome({
  user,
  products,
  savedProductIds,
  priceAlerts,
  stats,
  onViewProduct,
  onToggleSave,
  onOpenAlertModal,
  onNavigateTab,
  onSelectCategory,
  onStartNegotiation,
  onDirectCheckout
}) {
  const userName = user?.name || 'Shopper';

  // Separate categorized lists
  const pickProduct = products.find(p => p.isPick) || products[0];
  const trendingProducts = products.filter(p => p.isTrending).slice(0, 4);
  const recommendedProducts = products.filter(p => p.isRecommended).slice(0, 4);
  const priceDropProducts = products.filter(p => p.isPriceDrop).slice(0, 3);
  const savedProducts = products.filter(p => savedProductIds.includes(p.id));
  const activeAlert = priceAlerts.find(a => a.active) || priceAlerts[0];

  return (
    <div className="space-y-10 animate-in fade-in duration-200">
      
      {/* 1. Welcome Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-neutral-800/80">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Good afternoon, {userName} 👋
          </h1>
          <p className="text-xs sm:text-sm text-neutral-400 mt-1">
            Find better deals. Save more. DealPilot is tracking 14,000+ products for you.
          </p>
        </div>

        {/* Subtle Ambient Badge */}
        <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-neutral-900 border border-neutral-800 text-xs text-neutral-300 self-start md:self-auto shadow-sm">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-medium">AI Price Monitor Active</span>
        </div>
      </div>

      {/* 2. Cross-Merchant Marketplace Discovery Engine */}
      <ClientMarketplaceDiscovery
        onSelectProductForDeal={(prod, plan) => {
          onViewProduct({
            ...prod,
            plan,
            merchantId: plan.merchantId,
            merchantName: plan.soldBy,
            store: plan.soldBy
          });
        }}
        onStartNegotiation={onStartNegotiation}
        onDirectCheckout={onDirectCheckout}
      />

      {/* 3. Quick Stats (3-4 Compact Cards) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        
        {/* Total Savings */}
        <div className="p-4 rounded-2xl bg-neutral-900/90 border border-neutral-800/90 hover:border-neutral-700 transition-colors">
          <div className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider">
            Total Savings
          </div>
          <div className="text-xl sm:text-2xl font-black text-white font-mono mt-1">
            {formatINR(stats?.totalSaved || 12450)}
          </div>
          <p className="text-[11px] text-emerald-400 font-medium mt-1">
            Saved with DealPilot
          </p>
        </div>

        {/* Deals Saved */}
        <div className="p-4 rounded-2xl bg-neutral-900/90 border border-neutral-800/90 hover:border-neutral-700 transition-colors">
          <div className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider">
            Deals Saved
          </div>
          <div className="text-xl sm:text-2xl font-black text-white font-mono mt-1">
            {savedProductIds.length || 24}
          </div>
          <p className="text-[11px] text-neutral-400 mt-1">
            Across your wishlist
          </p>
        </div>

        {/* Price Alerts */}
        <div className="p-4 rounded-2xl bg-neutral-900/90 border border-neutral-800/90 hover:border-neutral-700 transition-colors">
          <div className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider">
            Price Alerts
          </div>
          <div className="text-xl sm:text-2xl font-black text-white font-mono mt-1">
            {priceAlerts.filter(a => a.active).length || 6}
          </div>
          <p className="text-[11px] text-amber-400 font-medium mt-1">
            Currently active
          </p>
        </div>

        {/* Best Deal Found */}
        <div className="p-4 rounded-2xl bg-neutral-900/90 border border-neutral-800/90 hover:border-neutral-700 transition-colors">
          <div className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider">
            Best Deal Found
          </div>
          <div className="text-xl sm:text-2xl font-black text-white font-mono mt-1">
            42% OFF
          </div>
          <p className="text-[11px] text-neutral-400 mt-1">
            Your biggest saving
          </p>
        </div>

      </div>

      {/* 3. DealPilot Pick (Hero AI Recommendation) */}
      {pickProduct && (
        <div className="rounded-3xl bg-neutral-900/95 border border-neutral-800 overflow-hidden shadow-xl p-5 sm:p-7 relative">
          
          <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-emerald-400 mb-4">
            <Sparkles className="w-4 h-4" />
            <span>DealPilot Pick</span>
            <span className="text-neutral-600">•</span>
            <span className="text-neutral-400 normal-case font-normal text-xs">
              We found a better price for something you may like.
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            
            {/* Image Preview */}
            <div className="md:col-span-4 rounded-2xl overflow-hidden bg-neutral-950 border border-neutral-800 aspect-video md:aspect-square relative group">
              <img
                src={pickProduct.imageUrl}
                alt={pickProduct.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-bold bg-black/80 backdrop-blur-md text-emerald-400 border border-emerald-500/30">
                {pickProduct.discountPercent}% OFF
              </span>
            </div>

            {/* Product Meta & Explanation */}
            <div className="md:col-span-8 space-y-4">
              <div>
                <div className="flex items-center space-x-2 text-xs text-neutral-400 mb-1">
                  <span>{pickProduct.brand}</span>
                  <span>•</span>
                  <span className="text-neutral-300">{pickProduct.store}</span>
                  <span>•</span>
                  <div className="flex items-center text-amber-400">
                    <Star className="w-3.5 h-3.5 fill-amber-400 mr-1" />
                    <span>{pickProduct.rating}</span>
                  </div>
                </div>

                <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                  {pickProduct.name}
                </h3>
              </div>

              {/* Price Row */}
              <div className="flex items-baseline space-x-3">
                <span className="text-2xl sm:text-3xl font-black text-white font-mono">
                  {formatINR(pickProduct.currentPrice)}
                </span>
                <span className="text-sm text-neutral-500 line-through font-mono">
                  {formatINR(pickProduct.originalPrice)}
                </span>
                <span className="text-xs font-semibold text-emerald-400">
                  Save {formatINR(pickProduct.originalPrice - pickProduct.currentPrice)}
                </span>
              </div>

              {/* "Why this deal?" Box */}
              <div className="p-3.5 rounded-xl bg-neutral-950 border border-neutral-800 text-xs text-neutral-300 space-y-1">
                <div className="font-semibold text-neutral-200">Why this deal?</div>
                <p className="text-neutral-400 leading-relaxed">
                  {pickProduct.aiReasoning || "Price is 18% lower than the average price we've tracked over the last 90 days."}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center space-x-3 pt-1">
                <button
                  onClick={() => onViewProduct(pickProduct)}
                  className="px-5 py-2.5 rounded-xl bg-white text-black text-xs font-bold hover:bg-neutral-200 transition-colors flex items-center space-x-1.5 shadow-md"
                >
                  <span>View Deal</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => onToggleSave(pickProduct.id)}
                  className={`px-4 py-2.5 rounded-xl border text-xs font-semibold flex items-center space-x-1.5 transition-colors ${
                    savedProductIds.includes(pickProduct.id)
                      ? 'bg-red-500/10 border-red-500/30 text-red-400'
                      : 'bg-neutral-800 border-neutral-700 text-neutral-300 hover:text-white'
                  }`}
                >
                  <Bookmark className={`w-3.5 h-3.5 ${savedProductIds.includes(pickProduct.id) ? 'fill-red-400' : ''}`} />
                  <span>{savedProductIds.includes(pickProduct.id) ? 'Saved' : 'Save Deal'}</span>
                </button>
              </div>

            </div>

          </div>
        </div>
      )}

      {/* 4. Horizontal Categories Pill Bar */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs font-semibold text-neutral-400 uppercase tracking-wider">
          <span>Explore by Category</span>
          <button 
            onClick={() => onNavigateTab('discover')}
            className="text-neutral-400 hover:text-white transition-colors normal-case"
          >
            All categories →
          </button>
        </div>

        <div className="flex items-center space-x-2 overflow-x-auto pb-2 scrollbar-none">
          {CATEGORIES.filter(c => c.id !== 'all').map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                onSelectCategory(cat.id);
                onNavigateTab('discover');
              }}
              className="px-3.5 py-2 rounded-xl bg-neutral-900 border border-neutral-800 hover:border-neutral-700 text-xs text-neutral-300 hover:text-white transition-colors flex-shrink-0 flex items-center space-x-1.5"
            >
              <span>{cat.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* 5. Trending Deals Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-white tracking-tight">Trending Deals</h2>
            <p className="text-xs text-neutral-400 mt-0.5">
              Popular deals shoppers are checking right now
            </p>
          </div>
          <button
            onClick={() => onNavigateTab('discover')}
            className="text-xs font-semibold text-neutral-400 hover:text-white transition-colors"
          >
            View all ({products.length}) →
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {trendingProducts.map((prod) => {
            const isSaved = savedProductIds.includes(prod.id);
            return (
              <div
                key={prod.id}
                className="group rounded-2xl bg-neutral-900/80 border border-neutral-800 hover:border-neutral-700/80 transition-all duration-200 flex flex-col justify-between p-4 space-y-3"
              >
                <div>
                  {/* Thumbnail & Bookmark */}
                  <div className="aspect-video w-full rounded-xl overflow-hidden bg-neutral-950 border border-neutral-800 relative mb-3">
                    <img
                      src={prod.imageUrl}
                      alt={prod.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleSave(prod.id);
                      }}
                      className="absolute top-2 right-2 p-1.5 rounded-lg bg-black/60 backdrop-blur-md text-neutral-400 hover:text-white transition-colors"
                    >
                      <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'text-red-400 fill-red-400' : ''}`} />
                    </button>
                    <span className="absolute bottom-2 left-2 px-2 py-0.5 rounded text-[10px] font-bold bg-black/80 text-emerald-400">
                      {prod.discountPercent}% OFF
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-neutral-400 mb-1">
                    <span>{prod.brand}</span>
                    <span>{prod.store}</span>
                  </div>

                  <h4 className="text-xs font-bold text-white line-clamp-2 leading-snug group-hover:text-neutral-200">
                    {prod.name}
                  </h4>
                </div>

                <div className="space-y-3 pt-2 border-t border-neutral-800/80">
                  <div className="flex items-baseline justify-between">
                    <span className="text-base font-bold text-white font-mono">
                      {formatINR(prod.currentPrice)}
                    </span>
                    <span className="text-[11px] text-neutral-500 line-through font-mono">
                      {formatINR(prod.originalPrice)}
                    </span>
                  </div>

                  <button
                    onClick={() => onViewProduct(prod)}
                    className="w-full py-2 rounded-xl bg-neutral-800 hover:bg-neutral-750 text-neutral-200 text-xs font-semibold transition-colors flex items-center justify-center space-x-1"
                  >
                    <span>View Deal</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

              </div>
            );
          })}
        </div>
      </div>

      {/* 6. Recommended For You */}
      <div className="space-y-4">
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight">Recommended for you</h2>
          <p className="text-xs text-neutral-400 mt-0.5">
            Personalized matches based on your tracked categories and price preferences
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {recommendedProducts.map((prod) => {
            const isSaved = savedProductIds.includes(prod.id);
            return (
              <div
                key={prod.id}
                className="group rounded-2xl bg-neutral-900/80 border border-neutral-800 hover:border-neutral-700/80 transition-all duration-200 flex flex-col justify-between p-4 space-y-3"
              >
                <div>
                  {/* Subtle Label */}
                  <div className="mb-2">
                    <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-neutral-950 border border-neutral-800 text-neutral-400">
                      {prod.recommendationContext || 'Great value'}
                    </span>
                  </div>

                  <div className="aspect-video w-full rounded-xl overflow-hidden bg-neutral-950 border border-neutral-800 relative mb-3">
                    <img
                      src={prod.imageUrl}
                      alt={prod.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleSave(prod.id);
                      }}
                      className="absolute top-2 right-2 p-1.5 rounded-lg bg-black/60 backdrop-blur-md text-neutral-400 hover:text-white transition-colors"
                    >
                      <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'text-red-400 fill-red-400' : ''}`} />
                    </button>
                  </div>

                  <h4 className="text-xs font-bold text-white line-clamp-2 leading-snug">
                    {prod.name}
                  </h4>
                  <div className="text-[11px] text-neutral-400 mt-1">{prod.store}</div>
                </div>

                <div className="space-y-3 pt-2 border-t border-neutral-800/80">
                  <div className="flex items-baseline justify-between">
                    <span className="text-base font-bold text-white font-mono">
                      {formatINR(prod.currentPrice)}
                    </span>
                    <span className="text-xs font-semibold text-emerald-400">
                      Save {formatINR(prod.originalPrice - prod.currentPrice)}
                    </span>
                  </div>

                  <button
                    onClick={() => onViewProduct(prod)}
                    className="w-full py-2 rounded-xl bg-neutral-800 hover:bg-neutral-750 text-neutral-200 text-xs font-semibold transition-colors flex items-center justify-center space-x-1"
                  >
                    <span>View Deal</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

              </div>
            );
          })}
        </div>
      </div>

      {/* 7. Price Drops Section */}
      <div className="rounded-3xl bg-neutral-900/70 border border-neutral-800 p-5 sm:p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center space-x-1.5 text-xs font-bold text-emerald-400 uppercase tracking-wider">
              <TrendingDown className="w-4 h-4" />
              <span>Price Drops</span>
            </div>
            <h3 className="text-lg font-bold text-white mt-0.5">
              Recent Price Reductions
            </h3>
          </div>

          <button
            onClick={() => onNavigateTab('discover')}
            className="text-xs font-semibold text-neutral-400 hover:text-white transition-colors flex items-center space-x-1"
          >
            <span>See all price drops</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {priceDropProducts.map((prod) => (
            <div
              key={prod.id}
              onClick={() => onViewProduct(prod)}
              className="p-3.5 rounded-2xl bg-neutral-950 border border-neutral-800/80 hover:border-neutral-700 cursor-pointer transition-all flex items-center space-x-3.5 group"
            >
              <img
                src={prod.imageUrl}
                alt={prod.name}
                className="w-14 h-14 object-cover rounded-xl border border-neutral-800 flex-shrink-0 group-hover:scale-105 transition-transform"
              />
              <div className="min-w-0 flex-1">
                <h4 className="text-xs font-bold text-white truncate group-hover:text-emerald-300 transition-colors">
                  {prod.name}
                </h4>
                <div className="flex items-baseline space-x-2 mt-0.5">
                  <span className="text-xs text-neutral-500 line-through font-mono">
                    Was: {formatINR(prod.previousPrice || prod.originalPrice)}
                  </span>
                  <span className="text-xs font-bold text-white font-mono">
                    Now: {formatINR(prod.currentPrice)}
                  </span>
                </div>
                <div className="text-[11px] font-semibold text-emerald-400 flex items-center space-x-1 mt-0.5">
                  <TrendingDown className="w-3 h-3" />
                  <span>{formatINR(prod.priceDropAmount || (prod.originalPrice - prod.currentPrice))} lower</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 8. Saved Deals Preview & Price Alert Preview (Split Grid) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        
        {/* Saved Deals Preview */}
        <div className="p-5 rounded-3xl bg-neutral-900/80 border border-neutral-800 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white flex items-center space-x-2">
              <Bookmark className="w-4 h-4 text-neutral-400" />
              <span>Your Saved Deals</span>
            </h3>
            <button
              onClick={() => onNavigateTab('saved')}
              className="text-xs text-neutral-400 hover:text-white transition-colors"
            >
              View all ({savedProducts.length}) →
            </button>
          </div>

          {savedProducts.length === 0 ? (
            <div className="py-8 text-center space-y-2">
              <p className="text-xs text-neutral-400">
                Save products you're interested in and DealPilot will keep an eye on their prices.
              </p>
              <button
                onClick={() => onNavigateTab('discover')}
                className="px-4 py-2 rounded-xl bg-white text-black text-xs font-bold hover:bg-neutral-200 transition-colors"
              >
                Discover Deals
              </button>
            </div>
          ) : (
            <div className="space-y-2.5">
              {savedProducts.slice(0, 3).map((prod) => (
                <div
                  key={prod.id}
                  onClick={() => onViewProduct(prod)}
                  className="p-2.5 rounded-xl bg-neutral-950 border border-neutral-800/80 hover:border-neutral-700 cursor-pointer flex items-center justify-between text-xs"
                >
                  <div className="flex items-center space-x-2.5 min-w-0">
                    <img src={prod.imageUrl} alt="" className="w-9 h-9 object-cover rounded-lg" />
                    <span className="font-semibold text-white truncate max-w-[160px] sm:max-w-xs">{prod.name}</span>
                  </div>
                  <span className="font-mono font-bold text-white">{formatINR(prod.currentPrice)}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Price Alert Preview */}
        <div className="p-5 rounded-3xl bg-neutral-900/80 border border-neutral-800 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white flex items-center space-x-2">
              <Bell className="w-4 h-4 text-amber-400" />
              <span>Active Price Alert</span>
            </h3>
            <button
              onClick={() => onNavigateTab('alerts')}
              className="text-xs text-neutral-400 hover:text-white transition-colors"
            >
              Manage Alerts →
            </button>
          </div>

          {activeAlert ? (
            <div className="p-4 rounded-2xl bg-neutral-950 border border-neutral-800 space-y-3">
              <div className="flex items-center space-x-3">
                <img src={activeAlert.imageUrl} alt="" className="w-12 h-12 object-cover rounded-xl" />
                <div className="min-w-0 flex-1">
                  <div className="font-bold text-white text-xs truncate">{activeAlert.productName}</div>
                  <div className="flex items-center space-x-2 text-[11px] text-neutral-400 mt-0.5">
                    <span>Target: <strong className="text-white">{formatINR(activeAlert.targetPrice)}</strong></span>
                    <span>•</span>
                    <span>Current: {formatINR(activeAlert.currentPrice)}</span>
                  </div>
                </div>
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                  activeAlert.status === 'Target Met'
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                    : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                }`}>
                  {activeAlert.status}
                </span>
              </div>
            </div>
          ) : (
            <div className="py-8 text-center text-xs text-neutral-500">
              No active price alerts. Click any deal to set an alert.
            </div>
          )}
        </div>

      </div>

      {/* 9. Minimal Bottom CTA */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-neutral-900 to-neutral-950 border border-neutral-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
            Never overpay again.
          </h3>
          <p className="text-xs text-neutral-400 mt-1">
            Let DealPilot monitor prices, compare stores, and find better deals for you.
          </p>
        </div>

        <button
          onClick={() => onNavigateTab('discover')}
          className="px-5 py-2.5 rounded-xl bg-white text-black text-xs font-bold hover:bg-neutral-200 transition-colors flex-shrink-0 self-start sm:self-auto"
        >
          Discover More Deals
        </button>
      </div>

    </div>
  );
}
