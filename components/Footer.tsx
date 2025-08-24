export default function Footer() {
  return (
    <footer className="border-t border-brand-50">
      <div className="mx-auto max-w-6xl px-4 py-10 text-sm text-brand-700">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <img src="/logo.svg" alt="Datawiz" className="h-8 w-auto" />
            <span>Datawiz — Veri sihirbazı</span>
          </div>
          <div className="opacity-80">© {new Date().getFullYear()} Datawiz. Tüm hakları saklıdır.</div>
        </div>
      </div>
    </footer>
  );
}

