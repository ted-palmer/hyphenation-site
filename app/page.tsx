'use client';

import Image from 'next/image';

import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi';

import AdoptAHiphen from '@/public/adopt-a-hyphen.svg';
import Logo from '@/public/hyphen-logo.svg';
import Opensea from '@/public/opensea.svg';
import Party from '@/public/party-vs-party.svg';
import Zora from '@/public/zora.svg';

import Button from '@/components/button';

export default function Home() {
  const { address } = useAccount();

  return (
    <main className="flex-col items-center justify-between p-5">
      <div className="flex flex-col items-center space-y-8">
        <Image width={300} src={Logo} alt="Hyphen Logo" />
        <Image width={300} src={AdoptAHiphen} alt="Hyphen Logo" />
        <div className="flex flex-col space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0">
          <Button className="px-4" leftIcon={<Image alt="Party Logo" src={Party} />} color="white">
            PARTY VS PARTY
          </Button>
          <Button className="px-4" leftIcon={<Image alt="Zora Logo" src={Zora} />} color="white">
            MINT ON ZORA
          </Button>
          <Button
            leftIcon={<Image alt="Opensea Logo" src={Opensea} />}
            className="px-4"
            color="white"
          >
            VIEW ON OPENSEA
          </Button>
        </div>
        <div className="flex flex-col items-center">
          {!address ? <ConnectButton /> : <Button color="white">Adopt a Hyphen</Button>}
          <div className="mt-4 text-center text-xs md:text-sm">
            Approve your adoption tickets to enable redemption.
          </div>
        </div>
      </div>
    </main>
  );
}
