import React, { useState, useEffect } from 'react';
import LandingPage from './components/landing/LandingPage';
import RoleSelectModal from './components/auth/RoleSelectModal';
import ClientLogin from './components/auth/ClientLogin';
import MerchantLogin from './components/auth/MerchantLogin';
import ClientDashboard from './components/client/ClientDashboard';
import MerchantDashboardContainer from './components/merchant/MerchantDashboardContainer';

// Reusable existing functional modals
import DemoPresets from './components/DemoPresets';
import NegotiationModal from './components/NegotiationModal';
import CheckoutModal from './components/CheckoutModal';
import { generatePlans, getCurrentUser, clearAuth, getAuthToken } from './services/api';

export default function App() {
  // Current URL route state
  const [currentPath, setCurrentPath] = useState(
    typeof window !== 'undefined' ? window.location.pathname : '/'
  );

  // User authentication state with localStorage persistence
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('dealpilot_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // Startup JWT session verification with backend /api/auth/me
  useEffect(() => {
    const token = getAuthToken();
    if (token) {
      getCurrentUser(token)
        .then((verifiedUser) => {
          if (verifiedUser) {
            setUser(verifiedUser);
          } else {
            // Token was invalid or expired
            setUser(null);
            clearAuth();
          }
        })
        .catch(() => {
          // If network is offline, retain local state if already present
          const saved = localStorage.getItem('dealpilot_user');
          if (!saved) {
            setUser(null);
            clearAuth();
          }
        });
    }
  }, []);

  // Modal states
  const [isRoleModalOpen, setIsRoleModalOpen] = useState(false);
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
  const [isNegotiationModalOpen, setIsNegotiationModalOpen] = useState(false);
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);

  // Active deals for negotiation & checkout
  const [activeNegotiatingPlan, setActiveNegotiatingPlan] = useState(null);
  const [activeCheckoutDeal, setActiveCheckoutDeal] = useState(null);

  // Client planner state (100% preserving existing functional state)
  const [plansResult, setPlansResult] = useState(null);
  const [isLoadingPlans, setIsLoadingPlans] = useState(false);
  const [currentBudget, setCurrentBudget] = useState(5000);
  const [currentCategories, setCurrentCategories] = useState(['keyboard', 'mouse', 'headphones']);
  const [currentPrompt, setCurrentPrompt] = useState('I have ₹5000 and need a keyboard, mouse, and headphones.');

  // Browser navigation history popstate listener
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Programmatic navigation helper
  const navigate = (toPath) => {
    if (window.location.pathname !== toPath) {
      window.history.pushState({}, '', toPath);
    }
    setCurrentPath(toPath);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Generate initial hero plan on load for instant client readiness
  useEffect(() => {
    handleGeneratePlans({
      budget: 5000,
      categories: ['keyboard', 'mouse', 'headphones'],
      query: 'I have ₹5000 and need a keyboard, mouse, and headphones.'
    });
  }, []);

  const handleGeneratePlans = async (params) => {
    setIsLoadingPlans(true);
    setCurrentBudget(params.budget || 5000);
    if (params.categories) setCurrentCategories(params.categories);
    if (params.query) setCurrentPrompt(params.query);

    try {
      const res = await generatePlans(params);
      if (res.success && res.data) {
        setPlansResult(res.data);
      }
    } catch (err) {
      console.error('Failed to generate plans:', err);
    } finally {
      setIsLoadingPlans(false);
    }
  };

  const handleSelectDemoPreset = (preset) => {
    setCurrentBudget(preset.budget);
    setCurrentCategories(preset.categories);
    setCurrentPrompt(preset.prompt);
    handleGeneratePlans({
      budget: preset.budget,
      categories: preset.categories,
      query: preset.prompt
    });
  };

  const handleStartNegotiation = (plan) => {
    setActiveNegotiatingPlan(plan);
    setIsNegotiationModalOpen(true);
  };

  const handleDirectCheckout = (plan) => {
    const resolvedProduct = plan.resolvedProduct || (plan.items && plan.items[0]) || plan;
    const merchantName = plan.soldBy || plan.merchantName || plan.resolvedMerchant?.merchantName || 'OmniTech Solutions';
    const merchantId = plan.merchantId || plan.resolvedMerchant?.merchantId || 'merchant-omni';
    const price = Number(plan.totalPrice || resolvedProduct.sellingPrice || resolvedProduct.retailPrice || 5000);

    setActiveCheckoutDeal({
      plan,
      resolvedProduct,
      merchantId,
      merchantName,
      soldBy: merchantName,
      finalPrice: price,
      finalAmount: price,
      originalTotal: price,
      subtotal: price,
      discountAmount: 0,
      discount: 0,
      wholesaleCost: plan.wholesaleCost || Math.round(price * 0.72),
      profitMarginPercent: plan.profitMarginPercent || 25,
      items: [
        {
          productId: resolvedProduct.productId || resolvedProduct.id,
          productName: resolvedProduct.name,
          quantity: 1,
          originalPrice: price,
          negotiatedPrice: price
        }
      ],
      perks: [],
      round: 1,
      customerBudget: currentBudget
    });
    setIsCheckoutModalOpen(true);
  };

  const handleProceedFromNegotiationToCheckout = (dealData) => {
    setIsNegotiationModalOpen(false);
    setActiveCheckoutDeal(dealData);
    setIsCheckoutModalOpen(true);
  };

  const handleLoginSuccess = (userData) => {
    setUser(userData);
    try {
      localStorage.setItem('dealpilot_user', JSON.stringify(userData));
    } catch (e) {
      console.error(e);
    }

    if (userData.role === 'client') {
      navigate('/client/dashboard');
    } else if (userData.role === 'merchant') {
      navigate('/merchant/dashboard');
    }
  };

  const handleLogout = () => {
    setUser(null);
    clearAuth();
    navigate('/');
  };

  // ROUTING & STRICT ROLE AUTHORIZATION GUARDS
  let view = null;

  if (currentPath === '/role-select') {
    view = (
      <RoleSelectModal
        isStandalone={true}
        isOpen={true}
        onClose={() => navigate('/')}
        onSelectClient={() => navigate('/client/login')}
        onSelectMerchant={() => navigate('/merchant/login')}
      />
    );
  } else if (currentPath === '/client/login') {
    // If already logged in as client, redirect to dashboard
    if (user && user.role === 'client') {
      navigate('/client/dashboard');
      return null;
    }
    view = (
      <ClientLogin
        onLoginSuccess={handleLoginSuccess}
        onNavigateToMerchantLogin={() => navigate('/merchant/login')}
        onNavigateHome={() => navigate('/')}
      />
    );
  } else if (currentPath === '/merchant/login') {
    // If already logged in as merchant, redirect to dashboard
    if (user && user.role === 'merchant') {
      navigate('/merchant/dashboard');
      return null;
    }
    view = (
      <MerchantLogin
        onLoginSuccess={handleLoginSuccess}
        onNavigateToClientLogin={() => navigate('/client/login')}
        onNavigateHome={() => navigate('/')}
      />
    );
  } else if (currentPath === '/client/dashboard') {
    // Role guard: Unauthenticated -> /client/login
    if (!user) {
      navigate('/client/login');
      return null;
    }
    // Role guard: Merchant trying to access client dashboard -> redirect to merchant dashboard
    if (user.role !== 'client') {
      navigate('/merchant/dashboard');
      return null;
    }
    view = (
      <ClientDashboard
        user={user}
        onLogout={handleLogout}
        onNavigateHome={() => navigate('/')}
        plansResult={plansResult}
        isLoadingPlans={isLoadingPlans}
        onGeneratePlans={handleGeneratePlans}
        currentBudget={currentBudget}
        currentCategories={currentCategories}
        currentPrompt={currentPrompt}
        onStartNegotiation={handleStartNegotiation}
        onDirectCheckout={handleDirectCheckout}
        onOpenDemoPresets={() => setIsDemoModalOpen(true)}
      />
    );
  } else if (currentPath === '/merchant/dashboard') {
    // Role guard: Unauthenticated -> /merchant/login
    if (!user) {
      navigate('/merchant/login');
      return null;
    }
    // Role guard: Client trying to access merchant dashboard -> redirect to client dashboard
    if (user.role !== 'merchant') {
      navigate('/client/dashboard');
      return null;
    }
    view = (
      <MerchantDashboardContainer
        user={user}
        onLogout={handleLogout}
        onNavigateHome={() => navigate('/')}
      />
    );
  } else {
    // Default Route: Public Landing Page (/)
    view = (
      <LandingPage
        onOpenRoleSelect={() => setIsRoleModalOpen(true)}
        onNavigateToClientLogin={() => navigate('/client/login')}
        onNavigateToMerchantLogin={() => navigate('/merchant/login')}
      />
    );
  }

  return (
    <>
      {view}

      {/* Global Modals */}
      <RoleSelectModal
        isOpen={isRoleModalOpen}
        onClose={() => setIsRoleModalOpen(false)}
        onSelectClient={() => {
          setIsRoleModalOpen(false);
          navigate('/client/login');
        }}
        onSelectMerchant={() => {
          setIsRoleModalOpen(false);
          navigate('/merchant/login');
        }}
      />

      <DemoPresets
        isOpen={isDemoModalOpen}
        onClose={() => setIsDemoModalOpen(false)}
        onSelectPreset={handleSelectDemoPreset}
      />

      <NegotiationModal
        isOpen={isNegotiationModalOpen}
        onClose={() => setIsNegotiationModalOpen(false)}
        plan={activeNegotiatingPlan}
        customerBudget={currentBudget}
        onProceedToCheckout={handleProceedFromNegotiationToCheckout}
      />

      <CheckoutModal
        isOpen={isCheckoutModalOpen}
        onClose={() => setIsCheckoutModalOpen(false)}
        dealData={activeCheckoutDeal}
        onPaymentSuccess={() => {
          // Keep active checkout updated or refreshed
        }}
      />
    </>
  );
}
