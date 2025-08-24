"use client";

import { useEffect, useState } from 'react';

interface Service {
  id: string;
  title: string;
  headline: string;
  story: string;
  benefit: string;
  visual: string;
  color: string;
}

export default function ServicesOverview() {
  const [services, setServices] = useState<Service[]>([]);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch('/content/services-overview.json');
        const data = await response.json();
        setServices(data);
      } catch (error) {
        console.error('Failed to fetch services overview:', error);
        // Fallback data with Apple-style storytelling
        setServices([
          {
            id: "operasyon-takip",
            title: "Operasyon Takip",
            headline: "Sahadaki her hareketiniz, anında merkeze ulaşır.",
            story: "Artık ekiplerinizin nerede olduğunu, ne yaptığını tahmin etmeye çalışmayın. Her adım, her işlem, her veri anında görünür hale gelir.",
            benefit: "Süreçleriniz şeffaf, ekipleriniz koordineli, verimliliğiniz maksimum.",
            visual: "📍",
            color: "from-blue-500 to-cyan-500"
          },
          {
            id: "erp-arayuzler",
            title: "ERP Hızlandırıcı",
            headline: "Karmaşık sistemler, basit arayüzler.",
            story: "ERP sistemlerinizin karmaşıklığı artık ekiplerinizin önünde engel değil. Her departman kendi işine odaklanır, sistem arka planda çalışır.",
            benefit: "Ekipleriniz sistemle değil, işleriyle uğraşır.",
            visual: "⚡",
            color: "from-purple-500 to-pink-500"
          },
          {
            id: "arka-plan-uygulamalari",
            title: "Arka Plan Otomasyonu",
            headline: "Verileriniz sizin için çalışır.",
            story: "Manuel hesaplamalar, tekrarlayan raporlar, zaman alan işlemler artık geçmişte kaldı. Verileriniz siz uyurken bile çalışır.",
            benefit: "Zamanınız değerli işlere, verileriniz rutin işlere.",
            visual: "🤖",
            color: "from-green-500 to-emerald-500"
          },
          {
            id: "ai-raporlama",
            title: "AI Raporlama",
            headline: "Sorularınızı doğal dille sorun.",
            story: "Karmaşık sorgular, teknik raporlar artık gerekli değil. Verilerinizle sohbet edin, istediğiniz bilgiyi anında alın.",
            benefit: "Veri analizi artık herkesin işi.",
            visual: "🧠",
            color: "from-orange-500 to-red-500"
          }
        ]);
      }
    };
    fetchServices();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* Intro Section */}
      <section className="scroll-snap-section bg-white flex items-center justify-center">
        <div className="mx-auto max-w-4xl px-4 text-center">
          <h2 className={`text-4xl md:text-5xl font-bold mb-6 text-gray-900 transition-all duration-1000 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            Ne Yapıyoruz?
          </h2>
          <p className={`text-lg text-gray-600 leading-relaxed transition-all duration-1000 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: '100ms' }}>
            Teknolojiyi arka plana atıyor, insan deneyimini öne çıkarıyoruz.
          </p>
        </div>
      </section>

      {/* Service 1 - Operasyon Takip: Veri akışının yolculuğu */}
      <section className="scroll-snap-section relative bg-gradient-to-b from-gray-50 via-slate-800 to-slate-900 text-white overflow-hidden">
        {/* Background imagery - Field operations */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-blue-500/30 to-cyan-500/30 rounded-full blur-3xl"></div>
          <div className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-br from-green-500/30 to-emerald-500/30 rounded-full blur-2xl"></div>
          <div className="absolute bottom-40 left-1/3 w-40 h-40 bg-gradient-to-br from-blue-600/20 to-indigo-600/20 rounded-full blur-4xl"></div>
          
          {/* Network nodes */}
          <div className="absolute inset-0">
            <svg className="w-full h-full opacity-20">
              <defs>
                <radialGradient id="nodeGradient" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.6"/>
                  <stop offset="100%" stopColor="#3b82f6" stopOpacity="0"/>
                </radialGradient>
              </defs>
              {Array.from({length: 12}).map((_, i) => (
                <circle key={i} 
                        cx={`${15 + (i % 4) * 25}%`} 
                        cy={`${20 + Math.floor(i / 4) * 30}%`} 
                        r="4" 
                        fill="url(#nodeGradient)">
                  <animate attributeName="r" values="4;8;4" dur="3s" repeatCount="indefinite" begin={`${i * 0.5}s`}/>
                </circle>
              ))}
              {/* Connection lines */}
              <path d="M15% 20% Q50% 50% 85% 80%" stroke="#3b82f6" strokeWidth="1" fill="none" opacity="0.3">
                <animate attributeName="stroke-dasharray" values="0,100;50,50;100,0" dur="4s" repeatCount="indefinite"/>
              </path>
            </svg>
          </div>
        </div>
        
        {/* Smooth transition from white */}
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-white via-gray-100 to-transparent"></div>
        
        <div className="relative flex items-center justify-center h-full">
          <div className={`mx-auto max-w-6xl px-4 transition-all duration-1000 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`} style={{ transitionDelay: '200ms' }}>
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <h3 className="text-5xl font-bold mb-6 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">{services[0]?.title}</h3>
                <p className="text-slate-300 text-xl mb-8 leading-relaxed">{services[0]?.headline}</p>
                <p className="text-slate-400 leading-relaxed mb-10 text-lg">{services[0]?.story}</p>
                
                {/* Real-time data visualization */}
                <div className="mb-10 p-6 bg-slate-800 rounded-2xl border border-slate-700">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-green-300 text-sm">Canlı Veri Akışı</span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">Saha Ekip #1</span>
                      <span className="text-blue-300">Konum güncellendi</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">Saha Ekip #3</span>
                      <span className="text-green-300">Görev tamamlandı</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">Merkez</span>
                      <span className="text-yellow-300">Yeni atama</span>
                    </div>
                  </div>
                </div>
                
                <div className="border-l-4 border-blue-400 pl-6 mb-8 bg-slate-800/50 p-4 rounded-r-lg">
                  <p className="text-blue-200 font-medium">{services[0]?.benefit}</p>
                </div>
                
                <a href={`/services/${services[0]?.id}`} className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-8 py-4 rounded-xl font-medium hover:from-blue-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105">
                  <span>Sistemi incele</span>
                  <div className="w-5 h-5 border-2 border-white/50 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                </a>
              </div>
              
              <div className="relative">
                {/* Network visualization */}
                <div className="relative w-full h-96 bg-slate-800/30 rounded-3xl p-8 backdrop-blur-sm border border-slate-700">
                  <div className="absolute inset-0 overflow-hidden rounded-3xl">
                    {/* Connection lines */}
                    <svg className="absolute inset-0 w-full h-full">
                      <line x1="20%" y1="30%" x2="80%" y2="70%" stroke="#3b82f6" strokeWidth="2" opacity="0.5">
                        <animate attributeName="opacity" values="0.3;0.8;0.3" dur="2s" repeatCount="indefinite"/>
                      </line>
                      <line x1="30%" y1="80%" x2="70%" y2="20%" stroke="#10b981" strokeWidth="2" opacity="0.5">
                        <animate attributeName="opacity" values="0.5;1;0.5" dur="1.5s" repeatCount="indefinite"/>
                      </line>
                    </svg>
                  </div>
                  
                  <div className="relative z-10 h-full flex flex-col justify-between">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-green-500/20 rounded-full mx-auto mb-3 flex items-center justify-center border border-green-400/30">
                        <div className="w-8 h-8 bg-green-400 rounded-full animate-pulse"></div>
                      </div>
                      <span className="text-green-300 text-sm font-medium">Saha Operasyonları</span>
                    </div>
                    
                    <div className="text-center">
                      <div className="w-20 h-20 bg-blue-500/20 rounded-full mx-auto mb-3 flex items-center justify-center border border-blue-400/30">
                        <div className="w-10 h-10 bg-blue-400 rounded-full"></div>
                      </div>
                      <span className="text-blue-300 text-sm font-medium">Merkez Koordinasyon</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Smooth transition to purple - data flowing into system */}
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-b from-transparent via-slate-800 to-purple-900 overflow-hidden">
          <div className="absolute inset-0">
            {Array.from({length: 20}).map((_, i) => (
              <div key={i} className="absolute w-1 bg-gradient-to-t from-purple-400/60 to-transparent opacity-60"
                   style={{
                     left: `${5 + (i * 4.5)}%`,
                     height: `${Math.random() * 80 + 20}px`,
                     bottom: 0,
                     animation: `float 4s ease-in-out infinite`,
                     animationDelay: `${i * 0.2}s`
                   }}>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service 2 - ERP Hızlandırıcı: Karmaşıklığın basitliğe dönüşümü */}
      <section className="scroll-snap-section relative bg-gradient-to-br from-purple-900 via-purple-700 to-purple-600 text-white overflow-hidden">
        {/* Background imagery - Circuit boards and digital transformation */}
        <div className="absolute inset-0 opacity-15">
          {/* Circuit board pattern */}
          <div className="absolute inset-0">
            <svg className="w-full h-full">
              <defs>
                <pattern id="circuit" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                  <rect width="100" height="100" fill="none"/>
                  <path d="M10,10 L90,10 L90,90 L10,90 Z M50,10 L50,50 M10,50 L90,50" stroke="#a855f7" strokeWidth="1" fill="none" opacity="0.3"/>
                  <circle cx="50" cy="50" r="3" fill="#a855f7" opacity="0.5"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#circuit)"/>
            </svg>
          </div>
          
          {/* Floating geometric shapes representing complexity */}
          <div className="absolute top-1/4 left-10">
            <div className="w-16 h-16 border-2 border-purple-300/40 rotate-45 animate-spin" style={{animationDuration: '8s'}}></div>
          </div>
          <div className="absolute top-1/3 right-20">
            <div className="w-12 h-12 border-2 border-purple-400/40 rounded-full animate-pulse"></div>
          </div>
          <div className="absolute bottom-1/3 left-1/4">
            <div className="w-20 h-20 border-2 border-purple-200/30 rotate-12 animate-bounce" style={{animationDuration: '4s'}}></div>
          </div>
        </div>
        
        <div className="relative flex items-center justify-center h-full">
          <div className={`mx-auto max-w-6xl px-4 transition-all duration-1000 ${visible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`} style={{ transitionDelay: '400ms' }}>
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-4 mb-8">
                <div className="relative">
                  {/* Complexity */}
                  <div className="w-20 h-20 border-4 border-purple-300 rounded-lg rotate-12 opacity-60"></div>
                  <div className="absolute -top-2 -left-2 w-16 h-16 border-4 border-purple-400 rounded-lg rotate-45"></div>
                  <div className="absolute top-2 left-2 w-12 h-12 border-4 border-purple-200 rounded-lg -rotate-12"></div>
                </div>
                
                <div className="text-6xl">→</div>
                
                <div className="relative">
                  {/* Simplicity */}
                  <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                    <div className="text-4xl">⚡</div>
                  </div>
                </div>
        </div>

              <h3 className="text-5xl font-bold mb-6 bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">{services[1]?.title}</h3>
              <p className="text-purple-200 text-2xl mb-8 max-w-3xl mx-auto">{services[1]?.headline}</p>
        </div>

            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20">
                <h4 className="text-xl font-bold mb-6 text-purple-100">Önce vs Sonra</h4>
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-8 h-8 bg-red-500/20 rounded-full flex items-center justify-center">
                      <span className="text-red-300 text-xs">×</span>
                    </div>
                    <span className="text-purple-200">15 adım, 30 dakika</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center">
                      <span className="text-green-300 text-xs">✓</span>
                    </div>
                    <span className="text-purple-200">3 tık, 2 dakika</span>
                  </div>
                </div>
                
                <div className="mt-8 p-4 bg-purple-400/20 rounded-xl">
                  <div className="text-lg font-bold text-purple-100 mb-2">%60 Hız Artışı</div>
                  <div className="w-full bg-purple-900/50 rounded-full h-3">
                    <div className="bg-gradient-to-r from-purple-400 to-purple-300 h-3 rounded-full transition-all duration-2000" style={{width: '60%'}}></div>
                  </div>
                </div>
              </div>
              
              <div>
                <p className="text-purple-100 leading-relaxed mb-8 text-lg">{services[1]?.story}</p>
                <a href={`/services/${services[1]?.id}`} className="inline-flex items-center gap-3 bg-white text-purple-700 px-8 py-4 rounded-xl font-bold hover:bg-purple-50 transition-all duration-300 transform hover:scale-105">
                  Hızlandırmayı gör
                  <div className="w-0 h-0 border-l-4 border-l-purple-700 border-y-4 border-y-transparent"></div>
                </a>
              </div>
            </div>
          </div>
        </div>
        
        {/* Smooth transition to white - efficiency flowing into automation */}
        <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-b from-transparent via-purple-400 to-white overflow-hidden">
          <div className="absolute inset-0 opacity-50">
            {Array.from({length: 12}).map((_, i) => (
              <div key={i} className="absolute bottom-0 w-2 bg-gradient-to-t from-green-400/70 to-transparent rounded-full"
                   style={{
                     left: `${8 + (i * 7)}%`,
                     height: `${Math.random() * 60 + 20}px`,
                     animation: `float 3s ease-in-out infinite`,
                     animationDelay: `${i * 0.3}s`
                   }}>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service 3 - Arka Plan Otomasyonu: Görünmez çalışan */}
      <section className="scroll-snap-section relative bg-gradient-to-b from-white via-gray-50 to-green-50 overflow-hidden">
        {/* Background imagery - Automation and background processes */}
        <div className="absolute inset-0 opacity-8">
          {/* Grid pattern suggesting systematic work */}
          <div className="absolute inset-0">
            <svg className="w-full h-full">
              <defs>
                <pattern id="grid" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
                  <rect width="60" height="60" fill="none"/>
                  <path d="M0,0 L60,0 L60,60 L0,60 Z" stroke="#10b981" strokeWidth="0.5" fill="none" opacity="0.3"/>
                  <circle cx="30" cy="30" r="2" fill="#10b981" opacity="0.4">
                    <animate attributeName="opacity" values="0.4;0.8;0.4" dur="4s" repeatCount="indefinite"/>
                  </circle>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)"/>
            </svg>
          </div>
          
          {/* Floating automation symbols */}
          <div className="absolute top-20 right-10 text-6xl opacity-20 animate-float">⚙️</div>
          <div className="absolute top-1/2 left-10 text-4xl opacity-15 animate-pulse">🔄</div>
          <div className="absolute bottom-1/4 right-1/3 text-5xl opacity-10 animate-bounce" style={{animationDuration: '6s'}}>📊</div>
          
          {/* Subtle flowing lines */}
          <div className="absolute inset-0">
            <svg className="w-full h-full opacity-20">
              <path d="M0,50% Q25%,30% 50%,50% T100%,50%" stroke="#10b981" strokeWidth="2" fill="none">
                <animate attributeName="stroke-dasharray" values="0,200;100,100;200,0" dur="6s" repeatCount="indefinite"/>
              </path>
            </svg>
          </div>
        </div>
        <div className="relative flex items-center justify-center h-full">
          <div className={`mx-auto max-w-6xl px-4 transition-all duration-1000 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`} style={{ transitionDelay: '600ms' }}>
            <div className="grid lg:grid-cols-3 gap-12 items-center">
              <div className="lg:col-span-2">
                <div className="mb-8">
                  <div className="inline-flex items-center gap-3 mb-6">
                    <div className="relative">
                      <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                        <div className="text-2xl">🤖</div>
                      </div>
                      {/* Subtle working indicator */}
                      <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full animate-pulse border-2 border-white"></div>
                    </div>
                    <div>
                      <span className="text-green-600 text-sm font-medium">24/7 Aktif</span>
                    </div>
                  </div>
                  
                  <h3 className="text-5xl font-bold mb-6 text-gray-900">{services[2]?.title}</h3>
                  <p className="text-green-600 text-xl mb-8 font-medium">{services[2]?.headline}</p>
                </div>

                <p className="text-gray-700 leading-relaxed mb-10 text-lg">{services[2]?.story}</p>
                
                {/* Background activity monitor */}
                <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6 mb-10">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-semibold text-gray-900">Şu An Çalışan İşlemler</h4>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-green-600 text-sm">Aktif</span>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between py-2">
                      <span className="text-gray-600 text-sm">Günlük raporlar oluşturuluyor</span>
                      <div className="w-20 bg-gray-200 rounded-full h-2">
                        <div className="bg-green-500 h-2 rounded-full transition-all duration-1000" style={{width: '75%'}}></div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between py-2">
                      <span className="text-gray-600 text-sm">Veri temizleme işlemi</span>
                      <div className="w-20 bg-gray-200 rounded-full h-2">
                        <div className="bg-blue-500 h-2 rounded-full transition-all duration-1000" style={{width: '45%'}}></div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between py-2">
                      <span className="text-gray-600 text-sm">Performans analizi</span>
                      <div className="w-20 bg-gray-200 rounded-full h-2">
                        <div className="bg-purple-500 h-2 rounded-full transition-all duration-1000" style={{width: '90%'}}></div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-green-50 border-l-4 border-green-500 p-6 mb-8 rounded-r-xl">
                  <p className="text-green-800 font-medium">{services[2]?.benefit}</p>
                </div>

                <a href={`/services/${services[2]?.id}`} className="inline-flex items-center gap-3 bg-green-600 text-white px-8 py-4 rounded-xl font-medium hover:bg-green-700 transition-all duration-300 transform hover:scale-105">
                  Otomasyonu izle
                  <div className="w-5 h-5 border-2 border-white/50 rounded-full animate-spin border-t-white"></div>
                </a>
              </div>
              
              <div className="lg:col-span-1">
                {/* Working in background visualization */}
                <div className="relative bg-gray-50 rounded-3xl p-8 h-96">
                  <div className="absolute inset-4 border-2 border-dashed border-gray-300 rounded-2xl opacity-30"></div>
                  
                  <div className="relative z-10 h-full flex flex-col items-center justify-center">
                    <div className="text-8xl opacity-20 mb-4">⚙️</div>
                    <div className="text-center space-y-4">
                      <div className="text-sm text-gray-500">Arka planda çalışıyor...</div>
                      
                      {/* Floating activity indicators */}
                      <div className="relative w-full h-20">
                        {Array.from({length: 6}).map((_, i) => (
                          <div key={i} 
                               className="absolute w-2 h-2 bg-green-400 rounded-full opacity-60"
                               style={{
                                 left: `${20 + (i * 10)}%`,
                                 top: `${20 + (Math.sin(i) * 30)}%`,
                                 animation: `float 3s ease-in-out infinite`,
                                 animationDelay: `${i * 0.5}s`
                               }}>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Smooth transition to AI gradient - thoughts becoming insights */}
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-b from-transparent via-green-100 to-orange-200 overflow-hidden">
          <div className="absolute inset-0">
            {Array.from({length: 8}).map((_, i) => (
              <div key={i} className="absolute bottom-0 rounded-full bg-gradient-to-t from-orange-400/60 to-pink-400/40 opacity-70"
                   style={{
                     left: `${15 + (i * 10)}%`,
                     width: `${15 + (i * 3)}px`,
                     height: `${15 + (i * 3)}px`,
                     animation: `bubble 5s ease-in-out infinite`,
                     animationDelay: `${i * 0.6}s`
                   }}>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Service 4 - AI Raporlama: Düşünce → Anlayış dönüşümü */}
      <section className="scroll-snap-section relative bg-gradient-to-br from-orange-300 via-pink-400 to-purple-500 text-white overflow-hidden">
        {/* Background imagery - Neural networks and thought patterns */}
        <div className="absolute inset-0 opacity-15">
          {/* Neural network pattern */}
          <div className="absolute inset-0">
            <svg className="w-full h-full">
              <defs>
                <radialGradient id="neuron" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.8"/>
                  <stop offset="100%" stopColor="#fbbf24" stopOpacity="0"/>
                </radialGradient>
              </defs>
              {Array.from({length: 15}).map((_, i) => (
                <g key={i}>
                  <circle cx={`${20 + (i % 5) * 20}%`} 
                          cy={`${25 + Math.floor(i / 5) * 25}%`} 
                          r="6" 
                          fill="url(#neuron)">
                    <animate attributeName="r" values="6;12;6" dur="4s" repeatCount="indefinite" begin={`${i * 0.3}s`}/>
                  </circle>
                  {i % 5 < 4 && (
                    <line x1={`${20 + (i % 5) * 20}%`} 
                          y1={`${25 + Math.floor(i / 5) * 25}%`}
                          x2={`${40 + (i % 5) * 20}%`} 
                          y2={`${25 + Math.floor(i / 5) * 25}%`}
                          stroke="#fbbf24" 
                          strokeWidth="2" 
                          opacity="0.4">
                      <animate attributeName="opacity" values="0.2;0.8;0.2" dur="3s" repeatCount="indefinite" begin={`${i * 0.2}s`}/>
                    </line>
                  )}
                </g>
              ))}
            </svg>
          </div>
          
          {/* Floating thought elements */}
          <div className="absolute top-10 left-20 text-5xl opacity-30 animate-float">💭</div>
          <div className="absolute top-1/3 right-16 text-4xl opacity-25 animate-pulse">🧠</div>
          <div className="absolute bottom-1/4 left-1/4 text-6xl opacity-20 animate-bounce" style={{animationDuration: '5s'}}>✨</div>
          
          {/* Thought wave patterns */}
          <div className="absolute inset-0">
            <svg className="w-full h-full opacity-25">
              <path d="M0,40% Q25%,20% 50%,40% T100%,40%" stroke="#fbbf24" strokeWidth="3" fill="none">
                <animate attributeName="d" values="M0,40% Q25%,20% 50%,40% T100%,40%;M0,40% Q25%,60% 50%,40% T100%,40%;M0,40% Q25%,20% 50%,40% T100%,40%" dur="6s" repeatCount="indefinite"/>
              </path>
              <path d="M0,60% Q25%,40% 50%,60% T100%,60%" stroke="#ec4899" strokeWidth="2" fill="none" opacity="0.7">
                <animate attributeName="d" values="M0,60% Q25%,40% 50%,60% T100%,60%;M0,60% Q25%,80% 50%,60% T100%,60%;M0,60% Q25%,40% 50%,60% T100%,60%" dur="4s" repeatCount="indefinite"/>
              </path>
            </svg>
          </div>
        </div>
        <div className="relative flex items-center justify-center h-full">
          <div className={`mx-auto max-w-6xl px-4 transition-all duration-1000 ${visible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`} style={{ transitionDelay: '800ms' }}>
            <div className="text-center mb-16">
              <div className="relative inline-block mb-8">
                <div className="text-9xl opacity-90">🧠</div>
                {/* Thought waves */}
                <div className="absolute -top-4 -right-4 w-8 h-8 border-2 border-white/30 rounded-full animate-ping"></div>
                <div className="absolute -bottom-2 -left-2 w-6 h-6 border-2 border-white/20 rounded-full animate-ping" style={{animationDelay: '1s'}}></div>
              </div>
              
              <div className="bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-full text-sm font-bold inline-block mb-8 border border-white/30">
                <span className="animate-pulse">●</span> BETA SÜRÜMÜ
              </div>
              
              <h3 className="text-5xl font-bold mb-6 bg-gradient-to-r from-white to-orange-100 bg-clip-text text-transparent">{services[3]?.title}</h3>
              <p className="text-orange-100 text-2xl mb-12 max-w-4xl mx-auto leading-relaxed">{services[3]?.headline}</p>
            </div>
            
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <p className="text-orange-100 leading-relaxed mb-10 text-lg">{services[3]?.story}</p>
                
                <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl mb-10 border border-white/20">
                  <p className="text-white font-medium text-lg mb-4">{services[3]?.benefit}</p>
                  
                  {/* Conversation examples */}
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-yellow-300 rounded-full"></div>
                      <span className="text-orange-100">"Hangi ürün en çok satıyor?"</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-blue-300 rounded-full"></div>
                      <span className="text-orange-100">"Geçen aya göre performans nasıl?"</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-green-300 rounded-full"></div>
                      <span className="text-orange-100">"Tahmin raporunu oluştur"</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <a href={`/services/${services[3]?.id}`} className="inline-flex items-center gap-3 bg-white text-orange-600 px-8 py-4 rounded-xl font-bold hover:bg-orange-50 transition-all duration-300 transform hover:scale-105">
                    <span>Beta'yı dene</span>
                    <div className="w-5 h-5 bg-orange-600 rounded-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                    </div>
                  </a>
                  <a href="/contact" className="inline-flex items-center gap-3 border-2 border-white/30 text-white px-8 py-4 rounded-xl font-medium hover:bg-white/10 transition-all duration-300">
                    Detaylı bilgi al
                    <span>→</span>
                  </a>
                </div>
              </div>
              
              <div>
                {/* Interactive conversation demo */}
                <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20">
                  <div className="bg-white/90 rounded-2xl p-6 space-y-6">
                    {/* User question */}
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                        U
                      </div>
                      <div className="bg-orange-100 text-orange-800 px-4 py-3 rounded-xl rounded-tl-none flex-1">
                        "Bu ay satışlarımız nasıl?"
                      </div>
                    </div>
                    
                    {/* AI thinking */}
                    <div className="flex items-center gap-3 px-4">
                      <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white text-sm">
                        🤖
                      </div>
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                        <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                      </div>
                    </div>
                    
                    {/* AI response */}
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white text-sm">
                        AI
                      </div>
                      <div className="bg-gray-100 text-gray-800 px-4 py-3 rounded-xl rounded-tl-none flex-1">
                        <div className="space-y-2 text-sm">
                          <div className="font-semibold">📊 Mart 2024 Satış Özeti</div>
                          <div>• %23 artış (geçen aya göre)</div>
                          <div>• En iyi: Ürün A (1,247 adet)</div>
                          <div>• Trend: ⬆️ Yükselişte</div>
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
    </>
  );
}
