'use client';

import { useState } from 'react';

import { useToast } from '@/hooks/useToast';
import { useContractWrite, usePrepareContractWrite, useWaitForTransaction } from 'wagmi';

import ZORA_ABI from '@/lib/abis/zora';

import Button from '@/components/common/button';

const ApprovalBox = () => {
  const [isApprovedForAll, setIsApprovedForAll] = useState(false);

  const { toast } = useToast();

  /* Contract interaction */
  const { config, error } = usePrepareContractWrite({
    address: process.env.NEXT_PUBLIC_TICKET_ADDRESS,
    abi: ZORA_ABI,
    functionName: 'setApprovalForAll',
    args: [process.env.NEXT_PUBLIC_ADOPT_ADDRESS, true],
    chainId: Number(process.env.NEXT_PUBLIC_CHAIN_ID),
  });

  const { data, write, reset } = useContractWrite({
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
      setIsApprovedForAll(true);
      reset();
    },
  });

  if (isApprovedForAll) {
    return null;
  }

  return (
    <div className="flex w-full max-w-[38rem] flex-col items-center space-y-4 rounded-3xl bg-black p-6 font-martian">
      <div className="text-2xl font-medium text-white">ENABLE REDEMPTIONS</div>
      <div className="text-center text-xs text-white md:text-sm">
        Approve your Adoption Tickets to enable redemption.
      </div>
      <Button onClick={() => write?.()} color="blue">
        APPROVE ALL
      </Button>
    </div>
  );
};

export default ApprovalBox;
