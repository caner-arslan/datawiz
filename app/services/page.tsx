"use client";

import { useEffect, useState } from 'react';

type Service = { h: string; d: string };

export default function ServicesPage() {
  const [items, setItems] = useState<Service[] | null>(null);
  useEffect(() => {
    fetch('/content/services.json').then((r) => r.json()).then(setItems);
  }, []);
  return (
    <div className="mx-auto max-w-6xl px-4 py-14">
      <h1 className="text-3xl font-semibold">Hizmetler</h1>
      <div className="mt-8 grid md:grid-cols-2 gap-6">
        {(items ?? Array.from({ length: 4 })).map((x, i) => (
          <div key={(x as Service)?.h ?? i} className="rounded-lg border border-brand-100 p-5 bg-white">
            {x ? (
              <>
                <div className="text-accent-600 font-medium">{(x as Service).h}</div>
                <p className="mt-2 text-sm text-brand-700">{(x as Service).d}</p>
              </>
            ) : (
              <div className="animate-pulse">
                <div className="h-4 w-40 bg-brand-100 rounded" />
                <div className="h-3 w-full mt-3 bg-brand-100/70 rounded" />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}


