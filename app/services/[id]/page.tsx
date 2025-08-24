"use client";

import { useEffect, useState } from 'react';
import { notFound } from 'next/navigation';

interface Service {
  id: string;
  title: string;
  headline: string;
  story: string;
  benefit: string;
  visual: string;
  color: string;
}

interface ServiceDetailPageProps {
  params: { id: string };
}

export default function ServiceDetailPage({ params }: ServiceDetailPageProps) {
  const [service, setService] = useState<Service | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchService = async () => {
      try {
        const response = await fetch('/content/services-overview.json');
        const services: Service[] = await response.json();
        const foundService = services.find(s => s.id === params.id);
        
        if (!foundService) {
          notFound();
          return;
        }
        
        setService(foundService);
      } catch (error) {
        console.error('Failed to fetch service:', error);
        notFound();
      } finally {
        setLoading(false);
      }
    };

    fetchService();
  }, [params.id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent-500 mx-auto mb-4"></div>
          <p className="text-brand-700">Yükleniyor...</p>
        </div>
      </div>
    );
  }

  if (!service) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-white">
      {/* Hero Section */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-accent-500/5 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-10 w-24 h-24 bg-brand-500/5 rounded-full blur-2xl animate-float" />
        
        <div className="relative mx-auto max-w-4xl px-4">
          {/* Back link */}
          <div className="mb-8">
            <a 
              href="/#services"
              className="inline-flex items-center gap-2 text-brand-600 hover:text-accent-600 transition-colors duration-300"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Tüm Hizmetler
            </a>
          </div>

          {/* Service header */}
          <div className="text-center mb-12">
            <div className="text-6xl mb-6">{service.visual}</div>
            <h1 className="text-4xl md:text-6xl font-bold text-brand-900 mb-6">
              {service.title}
            </h1>
            <p className="text-2xl text-accent-600 font-medium leading-relaxed">
              {service.headline}
            </p>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-20">
        <div className="mx-auto max-w-4xl px-4">
          {/* Main story */}
          <div className="mb-12">
            <div className="rounded-3xl border border-white/60 bg-white/80 backdrop-blur-xl shadow-glass p-8 md:p-12">
              <h2 className="text-2xl font-bold text-brand-900 mb-6">Nasıl Çalışır?</h2>
              <p className="text-lg text-brand-700 leading-relaxed mb-8">
                {service.story}
              </p>
              
              {/* Benefit highlight */}
              <div className="p-6 rounded-xl bg-gradient-to-r from-accent-50 to-brand-50 border border-accent-100">
                <h3 className="text-lg font-semibold text-accent-700 mb-2">💡 Fayda</h3>
                <p className="text-accent-700 font-medium">
                  {service.benefit}
                </p>
              </div>
            </div>
          </div>

          {/* Features/Details */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="rounded-2xl border border-white/60 bg-white/80 backdrop-blur-xl shadow-glass p-6">
              <h3 className="text-xl font-bold text-brand-900 mb-4">🎯 Hedef Kitle</h3>
              <ul className="space-y-2 text-brand-700">
                <li>• Operasyon yoğun şirketler</li>
                <li>• ERP sistemi kullanan işletmeler</li>
                <li>• Süreç optimizasyonu arayan ekipler</li>
                <li>• Veri analizi ihtiyacı olan firmalar</li>
              </ul>
            </div>
            
            <div className="rounded-2xl border border-white/60 bg-white/80 backdrop-blur-xl shadow-glass p-6">
              <h3 className="text-xl font-bold text-brand-900 mb-4">⚡ Avantajlar</h3>
              <ul className="space-y-2 text-brand-700">
                <li>• %60'a varan hız artışı</li>
                <li>• Manuel hata oranında düşüş</li>
                <li>• Gerçek zamanlı görünürlük</li>
                <li>• Ölçülebilir ROI</li>
              </ul>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center">
            <div className="rounded-3xl border border-white/60 bg-white/80 backdrop-blur-xl shadow-glass p-8">
              <h2 className="text-2xl font-bold text-brand-900 mb-4">
                Bu Çözümü İşletmenizde Uygulamak İster misiniz?
              </h2>
              <p className="text-brand-700 mb-6 max-w-2xl mx-auto">
                Size özel bir demo hazırlayalım ve süreçlerinizi nasıl optimize edebileceğimizi gösterelim.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href="/contact"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-accent-500 text-white font-medium hover:bg-accent-600 transition-all duration-300 hover:scale-105 shadow-lg shadow-accent-500/25"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  Ücretsiz Konsültasyon
                </a>
                <a 
                  href="/#services"
                  className="inline-flex items-center gap-2 px-6 py-4 rounded-xl border border-brand-200 text-brand-700 hover:bg-brand-50 transition-all duration-300"
                >
                  Diğer Hizmetler
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

// Generate static paths for build-time pre-rendering
export async function generateStaticParams() {
  return [
    { id: 'operasyon-takip' },
    { id: 'erp-arayuzler' },
    { id: 'arka-plan-uygulamalari' },
    { id: 'ai-raporlama' }
  ];
}

