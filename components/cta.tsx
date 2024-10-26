'use client';

import React, { useCallback } from 'react';
import Link from 'next/link';

/**
 * CTASection Component
 * 
 * This component represents a Call-to-Action (CTA) section for the BilQuick application.
 * It's designed to encourage users to start using the service by highlighting its main benefit
 * and providing a prominent action link.
 * 
 * Features:
 * - Clean design with white text and orange highlight
 * - Responsive text sizing
 * - Interactive text link that glows on hover and scrolls to the pricing section
 * 
 * Usage:
 * <CTASection />
 */
const CTASection: React.FC = () => {
  /**
   * Scrolls the page to the pricing section when the CTA link is clicked.
   * The pricing section should have an id of 'price-section'.
   */
  const scrollToPrice = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const priceSection = document.getElementById('price-section');
    priceSection?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  return (
    <section className="w-full text-white py-16 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Let us help you get your dream saas <span className="text-orange-400">Running</span>!
        </h2>
        <p className="text-xl mb-8">
          Make building your website easy, so you can focus on the core of your business
        </p>
        
        <Link href="#price-section" onClick={scrollToPrice}>
          <span
            className="text-lg font-semibold text-orange-400 hover:text-orange-300 transition-colors duration-300 relative"
          >
            Start Now 
            <span className="absolute inset-0 scale-0 hover:scale-100 transition-transform duration-300 bg-orange-400 opacity-25 rounded-full blur-sm"></span>
          </span>
        </Link>
      </div>
    </section>
  );
};

export default CTASection;