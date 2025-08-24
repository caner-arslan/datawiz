export default function InsightsPage() {
  const posts = [
    { t: 'Doğal dil raporlama (beta) nasıl ROI üretir?', d: 'Veri tabanları ile AI entegrasyonu ve sahada faydası.' },
    { t: 'ERP hızlandırıcı yaklaşımlar', d: 'Kritik ekranlarda süreç tasarım prensipleri.' }
  ];
  return (
    <div className="mx-auto max-w-6xl px-4 py-14">
      <h1 className="text-3xl font-semibold">İçgörüler</h1>
      <div className="mt-8 grid md:grid-cols-2 gap-6">
        {posts.map((p) => (
          <article key={p.t} className="rounded-xl border border-brand-100 p-5 bg-white">
            <h2 className="text-lg font-medium text-brand-900">{p.t}</h2>
            <p className="text-sm text-brand-700 mt-1">{p.d}</p>
          </article>
        ))}
      </div>
    </div>
  );
}


