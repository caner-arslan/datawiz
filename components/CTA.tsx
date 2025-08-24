export default function CTA() {
  return (
    <section className="flex items-center justify-center bg-gradient-to-br from-brand-900 via-brand-800 to-brand-900 text-white relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 bg-gradient-to-r from-accent-500/10 via-transparent to-brand-500/10" />
      <div className="absolute top-10 left-10 w-32 h-32 bg-accent-500/20 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-10 right-10 w-24 h-24 bg-brand-500/20 rounded-full blur-2xl animate-float" style={{ animationDelay: '3s' }} />
      
      <div className="relative mx-auto max-w-4xl px-4 text-center">
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white/90 text-sm font-medium">
            <span className="w-1.5 h-1.5 bg-accent-500 rounded-full animate-pulse-soft" />
            Ücretsiz Keşif Görüşmesi
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold leading-tight">
            Süreçlerinizi Dijitalleştirelim
          </h2>
          
          <p className="text-xl text-brand-100 leading-relaxed max-w-2xl mx-auto">
            Kısa bir görüşme ile süreçlerinizi dinleyelim, otomasyona uygun alanları 
            hızlıca tespit edelim ve size özel çözüm önerileri sunalım.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-6">
            <a 
              href="/contact" 
              className="group inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-accent-500 to-accent-600 text-white font-semibold shadow-lg shadow-accent-500/30 hover:shadow-xl hover:shadow-accent-500/40 transition-all duration-300 hover:scale-105"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              Hemen İletişime Geçin
            </a>
            
            <a 
              href="/services" 
              className="group inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-white/20 text-white hover:bg-white/10 transition-all duration-300"
            >
              Hizmetlerimizi İnceleyin
              <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </div>
          
          <div className="pt-8">
            <p className="text-sm text-brand-200">
              💡 <strong>İpucu:</strong> Görüşme öncesi hangi süreçlerinizi otomatikleştirmek istediğinizi düşünün
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
