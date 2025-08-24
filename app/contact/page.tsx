export default function ContactPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-14">
      <h1 className="text-3xl font-semibold">İletişim</h1>
      <p className="mt-2 text-brand-700 max-w-2xl text-sm">
        Kısaca ihtiyacınızı yazın; 24 saat içinde dönüş yapalım. (Form ücretsiz Web3Forms ile çalışır.)
      </p>

      <form
        action="https://api.web3forms.com/submit"
        method="POST"
        className="mt-8 max-w-xl space-y-4"
      >
        <input type="hidden" name="access_key" value="YOUR_WEB3FORMS_ACCESS_KEY" />
        <input type="hidden" name="from_name" value="Datawiz Website" />
        <div>
          <label className="block text-sm mb-1">Ad Soyad</label>
          <input name="name" required className="w-full rounded-md border border-brand-200 px-3 py-2 outline-none focus:ring-2 focus:ring-accent-500" />
        </div>
        <div>
          <label className="block text-sm mb-1">E-posta</label>
          <input type="email" name="email" required className="w-full rounded-md border border-brand-200 px-3 py-2 outline-none focus:ring-2 focus:ring-accent-500" />
        </div>
        <div>
          <label className="block text-sm mb-1">Mesaj</label>
          <textarea name="message" rows={5} required className="w-full rounded-md border border-brand-200 px-3 py-2 outline-none focus:ring-2 focus:ring-accent-500" />
        </div>
        <div className="hidden">
          <input type="checkbox" name="botcheck" />
        </div>
        <button className="px-4 py-2.5 rounded-md bg-accent-500 text-white hover:bg-accent-600">Gönder</button>
      </form>
    </div>
  );
}


