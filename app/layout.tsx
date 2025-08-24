import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Script from 'next/script';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'DataWiz - ERP Entegrasyonu ve Operasyon Takip Sistemleri | İstanbul',
  description: 'ERP hızlandırıcı arayüzler, operasyon takip uygulamaları ve otomasyon çözümleri ile işletmenizin verimliliğini %40 artırın. Logo, Netsis, Mikro ERP entegrasyonu.',
  keywords: 'ERP entegrasyonu, operasyon takip, otomasyon sistemleri, Logo ERP, Netsis, Mikro, veri analizi, dashboard, işletme yazılımı, İstanbul',
  authors: [{ name: 'DataWiz' }],
  robots: 'index, follow',
  viewport: 'width=device-width, initial-scale=1',
  openGraph: {
    title: 'DataWiz - ERP Entegrasyonu ve Operasyon Takip Sistemleri',
    description: 'ERP hızlandırıcı arayüzler ve operasyon takip uygulamaları ile işletmenizin dijital dönüşümünü hızlandırın. Logo, Netsis, Mikro ERP entegrasyonu.',
    url: 'https://datawiz.works',
    siteName: 'DataWiz',
    type: 'website',
    locale: 'tr_TR',
    images: [
      {
        url: 'https://datawiz.works/logo.svg',
        width: 1200,
        height: 630,
        alt: 'DataWiz - ERP ve Operasyon Çözümleri',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DataWiz - ERP Entegrasyonu ve Operasyon Takip Sistemleri',
    description: 'ERP hızlandırıcı arayüzler ve operasyon takip uygulamaları ile işletmenizin dijital dönüşümünü hızlandırın.',
    images: ['https://datawiz.works/logo.svg'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr">
      <head>
        {/* SEO Meta Tags */}
        <meta name="robots" content="index, follow" />
        <meta name="googlebot" content="index, follow" />
        
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/logo.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#162b4a" />
        
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-2WXSC237ST"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            
            // Varsayılan olarak denied yapıyoruz - çerez onayı sonrası aktif olur
            gtag('consent', 'default', {
              analytics_storage: 'denied',
              ad_storage: 'denied'
            });
            
            gtag('js', new Date());
            gtag('config', 'G-2WXSC237ST');
          `}
        </Script>
        
        {/* Schema.org JSON-LD */}
        <Script id="schema-org" type="application/ld+json" strategy="beforeInteractive">
          {`
            {
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              "name": "DataWiz",
              "description": "ERP hızlandırıcı arayüzler, operasyon takip uygulamaları ve otomasyon çözümleri ile işletmenizin verimliliğini artırın.",
              "url": "https://datawiz.com.tr",
              "applicationCategory": "BusinessApplication",
              "operatingSystem": "Web",
              "offers": {
                "@type": "Offer",
                "description": "ERP entegrasyonu ve operasyon takip sistemleri",
                "availability": "https://schema.org/InStock"
              },
              "provider": {
                "@type": "Organization",
                "name": "DataWiz",
                "url": "https://datawiz.com.tr",
                "logo": "https://datawiz.com.tr/logo.svg",
                "address": {
                  "@type": "PostalAddress",
                  "streetAddress": "Koza Plaza A Blok K:1 No:28",
                  "addressLocality": "Tekstilkent, Esenler",
                  "addressRegion": "İstanbul",
                  "addressCountry": "TR"
                },
                "contactPoint": {
                  "@type": "ContactPoint",
                  "telephone": "+90-850-242-00-02",
                  "contactType": "customer service",
                  "availableLanguage": "Turkish"
                },
                "sameAs": [
                  "https://wa.me/908502420002"
                ]
              }
            }
          `}
        </Script>
      </head>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}


