'use client';

import Image from 'next/image';

import Button from './common/button';

import OpenseaWhite from '@/public/opensea-white.svg';
import PartyWhite from '@/public/party-vs-party-white.svg';
import ZoraWhite from '@/public/zora-white.svg';

import LINKS from '@/lib/constants/links';

const Footer = () => {
  return (
    <div className="flex w-full items-center justify-center space-x-6 p-12">
      <Button href={LINKS.ZORA} className="p-0" color="transparent">
        <Image alt="Zora Logo" src={ZoraWhite} />
      </Button>
      <Button href={LINKS.PARTY_VS_PARTY} className="p-0" color="transparent">
        <Image alt="Party Logo" src={PartyWhite} />
      </Button>
      <Button href={LINKS.OPENSEA} className="p-0" color="transparent">
        <Image alt="Opensea Logo" src={OpenseaWhite} />
      </Button>
    </div>
  );
};

export default Footer;
