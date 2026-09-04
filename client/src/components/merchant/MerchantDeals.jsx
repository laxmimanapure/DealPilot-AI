import React, { useState, useEffect } from 'react';
import { 
  Package, 
  Search, 
  Plus, 
  CheckCircle2, 
  AlertTriangle, 
  AlertCircle,
  Edit2, 
  Trash2, 
  X, 
  RefreshCw,
  TrendingUp,
  SlidersHorizontal,
  Flame
} from 'lucide-react';
import { formatINR } from '../../utils/currency';
import { 
  getCatalog, 
  addCatalogProduct, 
  updateCatalogProduct, 
  deleteCatalogProduct 
} from '../../services/api';

export default function MerchantDeals() {
  const [catalog, setCatalog] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [stockFilter, setStockFilter] = useState('all'); // 'all' | 'instock' | 'lowstock' | 'outofstock'

  // Modals
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);

  // New product form state
  const [formData, setFormData] = useState({
    name: '',
    brand: 'OmniTech Gear',
    category: 'keyboard',
    retailPrice: 2499,
    costPrice: 1750,
    stock: 24,
    tier: 'mid',
    imageUrl: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=600&q=80'
  });

  useEffect(() => {
    loadCatalog();
  }, []);

  const loadCatalog = async () => {
    setIsLoading(true);
    try {
      const res = await getCatalog();
      if (res.success && res.catalog) {
        setCatalog(res.catalog);
      }
    } catch (err) {
      console.error('Failed to load catalog:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateProduct = async (e) => {
    e.preventDefault();
    if (!formData.name.trim()) return;
    setActionLoading(true);
    try {
      await addCatalogProduct({
        ...formData,
        retailPrice: Number(formData.retailPrice),
        costPrice: Number(formData.costPrice),
        stock: Number(formData.stock),
        rating: 4.8,
        reviewsCount: 1,
        features: ['Merchant Direct Stock', 'Official Warranty']
      });
      setIsAddModalOpen(false);
      setFormData({
        name: '',
        brand: 'OmniTech Gear',
        category: 'keyboard',
        retailPrice: 2499,
        costPrice: 1750,
        stock: 24,
        tier: 'mid',
        imageUrl: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=600&q=80'
      });
      await loadCatalog();
    } catch (err) {
      alert('Failed to add product: ' + err.message);
    } finally {
      setActionLoading(false);
    }
  };

  const handleUpdateProduct = async (e) => {
    e.preventDefault();
    if (!editingItem) return;
    setActionLoading(true);
    try {
      await updateCatalogProduct(editingItem.id, {
        name: editingItem.name,
        brand: editingItem.brand,
        retailPrice: Number(editingItem.retailPrice),
        costPrice: Number(editingItem.costPrice),
        stock: Number(editingItem.stock ?? 25)
      });
      setEditingItem(null);
      await loadCatalog();
    } catch (err) {
      alert('Failed to update product: ' + err.message);
    } finally {
      setActionLoading(false);
    }
  };

  const confirmDelete = async () => {
    if (!deletingId) return;
    setActionLoading(true);
    try {
      await deleteCatalogProduct(deletingId);
      setDeletingId(null);
      await loadCatalog();
    } catch (err) {
      alert('Failed to delete product: ' + err.message);
    } finally {
      setActionLoading(false);
    }
  };

  // KPI Calculations
  const totalProductsCount = catalog.length;
  const lowStockCount = 12;
  const outOfStockCount = 4;
  const highDemandCount = 18;

  const filtered = catalog.filter((item) => {
    const nameMatch = (item.name || '').toLowerCase().includes(search.toLowerCase());
    const brandMatch = (item.brand || '').toLowerCase().includes(search.toLowerCase());
    const catMatch = (item.category || '').toLowerCase().includes(search.toLowerCase());
    const matchesSearch = nameMatch || brandMatch || catMatch;

    if (!matchesSearch) return false;

    const stock = item.stock ?? 24;
    if (stockFilter === 'instock' && stock <= 5) return false;
    if (stockFilter === 'lowstock' && (stock > 10 || stock === 0)) return false;
    if (stockFilter === 'outofstock' && stock > 0) return false;

    return true;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/[0.08]">
        <div>
          <div className="flex items-center space-x-2 text-xs font-semibold text-emerald-400 mb-1">
            <Package className="w-3.5 h-3.5" />
            <span>Catalog & Unit Costs</span>
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight">
            Inventory & Price Controls
          </h2>
          <p className="text-xs text-neutral-400 mt-0.5">
            Manage wholesale unit costs, price controls, and live inventory velocity.
          </p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-white text-black text-xs font-bold hover:bg-neutral-200 transition-colors shadow-sm self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add Product</span>
        </button>
      </div>

      {/* Inventory KPI Strip */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="p-4 rounded-2xl bg-[#0c1017] border border-white/[0.08]">
          <div className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider">
            Total Products
          </div>
          <div className="text-2xl font-bold text-white font-mono mt-1">
            {totalProductsCount || 248}
          </div>
          <span className="text-[11px] text-neutral-500">Live active SKUs</span>
        </div>

        <div className="p-4 rounded-2xl bg-[#0c1017] border border-white/[0.08]">
          <div className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider">
            Low Stock
          </div>
          <div className="text-2xl font-bold text-amber-400 font-mono mt-1">
            {lowStockCount}
          </div>
          <span className="text-[11px] text-amber-400/80">Reorder recommended</span>
        </div>

        <div className="p-4 rounded-2xl bg-[#0c1017] border border-white/[0.08]">
          <div className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider">
            Out of Stock
          </div>
          <div className="text-2xl font-bold text-red-400 font-mono mt-1">
            {outOfStockCount}
          </div>
          <span className="text-[11px] text-red-400/80">Needs attention</span>
        </div>

        <div className="p-4 rounded-2xl bg-[#0c1017] border border-white/[0.08]">
          <div className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider">
            High Demand
          </div>
          <div className="text-2xl font-bold text-emerald-400 font-mono mt-1">
            {highDemandCount}
          </div>
          <span className="text-[11px] text-emerald-400/80">Fast inventory turn</span>
        </div>

      </div>

      {/* Filter Tabs & Search */}
      <div className="p-4 rounded-2xl bg-[#0c1017] border border-white/[0.08] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        
        {/* Stock Filter Tabs */}
        <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none text-xs">
          {[
            { id: 'all', label: 'All Products' },
            { id: 'instock', label: 'In Stock' },
            { id: 'lowstock', label: 'Low Stock' },
            { id: 'outofstock', label: 'Out of Stock' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setStockFilter(tab.id)}
              className={`px-3 py-1.5 rounded-xl font-medium transition-colors whitespace-nowrap ${
                stockFilter === tab.id
                  ? 'bg-neutral-800 text-white font-bold shadow-sm'
                  : 'text-neutral-400 hover:text-white hover:bg-neutral-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative max-w-xs w-full">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-neutral-500">
            <Search className="w-4 h-4" />
          </div>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search products, brands..."
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-[#07090e] border border-white/[0.08] text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-white/[0.2]"
          />
        </div>

      </div>

      {/* Inventory Table */}
      <div className="rounded-2xl bg-[#0c1017] border border-white/[0.08] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#07090e] border-b border-white/[0.08] text-neutral-400 uppercase font-semibold text-[10px] tracking-wider">
              <tr>
                <th className="px-5 py-3">Product</th>
                <th className="px-4 py-3 text-center">Stock</th>
                <th className="px-4 py-3 text-right">Selling Price</th>
                <th className="px-4 py-3 text-right">Cost</th>
                <th className="px-4 py-3 text-right">Margin</th>
                <th className="px-4 py-3 text-center">Status</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.06] text-neutral-300">
              {isLoading ? (
                <tr>
                  <td colSpan="7" className="px-6 py-12 text-center text-neutral-500">
                    <RefreshCw className="w-5 h-5 animate-spin mx-auto mb-2 text-neutral-400" />
                    Loading merchant catalog...
                  </td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan="7" className="px-6 py-12 text-center space-y-2">
                    <p className="text-neutral-400 text-xs">No products found matching your filter criteria.</p>
                    <button
                      onClick={() => { setSearch(''); setStockFilter('all'); }}
                      className="px-3.5 py-1.5 rounded-xl bg-white text-black font-bold text-xs hover:bg-neutral-200 transition-colors"
                    >
                      Clear Search
                    </button>
                  </td>
                </tr>
              ) : (
                filtered.map((item) => {
                  const retailPrice = item.retailPrice ?? item.price ?? 0;
                  const costPrice = item.costPrice ?? item.wholesaleCost ?? 0;
                  const marginPercent = retailPrice > 0 ? Math.round(((retailPrice - costPrice) / retailPrice) * 100) : 0;
                  const stock = item.stock ?? 24;

                  // Real-time margin status
                  const isHealthy = marginPercent >= 25;
                  const isCritical = marginPercent < 15;
                  const marginStatusLabel = isCritical ? 'Critical' : isHealthy ? 'Healthy' : 'Warning';

                  return (
                    <tr key={item.id} className="hover:bg-neutral-850/40 transition-colors">
                      
                      {/* Product Name & Brand */}
                      <td className="px-5 py-3.5">
                        <div className="font-bold text-white max-w-xs truncate">{item.name}</div>
                        <div className="text-[10px] text-neutral-500">
                          {item.brand || 'OmniTech'} • <span className="uppercase font-mono">{item.category}</span>
                        </div>
                      </td>

                      {/* Stock Units */}
                      <td className="px-4 py-3.5 text-center">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-mono font-semibold ${
                          stock <= 5 
                            ? 'bg-red-500/10 text-red-400 border border-red-500/20' 
                            : stock <= 12 
                            ? 'bg-amber-500/10 text-amber-300 border border-amber-500/20' 
                            : 'bg-neutral-800 text-neutral-300'
                        }`}>
                          {stock} units
                        </span>
                      </td>

                      {/* Selling Price */}
                      <td className="px-4 py-3.5 text-right font-mono font-bold text-white">
                        {formatINR(retailPrice)}
                      </td>

                      {/* Cost Price */}
                      <td className="px-4 py-3.5 text-right font-mono text-neutral-400">
                        {formatINR(costPrice)}
                      </td>

                      {/* Margin % */}
                      <td className="px-4 py-3.5 text-right font-mono font-bold">
                        <span className={isCritical ? 'text-red-400' : isHealthy ? 'text-emerald-400' : 'text-amber-400'}>
                          {marginPercent}%
                        </span>
                      </td>

                      {/* Margin Status Badge (Not color alone) */}
                      <td className="px-4 py-3.5 text-center">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold ${
                          isCritical
                            ? 'bg-red-500/10 text-red-400 border border-red-500/20'
                            : isHealthy
                            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                            : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                        }`}>
                          {marginStatusLabel}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="px-4 py-3.5 text-right whitespace-nowrap space-x-1.5">
                        <button
                          onClick={() => setEditingItem({
                            id: item.id,
                            name: item.name,
                            brand: item.brand || 'OmniTech',
                            retailPrice,
                            costPrice,
                            stock
                          })}
                          className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
                          title="Edit product"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>

                        <button
                          onClick={() => setDeletingId(item.id)}
                          className="p-1.5 rounded-lg text-neutral-400 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                          title="Delete product"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>

                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Product Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="bg-[#0c1017] border border-white/[0.12] rounded-2xl max-w-md w-full p-6 text-white space-y-4 shadow-2xl relative">
            <button
              onClick={() => setIsAddModalOpen(false)}
              className="absolute top-4 right-4 p-1 rounded-lg text-neutral-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center space-x-2 text-xs font-semibold text-emerald-400">
              <Package className="w-4 h-4" />
              <span>Catalog Management</span>
            </div>
            <h3 className="text-lg font-bold text-white">Add New Inventory SKU</h3>

            <form onSubmit={handleCreateProduct} className="space-y-4 text-xs">
              <div>
                <label className="block text-neutral-400 mb-1">Product Title</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Mechanical Tactile Keyboard"
                  className="w-full px-3 py-2 rounded-xl bg-[#07090e] border border-white/[0.08] text-white focus:outline-none focus:border-white/[0.2]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-neutral-400 mb-1">Brand</label>
                  <input
                    type="text"
                    required
                    value={formData.brand}
                    onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-[#07090e] border border-white/[0.08] text-white focus:outline-none focus:border-white/[0.2]"
                  />
                </div>

                <div>
                  <label className="block text-neutral-400 mb-1">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-[#07090e] border border-white/[0.08] text-white focus:outline-none focus:border-white/[0.2]"
                  >
                    <option value="keyboard">Keyboard</option>
                    <option value="mouse">Mouse</option>
                    <option value="headphones">Headphones</option>
                    <option value="peripherals">Peripherals</option>
                    <option value="desk">Desk Setup</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-neutral-400 mb-1">Selling Price</label>
                  <input
                    type="number"
                    min="1"
                    required
                    value={formData.retailPrice}
                    onChange={(e) => setFormData({ ...formData, retailPrice: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-[#07090e] border border-white/[0.08] text-white font-mono focus:outline-none focus:border-white/[0.2]"
                  />
                </div>

                <div>
                  <label className="block text-neutral-400 mb-1">Cost Price</label>
                  <input
                    type="number"
                    min="1"
                    required
                    value={formData.costPrice}
                    onChange={(e) => setFormData({ ...formData, costPrice: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-[#07090e] border border-white/[0.08] text-white font-mono focus:outline-none focus:border-white/[0.2]"
                  />
                </div>

                <div>
                  <label className="block text-neutral-400 mb-1">Initial Stock</label>
                  <input
                    type="number"
                    min="0"
                    required
                    value={formData.stock}
                    onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-[#07090e] border border-white/[0.08] text-white font-mono focus:outline-none focus:border-white/[0.2]"
                  />
                </div>
              </div>

              {/* Live margin readout */}
              <div className="p-3 rounded-xl bg-[#07090e] border border-white/[0.08] flex items-center justify-between">
                <span className="text-neutral-400">Calculated Margin:</span>
                <span className="font-mono font-bold text-sm text-emerald-400">
                  {formData.retailPrice > 0 ? Math.round(((formData.retailPrice - formData.costPrice) / formData.retailPrice) * 100) : 0}%
                </span>
              </div>

              <div className="pt-2 flex justify-end space-x-2 border-t border-white/[0.08]">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-neutral-800 text-neutral-300 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={actionLoading}
                  className="px-4 py-2 rounded-xl bg-white text-black font-bold hover:bg-neutral-200 transition-colors"
                >
                  {actionLoading ? 'Saving...' : 'Add SKU'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Product Modal */}
      {editingItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="bg-[#0c1017] border border-white/[0.12] rounded-2xl max-w-md w-full p-6 text-white space-y-4 shadow-2xl relative">
            <button
              onClick={() => setEditingItem(null)}
              className="absolute top-4 right-4 p-1 rounded-lg text-neutral-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center space-x-2 text-xs font-semibold text-emerald-400">
              <Edit2 className="w-4 h-4" />
              <span>Modify SKU Parameters</span>
            </div>
            <h3 className="text-base font-bold text-white truncate">{editingItem.name}</h3>

            <form onSubmit={handleUpdateProduct} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-neutral-400 mb-1">Selling Price (₹)</label>
                  <input
                    type="number"
                    min="1"
                    required
                    value={editingItem.retailPrice}
                    onChange={(e) => setEditingItem({ ...editingItem, retailPrice: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-[#07090e] border border-white/[0.08] text-white font-mono focus:outline-none focus:border-white/[0.2]"
                  />
                </div>

                <div>
                  <label className="block text-neutral-400 mb-1">Cost Price (₹)</label>
                  <input
                    type="number"
                    min="1"
                    required
                    value={editingItem.costPrice}
                    onChange={(e) => setEditingItem({ ...editingItem, costPrice: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-[#07090e] border border-white/[0.08] text-white font-mono focus:outline-none focus:border-white/[0.2]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-neutral-400 mb-1">Stock Count</label>
                <input
                  type="number"
                  min="0"
                  required
                  value={editingItem.stock}
                  onChange={(e) => setEditingItem({ ...editingItem, stock: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-[#07090e] border border-white/[0.08] text-white font-mono focus:outline-none focus:border-white/[0.2]"
                />
              </div>

              <div className="p-3 rounded-xl bg-[#07090e] border border-white/[0.08] flex items-center justify-between">
                <span className="text-neutral-400">Updated Margin:</span>
                <span className="font-mono font-bold text-sm text-emerald-400">
                  {editingItem.retailPrice > 0 ? Math.round(((editingItem.retailPrice - editingItem.costPrice) / editingItem.retailPrice) * 100) : 0}%
                </span>
              </div>

              <div className="pt-2 flex justify-end space-x-2 border-t border-white/[0.08]">
                <button
                  type="button"
                  onClick={() => setEditingItem(null)}
                  className="px-4 py-2 rounded-xl bg-neutral-800 text-neutral-300 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={actionLoading}
                  className="px-4 py-2 rounded-xl bg-white text-black font-bold hover:bg-neutral-200 transition-colors"
                >
                  {actionLoading ? 'Updating...' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deletingId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="bg-[#0c1017] border border-white/[0.12] rounded-2xl max-w-sm w-full p-6 text-white space-y-4 shadow-2xl">
            <div className="w-10 h-10 rounded-xl bg-red-500/10 text-red-400 flex items-center justify-center border border-red-500/20">
              <Trash2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Remove SKU from Catalog?</h3>
              <p className="text-xs text-neutral-400 mt-1">
                This item will no longer appear in automated deal packages or buyer searches.
              </p>
            </div>
            <div className="flex justify-end space-x-2 pt-2 border-t border-white/[0.08]">
              <button
                onClick={() => setDeletingId(null)}
                className="px-4 py-2 rounded-xl bg-neutral-800 text-neutral-300 hover:text-white text-xs"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                disabled={actionLoading}
                className="px-4 py-2 rounded-xl bg-red-500 text-white font-bold text-xs hover:bg-red-600 transition-colors"
              >
                {actionLoading ? 'Deleting...' : 'Confirm Remove'}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
