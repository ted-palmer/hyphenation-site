'use client';

import Image from 'next/image';

import AdoptionTicket from '@/public/adoption-ticket.svg';
import Zora from '@/public/zora.svg';

import LINKS from '@/lib/constants/links';

import Button from '@/components/common/button';

const MintBox = () => {
  return (
    <div className="flex w-full max-w-[38rem] flex-col items-center space-y-6 rounded-3xl bg-black p-6 font-martian">
      <Image width={300} src={AdoptionTicket} alt="Hyphen Logo" />
      <div className="text-center text-xs text-white md:text-sm">
        Mint an Adoption Ticket to get started!
      </div>
      <Button
        className="w-fit px-4"
        leftIcon={<Image alt="Zora Logo" src={Zora} />}
        href={LINKS.ZORA}
        color="blue"
      >
        MINT ON ZORA
      </Button>
    </div>
  );
};

export default MintBox;
