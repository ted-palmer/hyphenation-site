import Image from 'next/image';

import AdoptAHiphen from '@/public/adopt-a-hyphen.svg';
import Logo from '@/public/hyphen-logo.svg';

import Button from '@/components/button';

export default function Home() {
  return (
    <main className="flex-col items-center justify-between p-5 sm:p-24">
      <div className="flex flex-col items-center space-y-8">
        <Image width={300} src={Logo} alt="Hyphen Logo" />
        <Image width={300} src={AdoptAHiphen} alt="Hyphen Logo" />
        <div className="flex flex-col items-center">
          <Button>Approve All</Button>
          <div className="mt-4 text-center text-xs md:text-sm">
            Approve your adoption tickets to enable redemption.
          </div>
        </div>
      </div>
    </main>
  );
}
