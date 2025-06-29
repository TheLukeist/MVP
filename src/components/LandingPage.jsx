import React from 'react';
import Hero from '@/components/landing/Hero';
import Stats from '@/components/landing/Stats';
import Services from '@/components/landing/Services';
import PremiumPlan from '@/components/landing/PremiumPlan';
import Testimonials from '@/components/landing/Testimonials';
import Cta from '@/components/landing/Cta';
import Footer from '@/components/landing/Footer';

export default function LandingPage({ onNavigate }) {
  return (
    <div className="min-h-screen bg-white">
      <Hero onNavigate={onNavigate} />
      <Stats />
      <Services />
      <PremiumPlan onNavigate={onNavigate} />
      <Testimonials />
      <Cta onNavigate={onNavigate} />
      <Footer />
    </div>
  );
}