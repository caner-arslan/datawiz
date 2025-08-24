"use client";

import { useEffect, useState } from 'react';

export default function HeroVideo() {
  const [scrollVisible, setScrollVisible] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setScrollVisible(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative w-full h-full">
      {/* Video Background */}
      <div className="relative w-full h-96 md:h-[500px] rounded-2xl overflow-hidden bg-gradient-to-br from-brand-800 to-brand-900">
        
        {/* Video Element */}
        <video
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          onLoadedData={() => setVideoLoaded(true)}
          poster="/media/video-poster.jpg"
        >
          <source src="/media/hero-video.mp4" type="video/mp4" />
          <source src="/media/hero-video.webm" type="video/webm" />
          {/* Fallback for browsers that don't support video */}
          <div className="absolute inset-0 bg-gradient-to-br from-brand-700/50 to-brand-900/50 flex items-center justify-center">
            <div className="text-center text-white/60">
              <div className="w-16 h-16 mx-auto mb-4 bg-white/10 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z"/>
                </svg>
              </div>
              <p className="text-sm">Video yüklenemedi</p>
            </div>
          </div>
        </video>

        {/* Loading overlay */}
        {!videoLoaded && (
          <div className="absolute inset-0 bg-gradient-to-br from-brand-700/50 to-brand-900/50 flex items-center justify-center">
            <div className="text-center text-white/60">
              <div className="w-16 h-16 mx-auto mb-4 bg-white/10 rounded-full flex items-center justify-center animate-pulse">
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z"/>
                </svg>
              </div>
              <p className="text-sm">Video yükleniyor...</p>
            </div>
          </div>
        )}
        
        {/* Video overlay for better text readability */}
        <div className="absolute inset-0 bg-black/30" />
        
        {/* Animated elements on video */}
        <div className="absolute top-6 right-6 w-3 h-3 bg-green-500 rounded-full animate-pulse" />
        <div className="absolute top-6 right-12 w-2 h-2 bg-accent-500 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
        
        {/* Computer screen glow effect */}
        <div className="absolute bottom-8 left-8 w-32 h-20 bg-white/10 rounded-lg backdrop-blur-sm border border-white/20">
          <div className="p-2">
            <div className="w-full h-2 bg-green-500/60 rounded mb-1" />
            <div className="w-3/4 h-2 bg-blue-500/60 rounded mb-1" />
            <div className="w-1/2 h-2 bg-accent-500/60 rounded" />
          </div>
        </div>

        {/* Success indicator */}
        <div className="absolute top-6 left-6 flex items-center gap-2 px-3 py-1 bg-green-500/20 rounded-full border border-green-500/30">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          <span className="text-xs text-green-300 font-medium">İşlem tamamlandı</span>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className={`absolute bottom-4 left-1/2 transform -translate-x-1/2 transition-all duration-1000 ${scrollVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        <div className="flex flex-col items-center text-white/70">
          <span className="text-xs mb-2 font-medium">Aşağı kaydırın</span>
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-bounce" />
          </div>
        </div>
      </div>
    </div>
  );
}
