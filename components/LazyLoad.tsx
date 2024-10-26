"use client";
import { useEffect, useRef, useState, ReactNode } from 'react';

interface LazyLoadProps {
  children: ReactNode;
  threshold?: number;
  rootMargin?: string;
}

const LazyLoad: React.FC<LazyLoadProps> = ({ 
  children, 
  threshold = 0,
  rootMargin = '100px' 
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsInitialized(true);
    
    const currentRef = ref.current;
    if (!currentRef) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { 
        threshold,
        rootMargin 
      }
    );

    observer.observe(currentRef);

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
      observer.disconnect();
    };
  }, [threshold, rootMargin]);

  // Don't render anything during SSR
  if (!isInitialized) {
    return <div ref={ref} />;
  }

  return (
    <div ref={ref}>
      {isVisible ? children : <div style={{ height: '100%', minHeight: '1px' }} />}
    </div>
  );
};

export default LazyLoad;
