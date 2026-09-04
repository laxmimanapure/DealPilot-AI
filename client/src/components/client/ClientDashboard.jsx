import React, { useState, useEffect } from 'react';
import ClientLayout from './ClientLayout';
import ClientHome from './ClientHome';
import ClientDiscover from './ClientDiscover';
import ClientSavedDeals from './ClientSavedDeals';
import ClientPriceAlerts from './ClientPriceAlerts';
import ClientSavings from './ClientSavings';

// Modals
import ProductDetailsModal from './ProductDetailsModal';
import CreateAlertModal from './CreateAlertModal';
import NotificationsDropdown from './NotificationsDropdown';

// Data
import { 
  MOCK_PRODUCTS, 
  MOCK_PRICE_ALERTS, 
  MOCK_NOTIFICATIONS, 
  MOCK_SAVINGS_DATA 
} from '../../data/mockClientProducts';

export default function ClientDashboard({
  user,
  onLogout,
  onNavigateHome,
  onStartNegotiation,
  onDirectCheckout
}) {
  // Navigation state
  const [activeTab, setActiveTab] = useState('home'); // 'home' | 'discover' | 'saved' | 'alerts' | 'savings'
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Interactive Client Data state (with localStorage backup)
  const [products] = useState(MOCK_PRODUCTS);
  
  const [savedProductIds, setSavedProductIds] = useState(() => {
    try {
      const saved = localStorage.getItem('dealpilot_saved_ids');
      return saved ? JSON.parse(saved) : ['prod-1', 'prod-2', 'prod-6'];
    } catch {
      return ['prod-1', 'prod-2', 'prod-6'];
    }
  });

  const [priceAlerts, setPriceAlerts] = useState(() => {
    try {
      const saved = localStorage.getItem('dealpilot_alerts');
      return saved ? JSON.parse(saved) : MOCK_PRICE_ALERTS;
    } catch {
      return MOCK_PRICE_ALERTS;
    }
  });

  const [notifications, setNotifications] = useState(() => {
    try {
      const saved = localStorage.getItem('dealpilot_notifs');
      return saved ? JSON.parse(saved) : MOCK_NOTIFICATIONS;
    } catch {
      return MOCK_NOTIFICATIONS;
    }
  });

  // Modal triggers
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [alertProduct, setAlertProduct] = useState(null);
  const [isNotifOpen, setIsNotifOpen] = useState(false);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('dealpilot_saved_ids', JSON.stringify(savedProductIds));
    } catch (e) {
      console.error(e);
    }
  }, [savedProductIds]);

  useEffect(() => {
    try {
      localStorage.setItem('dealpilot_alerts', JSON.stringify(priceAlerts));
    } catch (e) {
      console.error(e);
    }
  }, [priceAlerts]);

  // Wishlist toggle
  const handleToggleSave = (productId) => {
    setSavedProductIds((prev) =>
      prev.includes(productId) ? prev.filter(id => id !== productId) : [...prev, productId]
    );
  };

  // Price alert handlers
  const handleSaveAlert = (newAlert) => {
    setPriceAlerts((prev) => {
      const exists = prev.some(a => a.id === newAlert.id || (a.productId === newAlert.productId && a.id === alertProduct?.id));
      if (exists) {
        return prev.map(a => (a.id === newAlert.id || a.productId === newAlert.productId ? newAlert : a));
      }
      return [newAlert, ...prev];
    });
  };

  const handleToggleAlertStatus = (alertId) => {
    setPriceAlerts((prev) =>
      prev.map(a => a.id === alertId ? { ...a, active: !a.active } : a)
    );
  };

  const handleDeleteAlert = (alertId) => {
    setPriceAlerts((prev) => prev.filter(a => a.id !== alertId));
  };

  const handleEditAlert = (alert) => {
    const matchedProd = products.find(p => p.id === alert.productId);
    if (matchedProd) {
      setAlertProduct({ ...matchedProd, targetPrice: alert.targetPrice });
    }
  };

  const handleViewProductById = (productId) => {
    const prod = products.find(p => p.id === productId);
    if (prod) setSelectedProduct(prod);
  };

  const handleMarkAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, unread: false })));
  };

  const handleNotificationClick = (notif) => {
    setIsNotifOpen(false);
    // Find matching product if applicable
    if (notif.title.includes('AirPods')) {
      handleViewProductById('prod-2');
    } else if (notif.title.includes('Bose')) {
      handleViewProductById('prod-9');
    } else if (notif.title.includes('Nike')) {
      handleViewProductById('prod-6');
    }
  };

  return (
    <ClientLayout
      user={user}
      activeTab={activeTab}
      setActiveTab={setActiveTab}
      searchQuery={searchQuery}
      onSearchChange={setSearchQuery}
      savedCount={savedProductIds.length}
      activeAlertsCount={priceAlerts.filter(a => a.active).length}
      notifications={notifications}
      onLogout={onLogout}
      onNavigateHome={onNavigateHome}
      onOpenNotifications={() => setIsNotifOpen(!isNotifOpen)}
    >
      {/* Tab 1: Home Dashboard */}
      {activeTab === 'home' && (
        <ClientHome
          user={user}
          products={products}
          savedProductIds={savedProductIds}
          priceAlerts={priceAlerts}
          stats={MOCK_SAVINGS_DATA}
          onViewProduct={setSelectedProduct}
          onToggleSave={handleToggleSave}
          onOpenAlertModal={setAlertProduct}
          onNavigateTab={setActiveTab}
          onSelectCategory={setSelectedCategory}
          onStartNegotiation={onStartNegotiation}
          onDirectCheckout={onDirectCheckout}
        />
      )}

      {/* Tab 2: Discover Deals */}
      {activeTab === 'discover' && (
        <ClientDiscover
          products={products}
          savedProductIds={savedProductIds}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onViewProduct={setSelectedProduct}
          onToggleSave={handleToggleSave}
        />
      )}

      {/* Tab 3: Saved Deals */}
      {activeTab === 'saved' && (
        <ClientSavedDeals
          products={products}
          savedProductIds={savedProductIds}
          priceAlerts={priceAlerts}
          onToggleSave={handleToggleSave}
          onOpenAlertModal={setAlertProduct}
          onViewProduct={setSelectedProduct}
          onNavigateTab={setActiveTab}
        />
      )}

      {/* Tab 4: Price Alerts */}
      {activeTab === 'alerts' && (
        <ClientPriceAlerts
          alerts={priceAlerts}
          onToggleAlertStatus={handleToggleAlertStatus}
          onDeleteAlert={handleDeleteAlert}
          onEditAlert={handleEditAlert}
          onCreateNewAlert={() => setAlertProduct(products[0])}
          onViewProductById={handleViewProductById}
        />
      )}

      {/* Tab 5: My Savings */}
      {activeTab === 'savings' && (
        <ClientSavings
          onNavigateTab={setActiveTab}
        />
      )}

      {/* Product Details Modal */}
      {selectedProduct && (
        <ProductDetailsModal
          product={selectedProduct}
          isOpen={Boolean(selectedProduct)}
          onClose={() => setSelectedProduct(null)}
          isSaved={savedProductIds.includes(selectedProduct.id)}
          onToggleSave={handleToggleSave}
          onOpenAlertModal={(prod) => {
            setAlertProduct(prod);
          }}
          onStartNegotiation={onStartNegotiation}
          onDirectCheckout={onDirectCheckout}
        />
      )}

      {/* Create / Edit Price Alert Modal */}
      {alertProduct && (
        <CreateAlertModal
          product={alertProduct}
          isOpen={Boolean(alertProduct)}
          onClose={() => setAlertProduct(null)}
          onSaveAlert={handleSaveAlert}
        />
      )}

      {/* Notifications Popover */}
      <NotificationsDropdown
        notifications={notifications}
        isOpen={isNotifOpen}
        onClose={() => setIsNotifOpen(false)}
        onMarkAllAsRead={handleMarkAllRead}
        onNotificationClick={handleNotificationClick}
      />

    </ClientLayout>
  );
}
