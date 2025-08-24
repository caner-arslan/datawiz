"use client";

import { useEffect, useState } from 'react';

type Section = { slug: string; title: string; text: string; cta?: string; image?: string };

export default function ServiceSections() {
  const [items, setItems] = useState<Section[]>([]);
  const [visible, setVisible] = useState<Record<number, boolean>>({});

  useEffect(() => {
    fetch('/content/service-sections.json').then((r) => r.json()).then(setItems);
  }, []);

  useEffect(() => {
    if (!items.length) return;
    const observers: IntersectionObserver[] = [];
    items.forEach((_, idx) => {
      const el = document.querySelector(`#service-${idx}`);
      if (!el) return;
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setVisible((v) => ({ ...v, [idx]: true }));
            }
          });
        },
        { threshold: 0.3 }
      );
      io.observe(el);
      observers.push(io);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, [items]);

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-brand-50/30 to-transparent" />
      <div className="absolute top-20 left-10 w-32 h-32 bg-accent-500/10 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-20 right-10 w-24 h-24 bg-brand-500/10 rounded-full blur-2xl animate-float" style={{ animationDelay: '3s' }} />
      
      <div className="relative mx-auto max-w-6xl px-4 space-y-20">
        {items.map((s, idx) => (
          <div 
            key={s.slug} 
            id={`service-${idx}`}
            className={`
              grid md:grid-cols-2 gap-12 min-h-[400px] items-center
              transition-all duration-1000 ease-out
              ${idx % 2 ? 'md:[&>*:first-child]:order-2' : ''}
              ${visible[idx] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}
            `}
          >
            <div className="space-y-6">
              <div className="space-y-3">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-500/10 border border-accent-500/20 text-accent-600 text-sm font-medium">
                  <span className="w-1.5 h-1.5 bg-accent-500 rounded-full animate-pulse-soft" />
                  Hizmet {idx + 1}
                </div>
                <h3 className="text-3xl font-bold text-brand-900 leading-tight">{s.title}</h3>
              </div>
              <p className="text-lg text-brand-700 leading-relaxed max-w-prose">{s.text}</p>
              <div className="pt-4">
                <a 
                  href={`/${s.slug}`} 
                  className="group inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-accent-500 to-accent-600 text-white font-medium shadow-soft hover:shadow-glass transition-all duration-300 hover:scale-105"
                >
                  {s.cta ?? 'Detayları gör'}
                  <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </div>
            
            <div className="relative group">
              <div className="absolute -inset-4 bg-gradient-to-r from-accent-500/20 via-transparent to-brand-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative overflow-hidden rounded-2xl border border-white/20 bg-white/5 backdrop-blur-sm shadow-soft group-hover:shadow-glass transition-all duration-500">
                <img
                  src={s.image ?? '/media/fallback.svg'}
                  alt=""
                  className="w-full h-[400px] object-cover transition-transform duration-700 group-hover:scale-110"
                  onError={(e) => {
                    const img = e.currentTarget as HTMLImageElement;
                    if (!img.src.endsWith('/media/fallback.svg')) img.src = '/media/fallback.svg';
                  }}
                />
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}


