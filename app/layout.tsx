import { Martian_Mono } from 'next/font/google';

import './globals.css';
import { Providers } from './providers';
import clsx from 'clsx';

/* Fonts */
const martianMono = Martian_Mono({ subsets: ['latin'] });

/* Metadata & SEO */
export const metadata = {
  title: 'Hyphen Site',
  description: 'Mint a hyphen.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={clsx(martianMono.className, 'bg-background')}>
        <Providers>
          <div className={'mx-auto w-full max-w-[100rem] grow p-4 md:px-20 md:py-16'}>
            {children}
          </div>
        </Providers>
      </body>
    </html>
  );
}
