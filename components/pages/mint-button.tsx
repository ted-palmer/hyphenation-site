'use client';

import { FC } from 'react';

import { useToast } from '@/hooks/useToast';
import { useContractWrite, usePrepareContractWrite, useWaitForTransaction } from 'wagmi';

import ADOPT_A_HYPHEN_ABI from '@/lib/abis/adopt-a-hyphen';

import Button from '@/components/common/button';

type Props = {
  tokenId: number;
  fetchNfts(): Promise<void>;
};

const MintButton: FC<Props> = ({ tokenId, fetchNfts }) => {
  const { toast } = useToast();

  const { config, error } = usePrepareContractWrite({
    address: process.env.NEXT_PUBLIC_ADOPT_ADDRESS,
    abi: ADOPT_A_HYPHEN_ABI,
    functionName: 'mint',
    args: [tokenId],
    chainId: Number(process.env.NEXT_PUBLIC_CHAIN_ID),
  });

  const {
    data,
    write: mint,
    reset,
    isLoading: isMintLoading,
    isSuccess: isMintStarted,
  } = useContractWrite({
    ...config,
    onError: () => {
      toast({
        variant: 'fail',
        title: 'Mint error',
        description: error?.message,
      });
    },
    onSuccess: () => {
      toast({
        variant: 'success',
        title: 'Confirmed in wallet.',
      });
    },
  });

  const { isSuccess: txSuccess } = useWaitForTransaction({
    hash: data?.hash,
    onError: () => {
      toast({
        variant: 'fail',
        title: 'Mint error',
        description: error?.message,
      });
      reset();
    },
    onSuccess: () => {
      toast({
        variant: 'success',
        title: 'Mint success!',
        action: data?.hash ? (
          <a
            href={`https://goerli.etherscan.io//tx/${data?.hash}`}
            target="_blank"
            className="text-xs text-black"
          >
            View on etherscan
          </a>
        ) : undefined,
      });
      fetchNfts();
      reset();
    },
  });

  const isMinted = txSuccess;

  return (
    <Button
      color="black"
      onClick={() => {
        mint?.();
      }}
      disabled={!mint || isMintLoading || isMintStarted || isMinted}
    >
      {isMintLoading && 'CONFIRM'}
      {isMintStarted && !isMinted && 'REDEEMING'}
      {!isMintLoading && isMintStarted && isMinted && 'REDEEMED!'}
      {!isMintLoading && !isMintStarted && !isMinted && 'REDEEM'}
    </Button>
  );
};

export default MintButton;
