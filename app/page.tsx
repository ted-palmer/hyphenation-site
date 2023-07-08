'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

import { useAccount } from 'wagmi';

import AdoptAHiphen from '@/public/adopt-a-hyphen.svg';
import Logo from '@/public/hyphen-logo.svg';
import Opensea from '@/public/opensea.svg';
import Party from '@/public/party-vs-party.svg';
import Zora from '@/public/zora.svg';

import LINKS from '@/lib/constants/links';

import ApprovalBox from '@/components/approval-box';
import Button from '@/components/common/button';
import MintBox from '@/components/mint-box';

export default function Home() {
  const { address } = useAccount();
  const [nfts, setNfts] = useState([]);

  useEffect(() => {
    async function fetchNfts() {
      if (address) {
        const res = await fetch(`/api/fetchNFTs?address=${address}`);
        const data = await res.json();
        setNfts(data);
      }
    }

    fetchNfts();
  }, [address]);

  const ownsHyphen = true;

  return (
    <main className="flex-col items-center justify-between">
      <div className="flex flex-col items-center space-y-8">
        <Image width={300} src={Logo} alt="Hyphen Logo" />
        <Image width={300} src={AdoptAHiphen} alt="Hyphen Logo" />
        <div className="flex flex-col space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0">
          <Button
            href={LINKS.PARTY_VS_PARTY}
            className="px-4"
            leftIcon={<Image alt="Party Logo" src={Party} />}
            color="white"
          >
            PARTY VS PARTY
          </Button>
          <Button
            href={LINKS.ZORA}
            className="px-4"
            leftIcon={<Image alt="Zora Logo" src={Zora} />}
            color="white"
          >
            MINT ON ZORA
          </Button>
          <Button
            href={LINKS.OPENSEA}
            leftIcon={<Image alt="Opensea Logo" src={Opensea} />}
            className="px-4"
            color="white"
          >
            VIEW ON OPENSEA
          </Button>
        </div>
        {/* Mint/Approval a hyphen box */}
        {!ownsHyphen ? <MintBox /> : <ApprovalBox />}
      </div>
    </main>
  );
}
