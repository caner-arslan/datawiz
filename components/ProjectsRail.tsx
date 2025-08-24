"use client";

import { useEffect, useRef, useState } from 'react';

type Project = { name: string; metric: string; desc: string; image: string };

export default function ProjectsRail() {
  const [items, setItems] = useState<Project[]>([]);
  const railRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    fetch('/content/projects.json').then((r) => r.json()).then(setItems);
  }, []);

  return (
    <section className="py-12">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold">Projelerden kesitler</h2>
          <a href="/projects" className="text-sm text-accent-600 hover:underline">Tüm projeler</a>
        </div>
      </div>

      {/* Mobil: yatay kaydırma, container hizasında */}
      <div className="md:hidden mt-6">
        <div ref={railRef} className="mx-auto max-w-6xl px-4 overflow-x-auto [scroll-snap-type:x_mandatory]">
          <div className="flex gap-4">
            {items.map((p, idx) => (
              <ProjectCard key={idx} p={p} className="min-w-[280px] max-w-[280px]" />
            ))}
          </div>
        </div>
      </div>

      {/* Masaüstü: grid, container içinde ortalanmış */}
      <div className="hidden md:block mt-6">
        <div className="mx-auto max-w-6xl px-4 grid grid-cols-1 md:grid-cols-3 gap-6">
          {items.map((p, idx) => (
            <ProjectCard key={idx} p={p} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ p, className = '' }: { p: Project; className?: string }) {
  return (
    <article className={`scroll-snap-align-start rounded-xl border border-brand-100 bg-white ${className}`}>
      <img
        src={p.image}
        alt="Proje görseli"
        loading="lazy"
        className="h-40 w-full object-cover rounded-t-xl bg-brand-50"
        onError={(e) => {
          const img = e.currentTarget as HTMLImageElement;
          if (!img.src.endsWith('/media/fallback.svg')) {
            img.src = '/media/fallback.svg';
          }
        }}
      />
      <div className="p-4">
        <div className="text-brand-900 font-medium">{p.name}</div>
        <div className="text-xs text-brand-600 mt-0.5">{p.metric}</div>
        <p className="text-sm text-brand-700 mt-2">{p.desc}</p>
      </div>
    </article>
  );
}


