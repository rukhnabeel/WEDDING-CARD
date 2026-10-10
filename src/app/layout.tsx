import type { Metadata, Viewport } from 'next';
import './globals.css';
import { LangProvider } from '@/context/LangContext';
import config from '@/config/invite.meenal-avinash';

export const viewport: Viewport = {
  themeColor: '#7A0C1E',
};

export const metadata: Metadata = {
  title: config.seo.titleEn,
  description: config.seo.description,
  openGraph: {
    title: config.seo.titleEn,
    description: config.seo.description,
    images: [{ url: config.seo.ogImage, width: 1200, height: 630, alt: 'Meenal & Avinash Wedding Invitation' }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: config.seo.titleEn,
    description: config.seo.description,
    images: [config.seo.ogImage],
  },
  icons: {
    icon: '/favicon.svg',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Preload hero background */}
        <link rel="preload" as="image" href="/assets/hero/hero-bg-mobile.jpg" />
      </head>
      <body suppressHydrationWarning>
        <LangProvider>
          {children}
        </LangProvider>
      </body>
    </html>
  );
}
