'use client';

import Image from 'next/image';
import { FC, useEffect, useState } from 'react';

import { useContractRead } from 'wagmi';

import ADOPT_A_HYPHEN_ABI from '@/lib/abis/adopt-a-hyphen';

type Props = {
  tokenId: number;
  fallbackImage: string;
};

const TokenUriImage: FC<Props> = ({ tokenId, fallbackImage }) => {
  const [image, setImage] = useState(fallbackImage);

  const { data: tokenURI, isError } = useContractRead({
    address: process.env.NEXT_PUBLIC_ADOPT_ADDRESS,
    abi: ADOPT_A_HYPHEN_ABI,
    functionName: 'tokenURI',
    args: [tokenId],
    chainId: Number(process.env.NEXT_PUBLIC_CHAIN_ID),
  });

  useEffect(() => {
    const fetchAndSetImage = async () => {
      if (tokenURI) {
        try {
          const response = await fetch(tokenURI as string);

          if (!response.ok) {
            console.error('Failed to resolve tokenURI');
          }

          const json = await response.json();

          if (json.image_data) {
            setImage(json.image_data);
          }
        } catch (error) {
          console.error('Failed to resolve tokenURI:', error);
        }
      }
    };

    fetchAndSetImage();
  }, [tokenURI]);

  if (isError) {
    return null;
  }

  return (
    <Image src={image} className="rounded-xl" width={300} height={300} alt={`Token: ${tokenId}`} />
  );
};

export default TokenUriImage;
