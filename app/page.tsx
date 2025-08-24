"use client";

import { useState, useEffect } from 'react';
import HeroVideo from '@/components/HeroVideo';
import AnimatedLogo from '@/components/AnimatedLogo';

export default function HomePage() {
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [showKvkkModal, setShowKvkkModal] = useState(false);
  const [showWhatsAppButton, setShowWhatsAppButton] = useState(false);
  const [showCookieBanner, setShowCookieBanner] = useState(false);
  const [showCookieModal, setShowCookieModal] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      
      // Show button after scrolling past hero section (1 viewport height)
      const shouldShowButton = scrollY > windowHeight;
      
      // Hide button when near footer (within 200px of bottom)
      const isNearFooter = (scrollY + windowHeight) > (documentHeight - 200);
      
      setShowWhatsAppButton(shouldShowButton && !isNearFooter);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Cookie consent check
  useEffect(() => {
    const cookieConsent = localStorage.getItem('datawiz-cookie-consent');
    
    if (!cookieConsent) {
      // İlk ziyaret - Banner göster
      const timer = setTimeout(() => setShowCookieBanner(true), 2000);
      return () => clearTimeout(timer);
    } else if (cookieConsent === 'accepted') {
      // Önceden kabul edilmiş - Analytics'i etkinleştir
      enableMarketingCookies();
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('consent', 'update', {
          analytics_storage: 'granted',
          ad_storage: 'granted'
        });
      }
    } else if (cookieConsent === 'rejected') {
      // Önceden reddedilmiş - Sadece zorunlu çerezler
      disableMarketingCookies();
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('consent', 'update', {
          analytics_storage: 'denied',
          ad_storage: 'denied'
        });
      }
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('datawiz-cookie-consent', 'accepted');
    setShowCookieBanner(false);
    
    // Google Analytics gibi analitik çerezleri etkinleştir
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('consent', 'update', {
        analytics_storage: 'granted',
        ad_storage: 'granted'
      });
    }
    
    // Marketing çerezleri için
    enableMarketingCookies();
    
    console.log('✅ Çerezler kabul edildi - Analitik ve pazarlama çerezleri aktif');
  };

  const rejectCookies = () => {
    localStorage.setItem('datawiz-cookie-consent', 'rejected');
    setShowCookieBanner(false);
    
    // Analitik ve pazarlama çerezlerini devre dışı bırak
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('consent', 'update', {
        analytics_storage: 'denied',
        ad_storage: 'denied'
      });
    }
    
    // Marketing çerezlerini temizle
    disableMarketingCookies();
    
    console.log('❌ Çerezler reddedildi - Sadece zorunlu çerezler aktif');
  };

  const enableMarketingCookies = () => {
    // Facebook Pixel gibi pazarlama araçlarını etkinleştir
    if (typeof window !== 'undefined') {
      // Örnek: Facebook Pixel
      // (window as any).fbq && (window as any).fbq('consent', 'grant');
      
      // Örnek: Google Ads
      // (window as any).gtag && (window as any).gtag('config', 'AW-XXXXXXXXX');
    }
  };

  const disableMarketingCookies = () => {
    // Pazarlama çerezlerini temizle
    if (typeof window !== 'undefined') {
      // Google Analytics çerezlerini temizle
      const cookies = document.cookie.split(';');
      cookies.forEach(cookie => {
        const eqPos = cookie.indexOf('=');
        const name = eqPos > -1 ? cookie.substr(0, eqPos).trim() : cookie.trim();
        if (name.startsWith('_ga') || name.startsWith('_gid') || name.startsWith('_fbp')) {
          document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;domain=${window.location.hostname}`;
          document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;domain=.${window.location.hostname}`;
        }
      });
    }
  };
  return (
    <>
      {/* Full-screen hero section with video background */}
      <section className="relative h-screen flex items-center overflow-hidden">
        {/* Video Background */}
        <div className="absolute inset-0 w-full h-full">
          <video
            className="w-full h-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            webkit-playsinline="true"
          >
            <source src="/media/hero-video.mp4" type="video/mp4" />
            <track kind="captions" src="/media/hero-video-captions.vtt" srcLang="tr" label="Türkçe" />
          </video>
          
          {/* Softer overlay for a more airy look */}
          <div className="absolute inset-0 bg-white/20 backdrop-blur-[1px]"></div>
        </div>
        
        {/* Content */}
        <div className="relative z-10 mx-auto max-w-6xl px-4 w-full">
          <div className="text-center text-white">
            {/* Animated Logo - Responsive scale */}
            <div className="flex justify-center mb-4 md:mb-6 mt-4 md:mt-8">
              <div className="scale-[1.5] md:scale-[2] lg:scale-[3] drop-shadow-[0_0_30px_rgba(255,255,255,1)] drop-shadow-[0_0_60px_rgba(255,255,255,0.6)] drop-shadow-[0_0_90px_rgba(255,255,255,0.3)]">
                <AnimatedLogo />
              </div>
            </div>
            
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold leading-tight tracking-tight mb-3 mt-16 md:mt-12">
              <div className="flex flex-col items-center">
                <div className="relative h-[2em] w-full max-w-[800px] overflow-hidden text-center flex items-center justify-center">
                  <div className="animate-text-slide absolute inset-0 transition-transform duration-700 ease-in-out">
                    <div className="h-[2em] flex items-center justify-center whitespace-nowrap">
                      <span className="text-white font-bold inline-block drop-shadow-[0_4px_8px_rgba(0,0,0,0.9)] drop-shadow-[0_8px_16px_rgba(0,0,0,0.6)] drop-shadow-[0_12px_24px_rgba(0,0,0,0.3)]">
                        Verimliliğinizi artırın
                      </span>
                    </div>
                    <div className="h-[2em] flex items-center justify-center whitespace-nowrap">
                      <span className="text-white font-bold inline-block drop-shadow-[0_4px_8px_rgba(0,0,0,0.9)] drop-shadow-[0_8px_16px_rgba(0,0,0,0.6)] drop-shadow-[0_12px_24px_rgba(0,0,0,0.3)]">
                        Maliyetlerinizi düşürün
                  </span>
                    </div>
                    <div className="h-[2em] flex items-center justify-center whitespace-nowrap">
                      <span className="text-white font-bold inline-block drop-shadow-[0_4px_8px_rgba(0,0,0,0.9)] drop-shadow-[0_8px_16px_rgba(0,0,0,0.6)] drop-shadow-[0_12px_24px_rgba(0,0,0,0.3)]">
                        Verimliliğinizi artırın
                </span>
                    </div>
                  </div>
                </div>
              </div>
            </h1>
            <p className="text-white text-base md:text-lg leading-relaxed max-w-3xl mx-auto mb-4 px-4 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] drop-shadow-[0_4px_8px_rgba(0,0,0,0.4)]">
              Sektöre özel operasyon uygulamaları, ERP hızlandırıcı arayüzler ve otomasyon danışmanlığı ile
              süreçlerinizi daha hızlı ve düşük maliyetli hale getiriyoruz.
            </p>
            <div className="flex flex-col items-center gap-6 px-4">
              <a 
                href="https://wa.me/908502420002" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group relative flex flex-col items-center gap-2 px-8 py-6 rounded-2xl bg-gradient-to-r from-green-700/80 to-green-600/80 backdrop-blur-lg border border-green-400/20 text-white shadow-2xl shadow-green-500/40 hover:shadow-green-400/60 hover:shadow-2xl transition-all duration-500 hover:scale-110 hover:from-green-600/90 hover:to-green-500/90 transform hover:-translate-y-1 min-w-[280px]"
              >
                <p className="text-green-100 text-base italic font-normal tracking-wide mb-1">
                  Sormak istedikleriniz mi var?
                </p>
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="absolute inset-0 w-6 h-6 bg-green-300/60 rounded-full blur-md animate-pulse"></div>
                    <svg className="relative w-6 h-6 drop-shadow-lg" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                    </svg>
                  </div>
                  <span className="font-bold text-lg tracking-wide">Hemen görüşebiliriz!</span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              </a>
              
              <div className="flex flex-col items-center gap-4 py-4 md:mt-20">
                <h3 className="text-white text-xl md:text-2xl font-black italic tracking-[0.2em] transform -skew-x-6 drop-shadow-[0_0_10px_rgba(255,255,255,0.5)] drop-shadow-[0_4px_8px_rgba(0,0,0,0.9)] drop-shadow-[0_8px_16px_rgba(0,0,0,0.6)] drop-shadow-[0_12px_24px_rgba(0,0,0,0.3)] hover:tracking-[0.3em] transition-all duration-300 text-center">
                  NELER YAPIYORUZ?
                </h3>
                
                {/* Arrow down icon - responsive sizes */}
                <svg className="w-16 h-16 md:w-24 md:h-24 text-red-400/80 animate-bounce" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </div>
            </div>
          </div>
        </div>

      </section>

      {/* Global Section Transition Divider - Hero to ERP */}
      <div className="absolute left-0 w-full h-[200px] pointer-events-none z-[9999]" style={{top: 'calc(100vh - 100px)'}}>
        <div 
          className="absolute inset-0"
          style={{
            background: `linear-gradient(to bottom, 
              rgba(255, 255, 255, 0) 0%,
              rgba(255, 255, 255, 0.5) 25%,
              rgba(255, 255, 255, 1) 50%,
              rgba(255, 255, 255, 0.5) 75%,
              rgba(255, 255, 255, 0) 100%
            )`
          }}
        />
      </div>

      {/* ERP Hızlandırıcı Section */}
      <section className="relative bg-white py-20 md:py-32 overflow-hidden">
        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            {/* Left Content */}
            <div className="text-gray-900 order-1 lg:order-1">
              <div className="mb-6">
                <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-4 py-2 rounded-full text-sm font-medium mb-4">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M13 10V3L4 14h7v7l9-11h-7z"/>
                  </svg>
                  İşletmenize özel
                </div>
                
                <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black mb-4 leading-tight">
                  <span className="text-gray-900">ERP</span>{' '}
                  <span className="bg-gradient-to-r from-blue-600 via-cyan-500 to-teal-500 bg-clip-text text-transparent">
                    Hızlandırıcı
                  </span>
                </h2>
                
                <p className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed">
                  Sunucu bağımlı, karmaşık ekranlar yerine; basit arayüzler.
                </p>
              </div>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mt-1 flex-shrink-0">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                  </div>
                  <p className="text-gray-700">Kullanıcının ihtiyacına uygun, performans odaklı arayüzler</p>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center mt-1 flex-shrink-0">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M13 10V3L4 14h7v7l9-11h-7z"/>
                    </svg>
                  </div>
                  <p className="text-gray-700">İnternetin olduğu her yerden güvenle ulaşılabilen.</p>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center mt-1 flex-shrink-0">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                  </div>
                  <p className="text-gray-700">Mevcut ERP'nize entegre, departman özelinde süreç yönetim ekranları.</p>
                </div>
              </div>
              
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
                    </svg>
                  </div>
                  <h3 className="font-bold text-gray-900">Maliyet&Verimlilik Avantajı</h3>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">
                  ERP sisteminize erişimi güvenli şekilde basitleştirip, tüm ekibin süreçlere katılımını sağlar.
                  Bu sayede veriler hem daha güncel hem de daha güvenilir takip edilebilir.
                </p>
              </div>
            </div>
            
            {/* Right Visual */}
            <div className="relative order-2 lg:order-2 mx-auto lg:mx-0 max-w-md lg:max-w-none">
              {/* Main Dashboard Mockup */}
              <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 p-4 lg:p-6 transform lg:rotate-3 hover:rotate-0 transition-transform duration-500">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-bold text-gray-900 text-sm lg:text-base">ABC LTD.ŞTİ.</h3>
                  <div className="flex gap-2">
                    <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 bg-green-50 rounded-lg border border-green-200 gap-2">
                    <span className="text-green-800 font-medium text-sm lg:text-base">✓ Yeni sipariş alındı.</span>
                    <span className="text-green-600 text-xs lg:text-sm">Görev tamamlandı</span>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 bg-blue-50 rounded-lg border border-blue-200 gap-2">
                    <span className="text-blue-800 font-medium text-sm lg:text-base">📊 Satış raporu oluşturuldu</span>
                    <span className="text-blue-600 text-xs lg:text-sm">Sistem arka planda çalışıyor</span>
                  </div>
                  
                  <div className="p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg border border-blue-200">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold text-gray-900 text-sm lg:text-base">Hedef tamamlanma oranı</span>
                      <span className="text-green-600 font-bold">↗</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div className="bg-gradient-to-r from-blue-500 to-cyan-500 h-2 rounded-full" style={{width: '60%'}}></div>
                      </div>
                      <span className="text-blue-600 font-bold text-sm">%60</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Mobile-friendly Floating Elements */}
              <div className="hidden lg:block absolute -top-8 -right-8 bg-white rounded-xl shadow-lg p-4 border border-gray-200 animate-float">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium text-gray-700 whitespace-nowrap">Canlı Veri Akışı</span>
                </div>
              </div>
              
              <div className="hidden lg:block absolute -bottom-4 -left-8 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl shadow-lg p-4 animate-float" style={{animationDelay: '1s'}}>
                <div className="text-center">
                  <div className="text-xl font-bold">DAHA</div>
                  <div className="text-xl font-bold">HIZLI</div>
                </div>
              </div>
              
              {/* Floating Elements - Mobile bold positioning */}
              <div className="lg:hidden absolute -top-6 -right-4 bg-white rounded-xl shadow-lg p-3 border border-gray-200 animate-float">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium text-gray-700">Canlı Veri</span>
                </div>
              </div>
              
              <div className="lg:hidden absolute -bottom-6 -left-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl shadow-lg p-3 animate-float" style={{animationDelay: '1s'}}>
                <div className="text-center">
                  <div className="text-lg font-bold">DAHA</div>
                  <div className="text-lg font-bold">HIZLI</div>
                </div>
              </div>
              
            </div>
          </div>
        </div>

      </section>

      {/* Operasyon Takip Section */}
      <section className="relative bg-gradient-to-br from-slate-50 to-blue-50 py-20 md:py-32 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-32 h-32 bg-green-500 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-48 h-48 bg-blue-500 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-cyan-500 rounded-full blur-3xl"></div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            {/* Left Visual - Mobile order 2, Desktop order 1 */}
            <div className="relative order-2 lg:order-1 mx-auto lg:mx-0 max-w-md lg:max-w-none">
              {/* Field Operations Dashboard Mockup */}
              <div className="bg-white rounded-3xl shadow-2xl border border-gray-200 p-4 lg:p-6 transform lg:-rotate-2 hover:rotate-0 transition-transform duration-500">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-bold text-gray-900 text-sm lg:text-base flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                    Saha Operasyon Merkezi
                  </h3>
                  <div className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                    Canlı
                  </div>
                </div>
                
                <div className="space-y-4">
                  {/* Active Teams */}
                  <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-green-800 text-sm lg:text-base">📍 Aktif Ekipler</span>
                      <span className="text-green-600 text-lg font-bold">12</span>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      <div className="bg-white p-2 rounded text-center text-xs">
                        <div className="font-bold text-green-600">A1</div>
                        <div className="text-gray-600">Merkez</div>
                      </div>
                      <div className="bg-white p-2 rounded text-center text-xs">
                        <div className="font-bold text-blue-600">B2</div>
                        <div className="text-gray-600">Şantiye</div>
                      </div>
                      <div className="bg-white p-2 rounded text-center text-xs">
                        <div className="font-bold text-orange-600">C3</div>
                        <div className="text-gray-600">Saha</div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Real-time Status */}
                  <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                      <span className="font-medium text-blue-800 text-sm lg:text-base">Son Güncellemeler</span>
                    </div>
                    <div className="space-y-1 text-xs lg:text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-700">Ekip A1 - Görev tamamlandı</span>
                        <span className="text-gray-500">2dk önce</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-700">Ekip B2 - Konuma vardı</span>
                        <span className="text-gray-500">5dk önce</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Performance Meter */}
                  <div className="p-3 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border border-gray-200">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-gray-800 text-sm lg:text-base">Günlük Verimlilik</span>
                      <span className="text-green-600 font-bold">↗</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-gray-200 rounded-full h-3">
                        <div className="bg-gradient-to-r from-green-500 to-blue-500 h-3 rounded-full" style={{width: '85%'}}></div>
                      </div>
                      <span className="text-green-600 font-bold text-sm">%85</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Floating Elements - Desktop */}
              <div className="hidden lg:block absolute -top-6 -left-6 bg-green-500 text-white rounded-xl shadow-lg p-4 animate-float">
                <div className="text-center">
                  <div className="text-xl font-bold">LOKASYON</div>
                  <div className="text-xl font-bold">BAĞIMSIZ</div>
                </div>
              </div>
              
              <div className="hidden lg:block absolute -bottom-6 -right-6 bg-white rounded-xl shadow-lg p-4 border border-gray-200 animate-float" style={{animationDelay: '1s'}}>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium text-gray-700 whitespace-nowrap">Gerçek Zamanlı</span>
                </div>
              </div>
              
              {/* Floating Elements - Mobile */}
              <div className="lg:hidden absolute -top-6 -left-4 bg-green-500 text-white rounded-xl shadow-lg p-3 animate-float">
                <div className="text-center">
                  <div className="text-lg font-bold">LOKASYON</div>
                  <div className="text-lg font-bold">BAĞIMSIZ</div>
                </div>
              </div>
              
              <div className="lg:hidden absolute -bottom-6 -right-4 bg-white rounded-xl shadow-lg p-3 border border-gray-200 animate-float" style={{animationDelay: '1s'}}>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium text-gray-700">Canlı</span>
                </div>
              </div>
            </div>
            
            {/* Right Content - Mobile order 1, Desktop order 2 */}
            <div className="text-gray-900 order-1 lg:order-2">
              <div className="mb-6">
                <div className="inline-flex items-center gap-2 bg-green-50 text-green-600 px-4 py-2 rounded-full text-sm font-medium mb-4">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                  </svg>
                  Lokasyon, departman ve ekip arası koordinasyon
                </div>
                
                <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black mb-4 leading-tight">
                  <span className="text-gray-900">İş Akışı</span>{' '}
                  <span className="bg-gradient-to-r from-green-600 via-blue-500 to-cyan-500 bg-clip-text text-transparent">
                    Takip
                  </span>
                </h2>
                
                <p className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed">
                  Günlük süreçlerinize özel uygulamalar.
                </p>
              </div>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mt-1 flex-shrink-0">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
                    </svg>
                  </div>
                  <p className="text-gray-700">Kendi oluşturduğunuz iş süreçlerinize özel uygulamalar.</p>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center mt-1 flex-shrink-0">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M13 10V3L4 14h7v7l9-11h-7z"/>
                    </svg>
                  </div>
                  <p className="text-gray-700">Saha operasyonları ya da departmanlar arası kesintisiz akış</p>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-cyan-500 rounded-full flex items-center justify-center mt-1 flex-shrink-0">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                  </div>
                  <p className="text-gray-700">Performans metrikleri ve raporlamalar</p>
                </div>
              </div>
              
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
                    </svg>
                  </div>
                  <h3 className="font-bold text-gray-900">Koordinasyon Avantajı</h3>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Ekiplerinizin nerede olduğunu tahmin etmeye çalışmayın. Her adım, her işlem, her veri anında görünür. 
                  Saha ekipleriniz işlerine odaklanırken, tüm operasyonları tek ekrandan takip edersiniz.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Otomasyonlar Section */}
      <section className="relative bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 py-20 md:py-32 overflow-hidden">
        {/* Subtle Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, #8b5cf6 0%, transparent 50%),
                             radial-gradient(circle at 75% 75%, #06b6d4 0%, transparent 50%)`
          }}></div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-16 items-center">
            
            {/* Left Content - 5 columns */}
            <div className="lg:col-span-5 text-white">
              <div className="mb-8">
                <div className="inline-flex items-center gap-2 bg-white/10 text-gray-300 px-4 py-2 rounded-full text-sm font-medium mb-6 backdrop-blur-sm border border-white/20">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12,15.5A3.5,3.5 0 0,1 8.5,12A3.5,3.5 0 0,1 12,8.5A3.5,3.5 0 0,1 15.5,12A3.5,3.5 0 0,1 12,15.5M19.43,12.97C19.47,12.65 19.5,12.33 19.5,12C19.5,11.67 19.47,11.34 19.43,11L21.54,9.37C21.73,9.22 21.78,8.95 21.66,8.73L19.66,5.27C19.54,5.05 19.27,4.96 19.05,5.05L16.56,6.05C16.04,5.66 15.5,5.32 14.87,5.07L14.5,2.42C14.46,2.18 14.25,2 14,2H10C9.75,2 9.54,2.18 9.5,2.42L9.13,5.07C8.5,5.32 7.96,5.66 7.44,6.05L4.95,5.05C4.73,4.96 4.46,5.05 4.34,5.27L2.34,8.73C2.22,8.95 2.27,9.22 2.46,9.37L4.57,11C4.53,11.34 4.5,11.67 4.5,12C4.5,12.33 4.53,12.65 4.57,12.97L2.46,14.63C2.27,14.78 2.22,15.05 2.34,15.27L4.34,18.73C4.46,18.95 4.73,19.03 4.95,18.95L7.44,17.94C7.96,18.34 8.5,18.68 9.13,18.93L9.5,21.58C9.54,21.82 9.75,22 10,22H14C14.25,22 14.46,21.82 14.5,21.58L14.87,18.93C15.5,18.68 16.04,18.34 16.56,17.94L19.05,18.95C19.27,19.03 19.54,18.95 19.66,18.73L21.66,15.27C21.78,15.05 21.73,14.78 21.54,14.63L19.43,12.97Z"/>
                  </svg>
                  Akıllı Otomasyon
                </div>
                
                <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black mb-4 leading-tight">
                  <span className="text-white">Akıllı</span>{' '}
                  <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
                    Otomasyonlar
                  </span>
                </h2>
                
                <p className="text-lg md:text-xl text-gray-300 mb-8 leading-relaxed">
                  Verileriniz sizin için çalışır.
                </p>
              </div>
              
              <div className="space-y-6 mb-8">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mt-1 flex-shrink-0">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-white mb-1">Süreç Analizi</h3>
                    <p className="text-gray-400 text-sm">Otomasyona uygun adımları tespit, ROI odaklı yol haritası oluşturuyoruz.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg flex items-center justify-center mt-1 flex-shrink-0">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-white mb-1">Arka Plan İşleri</h3>
                    <p className="text-gray-400 text-sm">Periyodik toplu işler, veri temizleme, özetleme ve raporlama otomasyonu.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-red-500 rounded-lg flex items-center justify-center mt-1 flex-shrink-0">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M13 10V3L4 14h7v7l9-11h-7z"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-white mb-1">Tetikleyici Sistemler</h3>
                    <p className="text-gray-400 text-sm">Kullanıcı aksiyonları ve zamanlı tetiklerle otomatik süreç başlatma.</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm3.5 6L12 10.5 8.5 8 12 5.5 15.5 8zM12 21.5c-5.24 0-9.5-4.26-9.5-9.5S6.76 2.5 12 2.5s9.5 4.26 9.5 9.5-4.26 9.5-9.5 9.5z"/>
                    </svg>
                  </div>
                  <h3 className="font-bold text-white">Zaman & Maliyet Avantajı</h3>
                </div>
                <p className="text-gray-300 text-sm leading-relaxed">
                  Manuel hesaplamalar, tekrarlayan raporlar artık geçmişte kaldı. Verileriniz siz uyurken bile çalışır. 
                  <span className="font-semibold text-white"> Zamanınız değerli işlere, verileriniz rutin işlere.</span>
                </p>
              </div>
            </div>
            
            {/* Right Visual - 7 columns */}
            <div className="lg:col-span-7 relative mx-auto lg:mx-0">
              {/* Automation Workflow Dashboard */}
              <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl border border-gray-200 p-6 lg:p-8 transform lg:rotate-1 hover:rotate-0 transition-transform duration-500">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-bold text-gray-900 text-lg flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                    Otomasyon Kontrol Merkezi
                  </h3>
                  <div className="flex items-center gap-2">
                    <div className="text-xs text-gray-500 bg-gray-100 px-3 py-1 rounded-full">Aktif: 24/7</div>
                  </div>
                </div>
                
                {/* Workflow Visual */}
                <div className="space-y-4">
                  {/* Process Flow */}
                  <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-4 border border-blue-200">
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-medium text-blue-800 text-sm">🔄 Günlük Veri İşleme</span>
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        <span className="text-blue-600 text-xs font-medium">Çalışıyor</span>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-4 gap-2 mb-3">
                      <div className="bg-white p-2 rounded text-center text-xs">
                        <div className="w-4 h-4 bg-blue-500 rounded mx-auto mb-1"></div>
                        <div className="font-medium text-gray-700">Veri Toplama</div>
                        <div className="text-green-600">✓</div>
                      </div>
                      <div className="bg-white p-2 rounded text-center text-xs">
                        <div className="w-4 h-4 bg-yellow-500 rounded mx-auto mb-1 animate-pulse"></div>
                        <div className="font-medium text-gray-700">İşleme</div>
                        <div className="text-yellow-600">⟳</div>
                      </div>
                      <div className="bg-white p-2 rounded text-center text-xs">
                        <div className="w-4 h-4 bg-gray-300 rounded mx-auto mb-1"></div>
                        <div className="font-medium text-gray-700">Analiz</div>
                        <div className="text-gray-400">○</div>
                      </div>
                      <div className="bg-white p-2 rounded text-center text-xs">
                        <div className="w-4 h-4 bg-gray-300 rounded mx-auto mb-1"></div>
                        <div className="font-medium text-gray-700">Rapor</div>
                        <div className="text-gray-400">○</div>
                      </div>
                    </div>
                    
                    <div className="bg-blue-100 p-2 rounded-lg">
                      <div className="flex justify-between text-xs">
                        <span className="text-blue-700">İlerleme: %45</span>
                        <span className="text-blue-600">Tahmini bitiş: 14:30</span>
                      </div>
                      <div className="w-full bg-blue-200 rounded-full h-1.5 mt-1">
                        <div className="bg-blue-500 h-1.5 rounded-full" style={{width: '45%'}}></div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Scheduled Tasks */}
                  <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-4 border border-purple-200">
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-medium text-purple-800 text-sm">⏰ Zamanlanmış Görevler</span>
                      <span className="text-purple-600 text-xs">12 aktif</span>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <span className="text-gray-700">Haftalık satış raporu</span>
                        </div>
                        <span className="text-gray-500">Her Pazartesi 09:00</span>
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                          <span className="text-gray-700">Müşteri veri senkronizasyonu</span>
                        </div>
                        <span className="text-gray-500">Her 4 saatte</span>
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                          <span className="text-gray-700">Stok seviye kontrolü</span>
                        </div>
                        <span className="text-gray-500">Günlük 18:00</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Performance Metrics */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-green-50 border border-green-200 rounded-lg p-3 text-center">
                      <div className="text-2xl font-bold text-green-700">8 saat</div>
                      <div className="text-xs text-green-600">→ 30 dakika</div>
                      <div className="text-xs text-gray-600 mt-1">Günlük zaman tasarrufu</div>
                    </div>
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-center">
                      <div className="text-2xl font-bold text-blue-700">%80</div>
                      <div className="text-xs text-blue-600">Hata azalması</div>
                      <div className="text-xs text-gray-600 mt-1">Manuel işlemler</div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Floating Elements - Desktop */}
              <div className="hidden lg:block absolute -top-6 -left-6 animate-float">
                <div className="w-16 h-16 relative">
                  {/* 3D Gear with perspective and shadow */}
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full shadow-lg transform rotate-12 opacity-30"></div>
                  <div className="absolute inset-1 bg-gradient-to-br from-purple-500 to-purple-700 rounded-full shadow-xl">
                    <svg className="w-full h-full text-white animate-spin p-2" style={{animationDuration: '8s'}} fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12,15.5A3.5,3.5 0 0,1 8.5,12A3.5,3.5 0 0,1 12,8.5A3.5,3.5 0 0,1 15.5,12A3.5,3.5 0 0,1 12,15.5M19.43,12.97C19.47,12.65 19.5,12.33 19.5,12C19.5,11.67 19.47,11.34 19.43,11L21.54,9.37C21.73,9.22 21.78,8.95 21.66,8.73L19.66,5.27C19.54,5.05 19.27,4.96 19.05,5.05L16.56,6.05C16.04,5.66 15.5,5.32 14.87,5.07L14.5,2.42C14.46,2.18 14.25,2 14,2H10C9.75,2 9.54,2.18 9.5,2.42L9.13,5.07C8.5,5.32 7.96,5.66 7.44,6.05L4.95,5.05C4.73,4.96 4.46,5.05 4.34,5.27L2.34,8.73C2.22,8.95 2.27,9.22 2.46,9.37L4.57,11C4.53,11.34 4.5,11.67 4.5,12C4.5,12.33 4.53,12.65 4.57,12.97L2.46,14.63C2.27,14.78 2.22,15.05 2.34,15.27L4.34,18.73C4.46,18.95 4.73,19.03 4.95,18.95L7.44,17.94C7.96,18.34 8.5,18.68 9.13,18.93L9.5,21.58C9.54,21.82 9.75,22 10,22H14C14.25,22 14.46,21.82 14.5,21.58L14.87,18.93C15.5,18.68 16.04,18.34 16.56,17.94L19.05,18.95C19.27,19.03 19.54,18.95 19.66,18.73L21.66,15.27C21.78,15.05 21.73,14.78 21.54,14.63L19.43,12.97Z"/>
                    </svg>
                  </div>
                  {/* 3D shadow effect */}
                  <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-black/20 rounded-full blur-md transform skew-x-12"></div>
                </div>
              </div>
              
              <div className="hidden lg:block absolute -bottom-6 -right-6 bg-white rounded-xl shadow-lg p-4 border border-gray-200 animate-float" style={{animationDelay: '1s'}}>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium text-gray-700 whitespace-nowrap">7/24 Çalışıyor</span>
                </div>
              </div>
              
              {/* Floating Elements - Mobile */}
              <div className="lg:hidden absolute -top-6 -left-4 animate-float">
                <div className="w-12 h-12 relative">
                  {/* 3D Gear with perspective and shadow - smaller for mobile */}
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full shadow-lg transform rotate-12 opacity-30"></div>
                  <div className="absolute inset-1 bg-gradient-to-br from-purple-500 to-purple-700 rounded-full shadow-xl">
                    <svg className="w-full h-full text-white animate-spin p-1.5" style={{animationDuration: '8s'}} fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12,15.5A3.5,3.5 0 0,1 8.5,12A3.5,3.5 0 0,1 12,8.5A3.5,3.5 0 0,1 15.5,12A3.5,3.5 0 0,1 12,15.5M19.43,12.97C19.47,12.65 19.5,12.33 19.5,12C19.5,11.67 19.47,11.34 19.43,11L21.54,9.37C21.73,9.22 21.78,8.95 21.66,8.73L19.66,5.27C19.54,5.05 19.27,4.96 19.05,5.05L16.56,6.05C16.04,5.66 15.5,5.32 14.87,5.07L14.5,2.42C14.46,2.18 14.25,2 14,2H10C9.75,2 9.54,2.18 9.5,2.42L9.13,5.07C8.5,5.32 7.96,5.66 7.44,6.05L4.95,5.05C4.73,4.96 4.46,5.05 4.34,5.27L2.34,8.73C2.22,8.95 2.27,9.22 2.46,9.37L4.57,11C4.53,11.34 4.5,11.67 4.5,12C4.5,12.33 4.53,12.65 4.57,12.97L2.46,14.63C2.27,14.78 2.22,15.05 2.34,15.27L4.34,18.73C4.46,18.95 4.73,19.03 4.95,18.95L7.44,17.94C7.96,18.34 8.5,18.68 9.13,18.93L9.5,21.58C9.54,21.82 9.75,22 10,22H14C14.25,22 14.46,21.82 14.5,21.58L14.87,18.93C15.5,18.68 16.04,18.34 16.56,17.94L19.05,18.95C19.27,19.03 19.54,18.95 19.66,18.73L21.66,15.27C21.78,15.05 21.73,14.78 21.54,14.63L19.43,12.97Z"/>
                    </svg>
                  </div>
                  {/* 3D shadow effect */}
                  <div className="absolute -bottom-1.5 -right-1.5 w-8 h-8 bg-black/20 rounded-full blur-sm transform skew-x-12"></div>
                </div>
              </div>
              
              <div className="lg:hidden absolute -bottom-6 -right-4 bg-white rounded-xl shadow-lg p-3 border border-gray-200 animate-float" style={{animationDelay: '1s'}}>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium text-gray-700">24/7</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Size Özel Çözümler Section */}
      <section className="relative bg-gradient-to-br from-orange-50 via-pink-50 to-purple-50 py-20 md:py-32 overflow-hidden">
        {/* Fresh Background */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0" style={{
            backgroundImage: `
              radial-gradient(circle at 20% 80%, #f97316 0%, transparent 50%),
              radial-gradient(circle at 80% 20%, #ec4899 0%, transparent 50%),
              radial-gradient(circle at 40% 40%, #8b5cf6 0%, transparent 50%)
            `
          }}></div>
        </div>

        {/* Floating Code Elements */}
        <div className="absolute inset-0 opacity-40 text-orange-400/60 text-xs font-mono">
          <div className="absolute top-20 left-10 transform rotate-12 animate-pulse">
            <div>// Custom Solutions</div>
            <div>const solution = build(</div>
            <div className="ml-4">client.requirements</div>
            <div>);</div>
          </div>
          <div className="absolute bottom-32 right-16 transform -rotate-12 animate-pulse" style={{animationDelay: '2s'}}>
            <div>function integrate() {'{'}</div>
            <div className="ml-4">return ERP.connect();</div>
            <div>{'}'}</div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-16 items-center">
            
            {/* Left Content - 6 columns */}
            <div className="lg:col-span-6 text-gray-900">
              <div className="mb-8">
                <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black mb-6 leading-tight">
                  <span className="text-gray-700">Kısacası,</span><br/>
                  <span className="bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500 bg-clip-text text-transparent">
                    Hayalinizdeki Çözümleri
                  </span><br/>
                  <span className="text-gray-900">Geliştiriyoruz</span>
                </h2>
                
                <p className="text-lg md:text-xl text-gray-700 mb-8 leading-relaxed">
                  ERP hızlandırıcıdan operasyon takibine, otomasyonlardan özel uygulamalara — 
                  sizin iş süreçlerinize göre tasarlanmış sistemler.
                </p>
              </div>
              
              <div className="space-y-6 mb-8">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-pink-500 rounded-lg flex items-center justify-center mt-1 flex-shrink-0">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm3.5 6L12 10.5 8.5 8 12 5.5 15.5 8zM12 21.5c-5.24 0-9.5-4.26-9.5-9.5S6.76 2.5 12 2.5s9.5 4.26 9.5 9.5-4.26 9.5-9.5 9.5z"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">Tamamen Size Özel</h3>
                    <p className="text-gray-600 text-sm">Hazır çözümler değil, sizin ihtiyaçlarınıza göre sıfırdan tasarlanmış uygulamalar.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-purple-500 rounded-lg flex items-center justify-center mt-1 flex-shrink-0">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M13 10V3L4 14h7v7l9-11h-7z"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">Bağımsız & Entegre</h3>
                    <p className="text-gray-600 text-sm">Hem kendi başına çalışır, hem mevcut ERP sistemlerinizle sorunsuz entegre olur.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center mt-1 flex-shrink-0">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">Sınırsız Olanaklar</h3>
                    <p className="text-gray-600 text-sm">İş süreciniz neyse, o uygulamayı yazıyoruz. Teknoloji limitler içinde her şey mümkün.</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white/70 backdrop-blur-sm border border-orange-500/20 rounded-2xl p-6 shadow-lg">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-pink-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                    </svg>
                  </div>
                  <h3 className="font-bold text-gray-900">Popüler ERP Entegrasyonu</h3>
                </div>
                <p className="text-gray-700 text-sm leading-relaxed mb-4">
                  Mevcut ERP sisteminiz varsa sorun değil. Logo, Netsis, Mikro, Uyumsoft ve diğer 
                  popüler sistemlerle sorunsuz entegrasyon sağlıyoruz.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-orange-500/20 text-orange-600 rounded-full text-xs">Logo ERP</span>
                  <span className="px-3 py-1 bg-pink-500/20 text-pink-600 rounded-full text-xs">Netsis</span>
                  <span className="px-3 py-1 bg-purple-500/20 text-purple-600 rounded-full text-xs">Mikro</span>
                  <span className="px-3 py-1 bg-blue-500/20 text-blue-600 rounded-full text-xs">Uyumsoft</span>
                  <span className="px-3 py-1 bg-green-500/20 text-green-600 rounded-full text-xs">+Daha Fazla</span>
                </div>
              </div>
            </div>
            
            {/* Right Visual - 6 columns */}
            <div className="lg:col-span-6 relative mx-auto lg:mx-0">
              {/* Clean Device Mockups */}
              <div className="relative h-96 lg:h-[450px] flex items-center justify-center">
                
                {/* Desktop Dashboard - Left Side */}
                <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-72 h-48 bg-gradient-to-b from-gray-800 to-gray-600 rounded-xl p-1.5 shadow-xl z-10">
                  {/* Screen */}
                  <div className="w-full h-full bg-white rounded-lg overflow-hidden">
                    {/* Browser header */}
                    <div className="bg-gray-100 px-3 py-1.5 flex items-center gap-2">
                      <div className="flex gap-1">
                        <div className="w-1.5 h-1.5 bg-red-400 rounded-full"></div>
                        <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full"></div>
                        <div className="w-1.5 h-1.5 bg-green-400 rounded-full"></div>
                      </div>
                      <div className="flex-1 bg-white rounded text-xs text-gray-500 px-2 py-0.5 text-center">kargo.ustakargo.com</div>
                    </div>
                    
                    {/* Dashboard content */}
                    <div className="p-3 space-y-2.5">
                      {/* Header */}
                      <div className="flex items-center justify-between">
                        <h3 className="font-bold text-gray-900 text-xs">Kargo Takip Merkezi</h3>
                        <div className="bg-green-100 text-green-600 px-1.5 py-0.5 rounded text-xs font-medium">Canlı</div>
                      </div>
                      
                      {/* Delivery tracking */}
                      <div className="space-y-1.5">
                        <div>
                          <div className="flex justify-between mb-0.5">
                            <span className="text-xs text-gray-600">İstanbul → Ankara</span>
                            <span className="text-xs text-green-500">Teslim Edildi</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-1.5">
                            <div className="bg-gradient-to-r from-green-500 to-emerald-500 h-1.5 rounded-full" style={{width: '100%'}}></div>
                          </div>
                        </div>
                        
                        <div>
                          <div className="flex justify-between mb-0.5">
                            <span className="text-xs text-gray-600">Bursa → İzmir</span>
                            <span className="text-xs text-blue-500">Yolda</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-1.5">
                            <div className="bg-gradient-to-r from-blue-500 to-cyan-500 h-1.5 rounded-full" style={{width: '75%'}}></div>
                          </div>
                        </div>
                        
                        <div>
                          <div className="flex justify-between mb-0.5">
                            <span className="text-xs text-gray-600">Adana → Antalya</span>
                            <span className="text-xs text-orange-500">Hazırlanıyor</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-1.5">
                            <div className="bg-gradient-to-r from-orange-500 to-yellow-500 h-1.5 rounded-full" style={{width: '25%'}}></div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Stats grid */}
                      <div className="grid grid-cols-3 gap-1.5 mt-3">
                        <div className="bg-green-50 rounded p-1.5 text-center">
                          <div className="text-green-600 font-bold text-xs">847</div>
                          <div className="text-green-500 text-xs">Teslim</div>
                        </div>
                        <div className="bg-blue-50 rounded p-1.5 text-center">
                          <div className="text-blue-600 font-bold text-xs">123</div>
                          <div className="text-blue-500 text-xs">Yolda</div>
                        </div>
                        <div className="bg-orange-50 rounded p-1.5 text-center">
                          <div className="text-orange-600 font-bold text-xs">45</div>
                          <div className="text-orange-500 text-xs">Bekliyor</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Mobile App - Right Side */}
                <div className="absolute right-8 top-1/2 transform -translate-y-1/2 w-36 h-72 bg-gradient-to-b from-gray-900 to-gray-700 rounded-3xl p-1.5 shadow-xl z-20">
                  {/* Phone Screen */}
                  <div className="w-full h-full bg-white rounded-2xl overflow-hidden relative">
                    {/* Phone notch */}
                    <div className="absolute top-1.5 left-1/2 transform -translate-x-1/2 w-12 h-0.5 bg-gray-800 rounded-full"></div>
                    
                    {/* App content */}
                    <div className="p-3 pt-6 h-full">
                      {/* App header */}
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="font-bold text-gray-900 text-xs">Restoran Yönetimi</h3>
                        <div className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs font-bold">7</span>
                        </div>
                      </div>
                      
                      {/* Order items */}
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 p-1.5 bg-green-50 rounded">
                          <div className="w-3 h-3 bg-green-500 rounded-full flex items-center justify-center">
                            <svg className="w-1.5 h-1.5 text-white" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                            </svg>
                          </div>
                          <div>
                            <div className="text-xs font-medium text-gray-800 line-through">Masa 12 - Lahmacun</div>
                            <div className="text-xs text-gray-500">Servis Edildi</div>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2 p-1.5 bg-yellow-50 rounded">
                          <div className="w-3 h-3 bg-yellow-500 rounded-full flex items-center justify-center">
                            <svg className="w-1.5 h-1.5 text-white" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                            </svg>
                          </div>
                          <div>
                            <div className="text-xs font-medium text-gray-800">Masa 5 - Döner</div>
                            <div className="text-xs text-yellow-600">Hazırlanıyor</div>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2 p-1.5 bg-red-50 rounded">
                          <div className="w-3 h-3 bg-red-500 rounded-full flex items-center justify-center">
                            <span className="text-white text-xs">!</span>
                          </div>
                          <div>
                            <div className="text-xs font-medium text-gray-800">Masa 8 - Kebap</div>
                            <div className="text-xs text-red-500">Acil</div>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2 p-1.5 bg-blue-50 rounded">
                          <div className="w-3 h-3 bg-blue-500 rounded-full flex items-center justify-center">
                            <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                          </div>
                          <div>
                            <div className="text-xs font-medium text-gray-800">Masa 3 - Pide</div>
                            <div className="text-xs text-blue-500">Sipariş Alındı</div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Daily stats */}
                      <div className="mt-4 p-2 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-medium text-gray-700">Günlük Satış</span>
                          <span className="text-xs font-bold text-green-600">₺2,847</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-1">
                          <div className="bg-gradient-to-r from-green-500 to-emerald-500 h-1 rounded-full" style={{width: '68%'}}></div>
                        </div>
                        <div className="text-xs text-gray-500 mt-1">Hedef: ₺4,200</div>
                      </div>
                      
                      {/* Bottom stats */}
                      <div className="absolute bottom-3 left-3 right-3">
                        <div className="grid grid-cols-2 gap-1.5 text-center">
                          <div className="bg-orange-100 rounded p-1.5">
                            <div className="text-orange-600 font-bold text-xs">23</div>
                            <div className="text-orange-500 text-xs">Servis</div>
                          </div>
                          <div className="bg-purple-100 rounded p-1.5">
                            <div className="text-purple-600 font-bold text-xs">7</div>
                            <div className="text-purple-500 text-xs">Bekliyor</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Multi-Platform Badge - Bottom Center */}
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 z-30">
                  <div className="bg-white/95 backdrop-blur-sm border border-orange-200 rounded-xl px-4 py-3 shadow-lg">
                    <div className="text-center">
                      <div className="text-xs font-bold text-gray-900 mb-2">Multi-Platform</div>
                      <div className="flex items-center gap-3">
                        {/* Web icon */}
                        <div className="flex flex-col items-center">
                          <div className="w-6 h-6 bg-blue-100 rounded-lg flex items-center justify-center mb-1">
                            <svg className="w-3 h-3 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
                            </svg>
                          </div>
                          <span className="text-xs text-gray-600">Web</span>
                        </div>
                        
                        {/* Mobile icon */}
                        <div className="flex flex-col items-center">
                          <div className="w-6 h-6 bg-green-100 rounded-lg flex items-center justify-center mb-1">
                            <svg className="w-3 h-3 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M17 2H7c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM7 4h10v14H7V4z"/>
                            </svg>
                          </div>
                          <span className="text-xs text-gray-600">Mobile</span>
                        </div>
                        
                        {/* Desktop icon */}
                        <div className="flex flex-col items-center">
                          <div className="w-6 h-6 bg-purple-100 rounded-lg flex items-center justify-center mb-1">
                            <svg className="w-3 h-3 text-purple-600" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M21 2H3c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h7l-2 3v1h8v-1l-2-3h7c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 12H3V4h18v10z"/>
                            </svg>
                          </div>
                          <span className="text-xs text-gray-600">Desktop</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact & Newsletter Section */}
      <section className="bg-gradient-to-br from-gray-50 to-gray-100 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-8">
            
            {/* Contact Form */}
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <div className="mb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Beni Arayın</h3>
                <p className="text-gray-600 text-sm">Size en kısa sürede dönüş yapalım</p>
              </div>
              
              <form action="https://formspree.io/f/xandwdok" method="POST" className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <input
                      type="text"
                      name="name"
                      placeholder="Ad Soyad"
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[#162b4a] focus:border-transparent outline-none transition-all text-sm"
                      style={{textTransform: 'capitalize'}}
                      onInput={(e) => {
                        const input = e.target as HTMLInputElement;
                        input.value = input.value.replace(/[^a-zA-ZçğıöşüÇĞIİÖŞÜ\s]/g, '');
                        input.value = input.value.toLowerCase().replace(/\b\w/g, l => l.toUpperCase());
                      }}
                      required
                    />
                  </div>
                  <div>
                    <input
                      type="tel"
                      name="phone"
                      placeholder="Telefon (0850 242 00 02)"
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[#162b4a] focus:border-transparent outline-none transition-all text-sm"
                      pattern="[0-9]{10,11}"
                      onInput={(e) => {
                        const input = e.target as HTMLInputElement;
                        input.value = input.value.replace(/[^0-9]/g, '');
                        if (input.value.length > 11) input.value = input.value.slice(0, 11);
                      }}
                      title="Lütfen sadece rakam giriniz (10-11 haneli)"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <input
                    type="email"
                    name="email"
                    placeholder="E-posta (ornek@email.com)"
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[#162b4a] focus:border-transparent outline-none transition-all text-sm"
                    pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
                    onInput={(e) => {
                      const input = e.target as HTMLInputElement;
                      input.value = input.value.toLowerCase();
                    }}
                    title="Lütfen geçerli bir e-posta adresi giriniz"
                    required
                  />
                </div>
                
                <div>
                  <textarea
                    name="message"
                    placeholder="Kısa mesaj (isteğe bağlı)"
                    rows={3}
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-[#162b4a] focus:border-transparent outline-none transition-all text-sm resize-none"
                  ></textarea>
                </div>
                
                <button
                  type="submit"
                  className="group relative w-full bg-gradient-to-r from-[#dd4e53] to-[#e86366] hover:from-[#e86366] hover:to-[#f47779] text-white py-3 px-6 rounded-lg font-medium transition-all duration-300 shadow-[0_0_20px_rgba(221,78,83,0.3)] hover:shadow-[0_0_30px_rgba(221,78,83,0.6)] hover:scale-[1.02] backdrop-blur-sm border border-[#dd4e53]/30"
                >
                  <span className="relative z-10 drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]">Gönder</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-[#dd4e53]/20 to-[#e86366]/20 rounded-lg blur-sm group-hover:blur-md transition-all duration-300"></div>
                </button>
              </form>
            </div>
            
            {/* Newsletter */}
            <div className="bg-gradient-to-br from-[#162b4a] to-[#1e3a5f] rounded-2xl p-6 text-white shadow-lg">
              <div className="mb-6">
                <div className="flex items-center gap-3 mb-3">
                  <svg className="w-8 h-8 text-[#dd4e53] drop-shadow-[0_0_8px_rgba(221,78,83,0.6)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                  </svg>
                  <h3 className="text-xl font-bold">Haftalık Bülten</h3>
                </div>
                <p className="text-blue-100 text-sm leading-relaxed">
                  Teknoloji ve yazılım dünyasındaki yenilikler hakkında hazırladığımız haftalık yazıları paylaştığımız bültene abone olun. 
                </p>
              </div>
              
              <form action="https://formspree.io/f/mvgbpbrk" method="POST" className="space-y-4">
                <div>
                  <input
                    type="email"
                    name="email"
                    placeholder="E-posta adresiniz (ornek@email.com)"
                    className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 focus:ring-2 focus:ring-[#dd4e53] focus:border-transparent outline-none transition-all text-sm placeholder-blue-100 text-white"
                    pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
                    onInput={(e) => {
                      const input = e.target as HTMLInputElement;
                      input.value = input.value.toLowerCase();
                    }}
                    title="Lütfen geçerli bir e-posta adresi giriniz"
                    required
                  />
                </div>
                
                {/* Hidden field to identify newsletter subscription */}
                <input type="hidden" name="form_type" value="newsletter" />
                
                <button
                  type="submit"
                  className="group relative w-full bg-gradient-to-r from-[#dd4e53] to-[#e86366] hover:from-[#e86366] hover:to-[#f47779] text-white py-3 px-6 rounded-lg font-medium transition-all duration-300 shadow-[0_0_20px_rgba(221,78,83,0.3)] hover:shadow-[0_0_30px_rgba(221,78,83,0.6)] hover:scale-[1.02] backdrop-blur-sm border border-[#dd4e53]/30"
                >
                  <span className="relative z-10 drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]">Abone Ol</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-[#dd4e53]/20 to-[#e86366]/20 rounded-lg blur-sm group-hover:blur-md transition-all duration-300"></div>
                </button>
              </form>
              
              <div className="mt-4 text-xs text-blue-100 flex items-center gap-2">
                <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Spam yapmıyoruz • İstediğiniz zaman iptal edebilirsiniz</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative bg-white py-8">
        <div className="max-w-7xl mx-auto px-4">
          {/* Desktop Layout */}
          <div className="hidden lg:grid lg:grid-cols-4 gap-6 items-start">
            
            {/* Logo */}
            <div className="lg:col-span-1">
              <img 
                src="/logo.svg" 
                alt="DataWiz ERP Entegrasyonu ve Operasyon Takip Sistemleri Logo" 
                className="h-8 w-auto"
                width="156"
                height="39"
              />
            </div>
            
            {/* Address */}
            <div className="lg:col-span-1">
              <a 
                href="https://maps.google.com?q=Koza+Plaza+A+Blok+K:1+No:28+Tekstilkent+Esenler+İstanbul" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-[#162b4a] transition-colors text-sm flex items-start gap-2"
              >
                <svg className="w-4 h-4 text-[#162b4a] mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                </svg>
                <div>
                  Koza Plaza A Blok K:1 No:28<br/>
                  Tekstilkent, Esenler, İstanbul
                </div>
              </a>
            </div>
            
            {/* Phone & Email */}
            <div className="lg:col-span-1">
              <div className="space-y-2">
                <a 
                  href="tel:+908502420002" 
                  className="flex items-center gap-2 text-gray-600 hover:text-[#162b4a] transition-colors text-sm"
                >
                  <svg className="w-4 h-4 text-[#162b4a] flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M6.62 10.79c1.44 2.83 3.76 5.15 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                  </svg>
                  0850 242 00 02
                </a>
                
                <a 
                  href="mailto:info@datawiz.com.tr" 
                  className="flex items-center gap-2 text-gray-600 hover:text-[#162b4a] transition-colors text-sm"
                >
                  <svg className="w-4 h-4 text-[#162b4a] flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                  </svg>
                  info@datawiz.com.tr
                </a>
              </div>
            </div>
            
            {/* WhatsApp - Hero Style */}
            <div className="lg:col-span-1">
              <a 
                href="https://wa.me/908502420002" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 backdrop-blur-sm"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.864 3.687"/>
                </svg>
                WhatsApp
              </a>
            </div>
          </div>

          {/* Mobile Layout */}
          <div className="lg:hidden space-y-4">
            
            {/* Logo */}
            <div className="text-center">
              <img 
                src="/logo.svg" 
                alt="DataWiz ERP ve Operasyon Çözümleri Mobil Logo" 
                className="h-6 w-auto mx-auto"
                width="156"
                height="39"
              />
            </div>
            
            {/* Contact Info Grid - 2 columns */}
            <div className="grid grid-cols-2 gap-4 text-xs">
              
              {/* Left Column: Address */}
              <div>
                <a 
                  href="https://maps.google.com?q=Koza+Plaza+A+Blok+K:1+No:28+Tekstilkent+Esenler+İstanbul" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-[#162b4a] transition-colors flex items-start gap-1"
                >
                  <svg className="w-3 h-3 text-[#162b4a] mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                  </svg>
                  <div>
                    Koza Plaza A Blok K:1 No:28<br/>
                    Tekstilkent, Esenler, İstanbul
                  </div>
                </a>
              </div>
              
              {/* Right Column: Phone & Email */}
              <div className="space-y-2">
                <a 
                  href="tel:+908502420002" 
                  className="flex items-center gap-1 text-gray-600 hover:text-[#162b4a] transition-colors"
                >
                  <svg className="w-3 h-3 text-[#162b4a] flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M6.62 10.79c1.44 2.83 3.76 5.15 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                  </svg>
                  0850 242 00 02
                </a>
                
                <a 
                  href="mailto:info@datawiz.com.tr" 
                  className="flex items-center gap-1 text-gray-600 hover:text-[#162b4a] transition-colors"
                >
                  <svg className="w-3 h-3 text-[#162b4a] flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                  </svg>
                  info@datawiz.com.tr
                </a>
              </div>
            </div>
            
            {/* WhatsApp Button */}
            <div className="text-center">
              <a 
                href="https://wa.me/908502420002" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.864 3.687"/>
                </svg>
                WhatsApp
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-200 mt-6">
          <div className="max-w-7xl mx-auto px-4 py-3">
            
            {/* Desktop Layout */}
            <div className="hidden md:flex items-center justify-between gap-3 text-xs">
              <div className="text-gray-500">
                © {new Date().getFullYear()} DataWiz. Tüm hakları saklıdır.
              </div>
              
              <div className="flex items-center gap-4">
                <button 
                  onClick={() => setShowPrivacyModal(true)}
                  className="text-gray-500 hover:text-[#162b4a] transition-colors"
                >
                  Gizlilik Politikası
                </button>
                <button 
                  onClick={() => setShowTermsModal(true)}
                  className="text-gray-500 hover:text-[#162b4a] transition-colors"
                >
                  Kullanım Şartları
                </button>
                <button 
                  onClick={() => setShowKvkkModal(true)}
                  className="text-gray-500 hover:text-[#162b4a] transition-colors"
                >
                  KVKK
                </button>
              </div>
            </div>

            {/* Mobile Layout */}
            <div className="md:hidden space-y-2 text-xs">
              <div className="text-center text-gray-500">
                © {new Date().getFullYear()} DataWiz. Tüm hakları saklıdır.
              </div>
              
              <div className="flex items-center justify-center gap-3">
                <button 
                  onClick={() => setShowPrivacyModal(true)}
                  className="text-gray-500 hover:text-[#162b4a] transition-colors"
                >
                  Gizlilik Politikası
                </button>
                <button 
                  onClick={() => setShowTermsModal(true)}
                  className="text-gray-500 hover:text-[#162b4a] transition-colors"
                >
                  Kullanım Şartları
                </button>
                <button 
                  onClick={() => setShowKvkkModal(true)}
                  className="text-gray-500 hover:text-[#162b4a] transition-colors"
                >
                  KVKK
                </button>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Sticky WhatsApp Button */}
      {showWhatsAppButton && (
        <div className="fixed bottom-6 right-6 z-40">
          <a
            href="https://wa.me/908502420002"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-center w-14 h-14 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 animate-pulse hover:animate-none"
          >
            <svg className="w-7 h-7 group-hover:scale-110 transition-transform duration-300" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.864 3.687"/>
            </svg>
            
            {/* Tooltip */}
            <div className="absolute right-16 top-1/2 transform -translate-y-1/2 bg-gray-900 text-white text-sm px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none">
              Hemen WhatsApp'tan yazın!
              <div className="absolute left-full top-1/2 transform -translate-y-1/2 border-4 border-transparent border-l-gray-900"></div>
            </div>
          </a>
        </div>
      )}

      {/* Privacy Policy Modal */}
      {showPrivacyModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-4xl max-h-[80vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Gizlilik Politikası</h2>
                <button 
                  onClick={() => setShowPrivacyModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="prose prose-sm max-w-none text-gray-600 space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">1. Veri Sorumlusu</h3>
                <p>DataWiz olarak, 6698 sayılı Kişisel Verilerin Korunması Kanunu kapsamında veri sorumlusu sıfatıyla hareket etmekteyiz.</p>
                
                <h3 className="text-lg font-semibold text-gray-900">2. Toplanan Kişisel Veriler</h3>
                <p>Web sitemiz üzerinden aşağıdaki kişisel verileriniz toplanabilir:</p>
                <ul className="list-disc pl-6">
                  <li>Ad, soyad ve iletişim bilgileri</li>
                  <li>E-posta adresi ve telefon numarası</li>
                  <li>Web sitesi kullanım bilgileri ve çerezler</li>
                  <li>IP adresi ve tarayıcı bilgileri</li>
                </ul>
                
                <h3 className="text-lg font-semibold text-gray-900">3. Veri İşleme Amaçları</h3>
                <p>Kişisel verileriniz aşağıdaki amaçlarla işlenmektedir:</p>
                <ul className="list-disc pl-6">
                  <li>Hizmet sunumu ve müşteri desteği</li>
                  <li>İletişim ve bilgilendirme</li>
                  <li>Web sitesi performansının iyileştirilmesi</li>
                  <li>Yasal yükümlülüklerin yerine getirilmesi</li>
                </ul>
                
                <h3 className="text-lg font-semibold text-gray-900">4. Veri Güvenliği</h3>
                <p>Kişisel verilerinizin güvenliği için gerekli teknik ve idari tedbirler alınmaktadır. Verileriniz yetkisiz erişime karşı korunmaktadır.</p>
                
                <h3 className="text-lg font-semibold text-gray-900">5. Haklarınız</h3>
                <p>KVKK kapsamında aşağıdaki haklara sahipsiniz:</p>
                <ul className="list-disc pl-6">
                  <li>Kişisel verilerinizin işlenip işlenmediğini öğrenme</li>
                  <li>İşlenen verileriniz hakkında bilgi talep etme</li>
                  <li>Verilerin düzeltilmesini veya silinmesini talep etme</li>
                  <li>Veri işlemeye itiraz etme</li>
                </ul>
                
                <h3 className="text-lg font-semibold text-gray-900">6. İletişim</h3>
                <p>Gizlilik politikamız hakkında sorularınız için <a href="mailto:info@datawiz.com.tr" className="text-[#162b4a] hover:underline">info@datawiz.com.tr</a> adresinden bizimle iletişime geçebilirsiniz.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Terms of Service Modal */}
      {showTermsModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-4xl max-h-[80vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Kullanım Şartları</h2>
                <button 
                  onClick={() => setShowTermsModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="prose prose-sm max-w-none text-gray-600 space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">1. Kabul ve Uygulama</h3>
                <p>Bu web sitesini kullanarak aşağıdaki kullanım şartlarını kabul etmiş sayılırsınız. Şartları kabul etmiyorsanız siteyi kullanmamanızı rica ederiz.</p>
                
                <h3 className="text-lg font-semibold text-gray-900">2. Hizmet Tanımı</h3>
                <p>DataWiz, işletmeler için operasyon takip sistemleri, ERP entegrasyonları ve otomasyon çözümleri sunan bir teknoloji şirketidir.</p>
                
                <h3 className="text-lg font-semibold text-gray-900">3. Kullanıcı Yükümlülükleri</h3>
                <ul className="list-disc pl-6">
                  <li>Doğru ve güncel bilgi sağlamak</li>
                  <li>Web sitesini yasal amaçlar için kullanmak</li>
                  <li>Telif hakları ve fikri mülkiyet haklarına saygı göstermek</li>
                  <li>Zararlı yazılım veya kod paylaşmamak</li>
                </ul>
                
                <h3 className="text-lg font-semibold text-gray-900">4. Hizmet Kapsamı</h3>
                <p>Sunduğumuz hizmetler:</p>
                <ul className="list-disc pl-6">
                  <li>ERP hızlandırıcı arayüzler</li>
                  <li>Operasyon takip uygulamaları</li>
                  <li>Otomasyon danışmanlığı</li>
                  <li>Özel yazılım geliştirme</li>
                </ul>
                
                <h3 className="text-lg font-semibold text-gray-900">5. Sorumluluk Sınırlaması</h3>
                <p>DataWiz, web sitesinin kesintisiz ve hatasız çalışacağını garanti etmez. Teknik sorunlardan kaynaklanan zararlardan sorumlu değildir.</p>
                
                <h3 className="text-lg font-semibold text-gray-900">6. Fikri Mülkiyet</h3>
                <p>Web sitesindeki tüm içerik, tasarım ve yazılımlar DataWiz'in telif hakkı koruması altındadır.</p>
                
                <h3 className="text-lg font-semibold text-gray-900">7. Değişiklikler</h3>
                <p>Bu kullanım şartları önceden bildirimde bulunulmaksızın değiştirilebilir. Güncel şartlar web sitesinde yayınlanır.</p>
                
                <h3 className="text-lg font-semibold text-gray-900">8. İletişim</h3>
                <p>Kullanım şartları hakkında sorularınız için <a href="mailto:info@datawiz.com.tr" className="text-[#162b4a] hover:underline">info@datawiz.com.tr</a> adresinden bizimle iletişime geçebilirsiniz.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Cookie Consent Banner */}
      {showCookieBanner && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-2xl z-50 p-4">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
              <div className="flex items-start gap-3 flex-1">
                <div className="flex-shrink-0 w-8 h-8 bg-[#dd4e53] rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900 mb-1">🍪 Çerez Politikası</h4>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Web sitemizde deneyiminizi iyileştirmek için çerezler kullanıyoruz. 
                    <button 
                      onClick={() => setShowCookieModal(true)}
                      className="text-[#dd4e53] hover:text-[#e86366] font-medium ml-1 underline"
                    >
                      Detaylı bilgi
                    </button> için tıklayın.
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 flex-shrink-0">
                <button
                  onClick={rejectCookies}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800 border border-gray-300 hover:border-gray-400 rounded-lg font-medium transition-all duration-300 text-sm"
                >
                  Reddet
                </button>
                <button
                  onClick={acceptCookies}
                  className="px-6 py-2 bg-gradient-to-r from-[#dd4e53] to-[#e86366] hover:from-[#e86366] hover:to-[#f47779] text-white rounded-lg font-medium transition-all duration-300 shadow-lg hover:shadow-xl text-sm"
                >
                  Kabul Et
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Cookie Policy Modal */}
      {showCookieModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-4xl max-h-[80vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Çerez Politikası</h2>
                <button 
                  onClick={() => setShowCookieModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="prose prose-sm max-w-none text-gray-600 space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">Çerezler Nedir?</h3>
                <p>Çerezler, web sitelerinin daha iyi çalışması ve kullanıcı deneyiminin iyileştirilmesi için tarayıcınızda saklanan küçük metin dosyalarıdır.</p>
                
                <h3 className="text-lg font-semibold text-gray-900">Hangi Çerezleri Kullanıyoruz?</h3>
                
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
                  <h4 className="font-semibold text-green-800 mb-2">✅ Zorunlu Çerezler</h4>
                  <p className="text-green-700 text-sm">Web sitesinin temel işlevlerini sağlamak için gereklidir. Bu çerezler her zaman aktiftir.</p>
                  <ul className="list-disc pl-6 mt-2 text-green-700 text-sm">
                    <li>Oturum yönetimi</li>
                    <li>Güvenlik ve doğrulama</li>
                    <li>Form verileri</li>
                  </ul>
                </div>
                
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                  <h4 className="font-semibold text-blue-800 mb-2">📊 Analitik Çerezler</h4>
                  <p className="text-blue-700 text-sm">Web sitesi performansını anlamamız ve iyileştirmemiz için kullanılır.</p>
                  <ul className="list-disc pl-6 mt-2 text-blue-700 text-sm">
                    <li>Sayfa görüntülemeleri</li>
                    <li>Kullanıcı davranışları</li>
                    <li>Trafik kaynakları</li>
                  </ul>
                </div>
                
                <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 mb-4">
                  <h4 className="font-semibold text-purple-800 mb-2">🎯 Pazarlama Çerezleri</h4>
                  <p className="text-purple-700 text-sm">Size daha alakalı reklamlar göstermek ve pazarlama kampanyalarımızı optimize etmek için kullanılır.</p>
                  <ul className="list-disc pl-6 mt-2 text-purple-700 text-sm">
                    <li>Reklam kişiselleştirme</li>
                    <li>Sosyal medya entegrasyonu</li>
                    <li>Pazarlama analizi</li>
                  </ul>
                </div>
                
                <h3 className="text-lg font-semibold text-gray-900">Çerez Yönetimi</h3>
                <p>Tarayıcı ayarlarınızdan çerezleri kontrol edebilirsiniz:</p>
                <ul className="list-disc pl-6">
                  <li><strong>Chrome:</strong> Ayarlar → Gizlilik ve güvenlik → Çerezler</li>
                  <li><strong>Firefox:</strong> Ayarlar → Gizlilik ve güvenlik → Çerezler</li>
                  <li><strong>Safari:</strong> Tercihler → Gizlilik → Çerezler</li>
                </ul>
                
                <h3 className="text-lg font-semibold text-gray-900">İletişim</h3>
                <p>Çerez politikamız hakkında sorularınız için <a href="mailto:info@datawiz.com.tr" className="text-[#dd4e53] hover:underline">info@datawiz.com.tr</a> adresinden bizimle iletişime geçebilirsiniz.</p>
                
                <div className="flex gap-3 pt-4">
                  <button
                    onClick={() => {
                      rejectCookies();
                      setShowCookieModal(false);
                    }}
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Çerezleri Reddet
                  </button>
                  <button
                    onClick={() => {
                      acceptCookies();
                      setShowCookieModal(false);
                    }}
                    className="px-6 py-2 bg-gradient-to-r from-[#dd4e53] to-[#e86366] hover:from-[#e86366] hover:to-[#f47779] text-white rounded-lg font-medium transition-all duration-300"
                  >
                    Çerezleri Kabul Et
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* KVKK Modal */}
      {showKvkkModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-4xl max-h-[80vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">KVKK Aydınlatma Metni</h2>
                <button 
                  onClick={() => setShowKvkkModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="prose prose-sm max-w-none text-gray-600 space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">Veri Sorumlusu Kimliği</h3>
                <p><strong>DataWiz</strong><br/>
                Adres: Koza Plaza A Blok K:1 No:28, Tekstilkent, Esenler, İstanbul<br/>
                E-posta: info@datawiz.com.tr<br/>
                Telefon: 0850 242 00 02</p>
                
                <h3 className="text-lg font-semibold text-gray-900">Kişisel Verilerin İşlenme Amacı</h3>
                <p>Kişisel verileriniz aşağıdaki amaçlarla işlenmektedir:</p>
                <ul className="list-disc pl-6">
                  <li>Hizmet sunumu ve sözleşme yönetimi</li>
                  <li>Müşteri memnuniyeti ve destek hizmetleri</li>
                  <li>İletişim faaliyetleri</li>
                  <li>Yasal yükümlülüklerin yerine getirilmesi</li>
                  <li>İş geliştirme ve analiz çalışmaları</li>
                </ul>
                
                <h3 className="text-lg font-semibold text-gray-900">Veri Toplama Yöntemi</h3>
                <p>Kişisel verileriniz aşağıdaki yöntemlerle toplanmaktadır:</p>
                <ul className="list-disc pl-6">
                  <li>Web sitesi iletişim formları</li>
                  <li>E-posta ve telefon iletişimi</li>
                  <li>WhatsApp Business mesajlaşma</li>
                  <li>Çerezler ve web analitik araçları</li>
                </ul>
                
                <h3 className="text-lg font-semibold text-gray-900">İşlenen Veri Kategorileri</h3>
                <ul className="list-disc pl-6">
                  <li><strong>Kimlik Bilgileri:</strong> Ad, soyad</li>
                  <li><strong>İletişim Bilgileri:</strong> E-posta, telefon, adres</li>
                  <li><strong>Müşteri İşlem Bilgileri:</strong> Hizmet talepleri, sözleşme bilgileri</li>
                  <li><strong>Elektronik İletişim Bilgileri:</strong> IP adresi, çerez bilgileri</li>
                </ul>
                
                <h3 className="text-lg font-semibold text-gray-900">Kişisel Verilerin Aktarılması</h3>
                <p>Kişisel verileriniz, yasal zorunluluklar çerçevesinde yetkili kamu kurumları ile paylaşılabilir. Bunun dışında üçüncü taraflarla paylaşılmaz.</p>
                
                <h3 className="text-lg font-semibold text-gray-900">KVKK Kapsamındaki Haklarınız</h3>
                <p>6698 sayılı KVKK'nın 11. maddesi kapsamında aşağıdaki haklara sahipsiniz:</p>
                <ul className="list-disc pl-6">
                  <li>Kişisel verilerinizin işlenip işlenmediğini öğrenme</li>
                  <li>İşlenen kişisel verileriniz hakkında bilgi talep etme</li>
                  <li>Kişisel verilerinizin işlenme amacını ve bunların amacına uygun kullanılıp kullanılmadığını öğrenme</li>
                  <li>Yurt içinde veya yurt dışında kişisel verilerinizin aktarıldığı üçüncü kişileri bilme</li>
                  <li>Kişisel verilerinizin eksik veya yanlış işlenmiş olması hâlinde bunların düzeltilmesini isteme</li>
                  <li>Kişisel verilerinizin silinmesini veya yok edilmesini isteme</li>
                  <li>Kişisel verilerinizin işlenmesine itiraz etme</li>
                  <li>Kişisel verilerinizin kanuna aykırı olarak işlenmesi sebebiyle zarara uğranması hâlinde zararın giderilmesini talep etme</li>
                </ul>
                
                <h3 className="text-lg font-semibold text-gray-900">Başvuru Yöntemi</h3>
                <p>KVKK kapsamındaki haklarınızı kullanmak için <a href="mailto:info@datawiz.com.tr" className="text-[#162b4a] hover:underline">info@datawiz.com.tr</a> adresine e-posta gönderebilir veya yazılı olarak şirket adresimize başvurabilirsiniz.</p>
                
                <p className="text-sm text-gray-500 mt-6">Bu aydınlatma metni {new Date().toLocaleDateString('tr-TR')} tarihinde güncellenmiştir.</p>
              </div>
            </div>
          </div>
        </div>
      )}

    </>
  );
}