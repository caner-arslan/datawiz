export default function ProjectsPage() {
  const items = [
    { name: 'Mini tahsilat sitesi', metric: '1 haftada 100 sipariş', desc: 'Hosted checkout + serverless webhook mimarisi ile ölçekli ve düşük maliyetli.' },
    { name: 'ERP hızlandırıcı', metric: 'İşlem süresi -%60', desc: 'Belirli ekiplere özel arayüzlerle iş akışını hızlandırma.' }
  ];
  return (
    <div className="mx-auto max-w-6xl px-4 py-14">
      <h1 className="text-3xl font-semibold">Projeler</h1>
      <div className="mt-8 grid md:grid-cols-2 gap-6">
        {items.map((p) => (
          <div key={p.name} className="rounded-xl border border-brand-100 p-5 bg-white">
            <div className="text-accent-600 font-medium">{p.name}</div>
            <div className="text-sm text-brand-600 mt-1">{p.metric}</div>
            <p className="mt-2 text-sm text-brand-700">{p.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}


