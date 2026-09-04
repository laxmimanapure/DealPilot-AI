import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Filter, 
  ArrowUpDown, 
  Star, 
  Bookmark, 
  ArrowRight, 
  X,
  SlidersHorizontal,
  RotateCcw
} from 'lucide-react';
import { formatINR } from '../../utils/currency';
import { CATEGORIES, STORES } from '../../data/mockClientProducts';

export default function ClientDiscover({
  products,
  savedProductIds,
  selectedCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  onViewProduct,
  onToggleSave
}) {
  const [selectedStore, setSelectedStore] = useState('All Stores');
  const [priceRange, setPriceRange] = useState('all'); // 'all' | 'under-5000' | '5000-25000' | '25000-plus'
  const [minDiscount, setMinDiscount] = useState(0); // 0 | 15 | 25 | 35
  const [minRating, setMinRating] = useState(0); // 0 | 4.0 | 4.5
  const [sortBy, setSortBy] = useState('best-deal'); // 'best-deal' | 'price-asc' | 'discount-desc' | 'rating-desc'

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      // Search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchTitle = p.name.toLowerCase().includes(q);
        const matchBrand = p.brand.toLowerCase().includes(q);
        const matchStore = p.store.toLowerCase().includes(q);
        if (!matchTitle && !matchBrand && !matchStore) return false;
      }

      // Category
      if (selectedCategory && selectedCategory !== 'all' && p.category !== selectedCategory) {
        return false;
      }

      // Store
      if (selectedStore !== 'All Stores' && p.store !== selectedStore) {
        return false;
      }

      // Price Range
      if (priceRange === 'under-5000' && p.currentPrice >= 5000) return false;
      if (priceRange === '5000-25000' && (p.currentPrice < 5000 || p.currentPrice > 25000)) return false;
      if (priceRange === '25000-plus' && p.currentPrice <= 25000) return false;

      // Discount
      if (p.discountPercent < minDiscount) return false;

      // Rating
      if (p.rating < minRating) return false;

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.currentPrice - b.currentPrice;
      if (sortBy === 'discount-desc') return b.discountPercent - a.discountPercent;
      if (sortBy === 'rating-desc') return b.rating - a.rating;
      return b.discountPercent - a.discountPercent; // default: best deal
    });
  }, [products, searchQuery, selectedCategory, selectedStore, priceRange, minDiscount, minRating, sortBy]);

  const resetFilters = () => {
    onSelectCategory('all');
    setSelectedStore('All Stores');
    setPriceRange('all');
    setMinDiscount(0);
    setMinRating(0);
    setSortBy('best-deal');
    onSearchChange('');
  };

  const hasActiveFilters = 
    (selectedCategory && selectedCategory !== 'all') ||
    selectedStore !== 'All Stores' ||
    priceRange !== 'all' ||
    minDiscount > 0 ||
    minRating > 0 ||
    searchQuery.trim().length > 0;

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-neutral-800">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">
            Discover Deals
          </h1>
          <p className="text-xs text-neutral-400 mt-1">
            Compare prices, spot discounts, and uncover verified deals across major retailers.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          {hasActiveFilters && (
            <button
              onClick={resetFilters}
              className="inline-flex items-center space-x-1 px-3 py-1.5 rounded-xl bg-neutral-900 border border-neutral-800 hover:border-neutral-700 text-xs text-neutral-400 hover:text-white transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Filters</span>
            </button>
          )}

          <div className="text-xs text-neutral-400 font-mono">
            Showing <strong className="text-white">{filteredProducts.length}</strong> items
          </div>
        </div>
      </div>

      {/* Filter Controls Bar */}
      <div className="p-4 rounded-2xl bg-neutral-900/90 border border-neutral-800 space-y-4">
        
        {/* Row 1: Search & Sort */}
        <div className="flex flex-col md:flex-row gap-3 items-center justify-between">
          <div className="relative w-full md:max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-neutral-500">
              <Search className="w-4 h-4" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search products, brands or stores..."
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-neutral-950 border border-neutral-800 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-neutral-600"
            />
          </div>

          <div className="flex items-center space-x-2 w-full md:w-auto justify-end">
            <span className="text-xs text-neutral-400 whitespace-nowrap flex items-center space-x-1">
              <ArrowUpDown className="w-3.5 h-3.5" />
              <span>Sort by:</span>
            </span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-1.5 rounded-xl bg-neutral-950 border border-neutral-800 text-xs text-white focus:outline-none focus:border-neutral-600"
            >
              <option value="best-deal">Best Deal %</option>
              <option value="price-asc">Lowest Price</option>
              <option value="discount-desc">Biggest Discount</option>
              <option value="rating-desc">Highest Rated</option>
            </select>
          </div>
        </div>

        {/* Row 2: Category Pills */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-1 scrollbar-none">
          {CATEGORIES.map((cat) => {
            const isSelected = (selectedCategory || 'all') === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-colors flex-shrink-0 ${
                  isSelected
                    ? 'bg-white text-black font-bold shadow-sm'
                    : 'bg-neutral-950 border border-neutral-800 text-neutral-400 hover:text-white hover:border-neutral-700'
                }`}
              >
                {cat.name}
              </button>
            );
          })}
        </div>

        {/* Row 3: Store, Price Range, Minimum Discount */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 border-t border-neutral-800/80 text-xs">
          
          {/* Store Filter */}
          <div>
            <label className="block text-neutral-400 mb-1 text-[11px]">Store</label>
            <select
              value={selectedStore}
              onChange={(e) => setSelectedStore(e.target.value)}
              className="w-full px-3 py-1.5 rounded-xl bg-neutral-950 border border-neutral-800 text-white focus:outline-none focus:border-neutral-600"
            >
              {STORES.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>

          {/* Price Range */}
          <div>
            <label className="block text-neutral-400 mb-1 text-[11px]">Price Range</label>
            <select
              value={priceRange}
              onChange={(e) => setPriceRange(e.target.value)}
              className="w-full px-3 py-1.5 rounded-xl bg-neutral-950 border border-neutral-800 text-white focus:outline-none focus:border-neutral-600"
            >
              <option value="all">All Prices</option>
              <option value="under-5000">Under ₹5,000</option>
              <option value="5000-25000">₹5,000 – ₹25,000</option>
              <option value="25000-plus">Above ₹25,000</option>
            </select>
          </div>

          {/* Min Discount */}
          <div>
            <label className="block text-neutral-400 mb-1 text-[11px]">Minimum Discount</label>
            <select
              value={minDiscount}
              onChange={(e) => setMinDiscount(Number(e.target.value))}
              className="w-full px-3 py-1.5 rounded-xl bg-neutral-950 border border-neutral-800 text-white focus:outline-none focus:border-neutral-600"
            >
              <option value={0}>Any Discount</option>
              <option value={15}>15% or higher</option>
              <option value={25}>25% or higher</option>
              <option value={35}>35% or higher</option>
            </select>
          </div>

        </div>

      </div>

      {/* Product Grid */}
      {filteredProducts.length === 0 ? (
        <div className="py-16 text-center rounded-2xl bg-neutral-900/40 border border-neutral-800/80 space-y-3">
          <div className="text-3xl">🔎</div>
          <h3 className="text-base font-bold text-white">No deals match your filters</h3>
          <p className="text-xs text-neutral-400 max-w-sm mx-auto">
            Try adjusting your search terms, store selection, or discount thresholds to see more opportunities.
          </p>
          <button
            onClick={resetFilters}
            className="px-4 py-2 rounded-xl bg-white text-black text-xs font-bold hover:bg-neutral-200 transition-colors"
          >
            Clear All Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredProducts.map((prod) => {
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
                    <span className="text-neutral-300">{prod.store}</span>
                  </div>

                  <h4 className="text-xs font-bold text-white line-clamp-2 leading-snug group-hover:text-neutral-200">
                    {prod.name}
                  </h4>

                  <div className="flex items-center space-x-1 text-xs text-amber-400 mt-2">
                    <Star className="w-3.5 h-3.5 fill-amber-400" />
                    <span>{prod.rating}</span>
                    <span className="text-neutral-500 text-[10px]">({prod.reviewsCount?.toLocaleString()})</span>
                  </div>
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
      )}

    </div>
  );
}
