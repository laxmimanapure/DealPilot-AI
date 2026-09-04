import React, { useState } from 'react';
import MerchantLayout from './MerchantLayout';
import MerchantOverview from './MerchantOverview';
import MerchantDealsOffers from './MerchantDealsOffers';
import MerchantDeals from './MerchantDeals';
import MerchantOrders from './MerchantOrders';
import MerchantAnalytics from './MerchantAnalytics';
import MerchantGuardrails from './MerchantGuardrails';
import MerchantAIInsights from './MerchantAIInsights';
import AuditTrailViewer from '../AuditTrailViewer';

export default function MerchantDashboardContainer({
  user,
  onLogout,
  onNavigateHome
}) {
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'deals' | 'inventory' | 'orders' | 'analytics' | 'insights' | 'guardrails' | 'audit'
  const [timeRange, setTimeRange] = useState('30D');
  const [rulesSummary, setRulesSummary] = useState('Max 10% | ₹500 Cap | 8% Margin');

  const handleRulesUpdated = (newRules) => {
    setRulesSummary(
      `Max ${newRules.maxDiscountPercent}% | ₹${newRules.maxDiscountAmount} Cap | ${newRules.minProfitMarginPercent}% Margin`
    );
  };

  return (
    <MerchantLayout
      user={user}
      activeTab={activeTab}
      setActiveTab={setActiveTab}
      timeRange={timeRange}
      setTimeRange={setTimeRange}
      onLogout={onLogout}
      onNavigateHome={onNavigateHome}
      rulesSummary={rulesSummary}
    >
      {activeTab === 'overview' && (
        <MerchantOverview
          user={user}
          onNavigateTab={setActiveTab}
          timeRange={timeRange}
          setTimeRange={setTimeRange}
        />
      )}

      {activeTab === 'deals' && (
        <MerchantDealsOffers
          onNavigateTab={setActiveTab}
        />
      )}

      {activeTab === 'inventory' && (
        <MerchantDeals
          onNavigateTab={setActiveTab}
        />
      )}

      {activeTab === 'orders' && (
        <MerchantOrders
          onNavigateTab={setActiveTab}
        />
      )}

      {activeTab === 'analytics' && (
        <MerchantAnalytics
          onNavigateTab={setActiveTab}
          timeRange={timeRange}
          setTimeRange={setTimeRange}
        />
      )}

      {activeTab === 'insights' && (
        <MerchantAIInsights
          onNavigateTab={setActiveTab}
        />
      )}

      {activeTab === 'guardrails' && (
        <MerchantGuardrails
          onRulesUpdated={handleRulesUpdated}
        />
      )}

      {activeTab === 'audit' && (
        <div className="space-y-4">
          <AuditTrailViewer />
        </div>
      )}
    </MerchantLayout>
  );
}
