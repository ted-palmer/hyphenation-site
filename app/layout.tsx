import { Inter, Martian_Mono } from 'next/font/google';

import './globals.css';

import Toaster from '@/components/common/toaster';
import Footer from '@/components/footer';
import Navbar from '@/components/nav-bar';

import Providers from '@/app/providers';

/* Fonts */
const martianMono = Martian_Mono({ subsets: ['latin'], variable: '--martian-mono-font' });
const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

/* Metadata & SEO */
export const metadata = {
  title: 'Adopt-A-Hyphen',
  description: 'What if you could make a difference in a hyphen’s life forever?',
  openGraph: {
    title: 'Adopt-A-Hyphen',
    description: 'What if you could make a difference in a hyphen’s life forever?',
    url: 'https://adopt-a-hyphen.com',
    siteName: 'Adopt-A-Hyphen',
    images: [
      {
        url: '/social-image.png',
        width: 1200,
        height: 600,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    images: ['https://adopt-a-hyphen.com/social-image.png'],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${martianMono.variable}`}>
      <body className={'bg-background'}>
        <Providers>
          <Navbar />
          <Toaster />
          <main className={'mx-auto w-full max-w-[100rem] grow p-4 md:px-20 md:py-16'}>
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
