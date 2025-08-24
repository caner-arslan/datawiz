"use client";

import { useEffect, useState } from 'react';

type Highlight = { title: string; text: string };

export default function Highlights() {
  const [items, setItems] = useState<Highlight[] | null>(null);
  const [visible, setVisible] = useState<Record<number, boolean>>({});

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('/content/highlights.json');
      const data = (await res.json()) as Highlight[];
      setItems(data);
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (!items) return;
    const observers: IntersectionObserver[] = [];
    items.forEach((_, idx) => {
      const el = document.querySelector(`#hl-${idx}`);
      if (!el) return;
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setVisible((v) => ({ ...v, [idx]: true }));
            }
          });
        },
        { threshold: 0.2 }
      );
      io.observe(el);
      observers.push(io);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, [items]);

  return (
    <div className="mt-8 grid md:grid-cols-3 gap-6">
      {(items ?? Array.from({ length: 3 })).map((it, idx) => (
        <div
          key={idx}
          id={`hl-${idx}`}
          className={`
            group relative overflow-hidden rounded-2xl border border-white/20 bg-white/5 backdrop-blur-sm
            transition-all duration-700 ease-out hover:scale-105 hover:shadow-glass
            ${visible[idx] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}
          `}
        >
          {/* Animated background gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-accent-500/5 via-transparent to-brand-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          {/* Floating accent dot */}
          <div className="absolute top-4 right-4 w-2 h-2 bg-accent-500 rounded-full animate-pulse-soft" />
          
          <div className="relative p-6">
            {it ? (
              <>
                <div className="inline-flex items-center gap-3 text-accent-600 font-semibold mb-3">
                  <div className="w-8 h-8 rounded-full bg-accent-500/20 flex items-center justify-center">
                    <span className="w-2 h-2 bg-accent-500 rounded-full" />
                  </div>
                  <span className="text-lg">{it.title}</span>
                </div>
                <p className="text-brand-700 text-sm leading-relaxed">{it.text}</p>
                
                {/* Hover effect line */}
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-accent-500 to-brand-500 transition-all duration-300 group-hover:w-full" />
              </>
            ) : (
              <div className="animate-pulse space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-brand-100 rounded-full" />
                  <div className="h-4 w-32 bg-brand-100 rounded" />
                </div>
                <div className="space-y-2">
                  <div className="h-3 w-full bg-brand-100/70 rounded" />
                  <div className="h-3 w-5/6 bg-brand-100/70 rounded" />
                </div>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}


