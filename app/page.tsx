'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

import { useAccount, useContractRead, useNetwork } from 'wagmi';

import AdoptAHiphen from '@/public/adopt-a-hyphen.svg';
import Logo from '@/public/hyphen-logo.svg';

import ZORA_ABI from '@/lib/abis/zora';

import Button from '@/components/common/button';
import ApprovalBox from '@/components/pages/approval-box';
import MintBox from '@/components/pages/mint-box';
import MintButton from '@/components/pages/mint-button';

export default function Home() {
  const { address } = useAccount();
  const { chain } = useNetwork();
  const [nfts, setNfts] = useState<any[]>([]); // TODO: Type this
  const [isLoaded, setIsLoaded] = useState(false);

  const { data: isApprovedForAll } = useContractRead({
    address: process.env.NEXT_PUBLIC_TICKET_ADDRESS,
    abi: ZORA_ABI,
    functionName: 'isApprovedForAll',
    args: [address, process.env.NEXT_PUBLIC_ADOPT_ADDRESS],
  });

  const { data: totalSupply } = useContractRead({
    address: process.env.NEXT_PUBLIC_TICKET_ADDRESS,
    abi: ZORA_ABI,
    functionName: 'totalSupply',
  });

  async function fetchNfts() {
    if (address) {
      const res = await fetch(`/api/fetchNFTs?address=${address}`);
      const data = await res.json();
      setNfts(data.ownedNfts);
    }

    setIsLoaded(true);
  }

  useEffect(() => {
    fetchNfts();
  }, [address, chain]);

  return (
    <div className="flex-col items-center justify-between">
      <div className="flex flex-col items-center space-y-9 sm:space-y-12">
        <div className="w-[16.5rem] space-y-9 sm:w-[24rem] sm:space-y-12">
          <Image width={383} src={Logo} alt="Hyphen Logo" />
          <Image width={383} src={AdoptAHiphen} alt="adope a hyphen logo" />
        </div>

        <div className="flex w-full max-w-[53rem] flex-col space-y-12 font-inter text-white">
          <span>
            With each passing day, more and more people are switching from “on-chain” to “onchain.”
            While this may seem like a harmless choice, thousands of innocent hyphens are losing
            their place in the world. No longer needed to hold “on-chain” together, these hyphens
            are in need of a loving place to call home. What if you could make a difference in a
            hyphen’s life forever?
            <br />
            <br />
            Introducing the Adopt-a-Hyphen program. For the next 3 days, you can adopt a hyphen and
            give it a new home...right in your wallet! To adopt a hyphen, simply mint an Adoption
            Ticket. Each Adoption Ticket can be redeemed to adopt one hyphen. As is their nature,
            each hyphen lives fully on-chain and is rendered in solidity as cute, generative ASCII
            art. Upon redeeming your Adoption Ticket, you’ll enjoy the surprise of finding out what
            kind of hyphen you got!
          </span>
        </div>

        <div className="flex items-center justify-center rounded-lg border border-black bg-white p-2 font-martian text-sm text-black">
          {/* Hyphens Saved */}
          {/* @TODO fix type */}
          <div className="mr-2.5 flex items-center justify-center rounded bg-black p-1 px-3 text-[#00BA73]">
            {totalSupply ? parseInt(totalSupply as string) : '-'}
          </div>
          hyphens saved
        </div>

        {/* Mint/Approval a hyphen box */}
        <MintBox />
        {!isApprovedForAll ? <ApprovalBox /> : null}

        {/* NFTs */}
        {isLoaded && nfts.length > 0 && (
          <div className="grid gap-9 sm:gap-24 md:grid-cols-3 lg:grid-cols-4">
            {nfts.map((nft) => {
              return (
                <div
                  className="flex flex-col items-center justify-center space-y-4"
                  key={nft.id.tokenId}
                >
                  <Image
                    className="rounded-xl"
                    width={300}
                    height={300}
                    src={nft.media[0].gateway}
                    alt={nft.name}
                  />

                  {nft?.contract?.address?.toLowerCase() ==
                  process.env.NEXT_PUBLIC_TICKET_ADDRESS?.toLowerCase() ? (
                    <MintButton tokenId={parseInt(nft?.id?.tokenId)} fetchNfts={fetchNfts} />
                  ) : (
                    <Button
                      color="black"
                      onClick={() => {
                        window.open(
                          // `https://opensea.io/assets/goerli/${process.env.NEXT_PUBLIC_ADOPT_ADDRESS}`
                          // @TODO: switch to mainnet
                          `https://testnets.opensea.io/assets/goerli/${process.env.NEXT_PUBLIC_ADOPT_ADDRESS}`,
                          '_blank',
                        );
                      }}
                    >
                      VIEW
                    </Button>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
