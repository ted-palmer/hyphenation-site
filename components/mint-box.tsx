'use client';

import Image from 'next/image';

import { useToast } from '../hooks/useToast';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { parseEther } from 'viem';
import {
  mainnet,
  useAccount,
  useContractWrite,
  useNetwork,
  usePrepareContractWrite,
  useSwitchNetwork,
  useWaitForTransaction,
} from 'wagmi';

import AdoptionTicket from '@/public/adoption-ticket.svg';

import ZORA_ABI from '@/lib/abis/zora';

import Button from '@/components/common/button';

const MintBox = () => {
  const MINT_COST = '0.2';

  const { address } = useAccount();
  const { chain } = useNetwork();
  const { chains, isLoading, pendingChainId, switchNetwork } = useSwitchNetwork();
  const { toast } = useToast();

  /* Contract interaction */
  const { config, error } = usePrepareContractWrite({
    address: process.env.NEXT_PUBLIC_TICKET_ADDRESS,
    abi: ZORA_ABI,
    functionName: 'purchase',
    args: [1],
    chainId: Number(process.env.NEXT_PUBLIC_CHAIN_ID),
    value: parseEther(MINT_COST),
  });

  const {
    isLoading: walletIsLoading,
    isSuccess: walletIsSuccess,
    data,
    write,
    reset,
  } = useContractWrite({
    ...config,
    onError: () => {
      toast({
        variant: 'fail',
        title: 'Transaction error',
        description: error?.message,
      });
    },
    onSuccess: () => {
      toast({
        variant: 'success',
        title: 'Transaction signed successfully.',
      });
    },
  });

  const { isLoading: txIsLoading, isSuccess: txIsSuccess } = useWaitForTransaction({
    hash: data?.hash,
    onError: () => {
      toast({
        variant: 'fail',
        title: 'Transaction error',
        description: error?.message,
      });
      reset();
    },
    onSuccess: () => {
      toast({
        variant: 'success',
        title: 'Transaction success!',
      });
      reset();
    },
  });

  return (
    <div className="flex w-full max-w-[38rem] flex-col items-center space-y-6 rounded-3xl bg-black p-9">
      <Image width={300} src={AdoptionTicket} alt="Hyphen Logo" />
      <div className="text-center text-xs text-white md:text-sm">
        Mint an Adoption Ticket to get started!
      </div>
      {!chain ? (
        <ConnectButton />
      ) : chain.id != mainnet.id ? (
        <Button onClick={() => switchNetwork?.(mainnet.id)} color="blue">
          Switch Chain
        </Button>
      ) : (
        <Button onClick={() => write?.()} color="blue">
          Mint
        </Button>
      )}
    </div>
  );
};

export default MintBox;
