declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_ALCHEMY_ID: string;
      NEXT_PUBLIC_TICKET_ADDRESS: `0x${string}`;
      NEXT_PUBLIC_ADOPT_ADDRESS: `0x${string}`;
    }
  }
}

export {};
