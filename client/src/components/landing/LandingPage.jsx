import React from 'react';
import LandingNavbar from './LandingNavbar';
import HeroSection from './HeroSection';
import DualExperienceSection from './DualExperienceSection';
import HowItWorksSection from './HowItWorksSection';
import FinalCTASection from './FinalCTASection';
import LandingFooter from './LandingFooter';

export default function LandingPage({
  onOpenRoleSelect,
  onNavigateToClientLogin,
  onNavigateToMerchantLogin
}) {
  return (
    <div className="min-h-screen bg-[#050505] text-zinc-100 selection:bg-white selection:text-black font-sans antialiased overflow-x-hidden">
      {/* 1. Floating Minimal Monochrome Navbar */}
      <LandingNavbar
        onOpenRoleSelect={onOpenRoleSelect}
        onNavigateToClientLogin={onNavigateToClientLogin}
        onNavigateToMerchantLogin={onNavigateToMerchantLogin}
      />

      <main>
        {/* 2. Cinematic Monochrome Hero Section */}
        <HeroSection
          onOpenRoleSelect={onOpenRoleSelect}
          onExploreClient={onNavigateToClientLogin}
          onExploreMerchant={onNavigateToMerchantLogin}
        />

        {/* 3. One Platform. Two Powerful Experiences. */}
        <DualExperienceSection
          onExploreClient={onNavigateToClientLogin}
          onExploreMerchant={onNavigateToMerchantLogin}
        />

        {/* 4. How It Works (Short 4 Steps + Compact AI Value Card) */}
        <HowItWorksSection />

        {/* 5. Minimal Final CTA */}
        <FinalCTASection
          onExploreClient={onNavigateToClientLogin}
          onExploreMerchant={onNavigateToMerchantLogin}
        />
      </main>

      {/* 6. Minimal Footer */}
      <LandingFooter />
    </div>
  );
}
