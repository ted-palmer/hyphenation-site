'use client';

import Image from 'next/image';

import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi';

import AdoptionTicket from '@/public/adoption-ticket.svg';

import Button from '@/components/common/button';

const MintBox = () => {
  const { address } = useAccount();

  return (
    <div className="flex w-full max-w-[38rem] flex-col items-center space-y-6 rounded-3xl bg-black p-9">
      <Image width={300} src={AdoptionTicket} alt="Hyphen Logo" />
      <div className="text-center text-xs text-white md:text-sm">
        Mint an Adoption Ticket to get started!
      </div>
      {!address ? <ConnectButton /> : <Button color="blue">Mint</Button>}
    </div>
  );
};

export default MintBox;
