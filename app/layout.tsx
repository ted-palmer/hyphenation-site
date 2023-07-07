import { Martian_Mono } from 'next/font/google';

import './globals.css';
import clsx from 'clsx';

const martianMono = Martian_Mono({ subsets: ['latin'] });

export const metadata = {
  title: 'Hyphen Site',
  description: 'Mint a hyphen.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={clsx(martianMono.className, 'bg-background')}>
        <div className={'mx-auto w-full max-w-[60rem] grow p-4 md:px-20 md:py-16'}>{children}</div>
      </body>
    </html>
  );
}
