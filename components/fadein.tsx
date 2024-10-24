"use client";
import React, { useEffect, useState } from 'react';

/**
 * FadeInProps Interface
 * 
 * Defines the props for the FadeIn component.
 * 
 * @property children - The content to be wrapped by the FadeIn component.
 * @property className - Optional additional CSS classes to be applied to the wrapper div.
 */
interface FadeInProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * FadeIn Component
 * 
 * A reusable component that applies a fade-in effect to its children.
 * 
 * Features:
 * - Smooth opacity transition from 0 to 100
 * - Customizable delay before fade-in starts
 * - Accepts additional CSS classes for styling
 * 
 * Usage:
 * <FadeIn>
 *   <YourContent />
 * </FadeIn>
 * 
 * @param {FadeInProps} props - The props for the FadeIn component
 */
const FadeIn: React.FC<FadeInProps> = ({ children, className = '' }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const delay = 100; // Delay before fade-in starts (in milliseconds)
    const timer = setTimeout(() => setIsVisible(true), delay);

    return () => clearTimeout(timer); // Cleanup the timeout on component unmount
  }, []);

  return (
    <div
      className={`transition-opacity duration-500 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      } ${className}`}
    >
      {children}
    </div>
  );
};

export default FadeIn;
