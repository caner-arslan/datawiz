"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import AnimatedLogo from './AnimatedLogo';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    
    // Header'ı 1 saniye sonra göster
    const timer = setTimeout(() => setIsVisible(true), 1000);
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timer);
    };
  }, []);

  return (
    <header 
      className={`
        fixed top-0 left-0 right-0 z-50 transition-all duration-700 ease-out
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}
        ${scrolled 
          ? 'bg-white/10 backdrop-blur-xl border-b border-white/20 shadow-lg' 
          : 'bg-transparent'
        }
      `}
    >
      <div className="mx-auto max-w-6xl px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Animated Logo */}
          <AnimatedLogo />

          {/* Navigation */}
          <nav className={`
            flex items-center gap-6 text-sm font-medium transition-all duration-300
            ${scrolled ? 'text-white' : 'text-white/90'}
          `}>
            <Link 
              href="/services" 
              className="relative group px-3 py-2 rounded-lg transition-all duration-300 hover:bg-white/10 hover:text-white"
            >
              <span>Hizmetler</span>
              {/* Hover underline effect */}
              <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-accent-500 transition-all duration-300 group-hover:w-full" />
            </Link>
            
            <Link 
              href="/projects" 
              className="relative group px-3 py-2 rounded-lg transition-all duration-300 hover:bg-white/10 hover:text-white"
            >
              <span>Projeler</span>
              <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-accent-500 transition-all duration-300 group-hover:w-full" />
            </Link>
            
            <Link 
              href="/insights" 
              className="relative group px-3 py-2 rounded-lg transition-all duration-300 hover:bg-white/10 hover:text-white"
            >
              <span>İçgörüler</span>
              <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-accent-500 transition-all duration-300 group-hover:w-full" />
            </Link>
            
            {/* CTA Button - Red accent color */}
            <Link 
              href="/contact" 
              className={`
                relative group px-4 py-2 rounded-lg font-medium transition-all duration-300
                ${scrolled 
                  ? 'bg-accent-500 text-white shadow-lg shadow-accent-500/30 hover:bg-accent-600 hover:scale-105' 
                  : 'bg-accent-500/90 text-white border border-accent-400/30 hover:bg-accent-500 hover:scale-105 shadow-lg shadow-accent-500/20'
                }
              `}
            >
              <span>İletişim</span>
              {/* Button glow effect */}
              <div className="absolute inset-0 bg-accent-500/20 rounded-lg blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </Link>
          </nav>
        </div>
      </div>

      {/* Animated background line */}
      <div className={`
        absolute bottom-0 left-0 h-px bg-gradient-to-r from-transparent via-accent-500 to-transparent
        transition-all duration-1000 ${scrolled ? 'w-full opacity-100' : 'w-0 opacity-0'}
      `} />
    </header>
  );
}


