import { NextResponse } from 'next/server';

export async function GET(req: Request, res: Response) {
  const { searchParams } = new URL(req.url);
  const address = searchParams.get('address');

  const result = await fetch(
    // `https://eth-mainnet.g.alchemy.com/nft/v2/${process.env.NEXT_PUBLIC_ALCHEMY_ID}/getNFTs?owner=${address}&contractAddresses[]=${process.env.NEXT_PUBLIC_ADOPT_ADDRESS}&${process.env.NEXT_PUBLIC_TICKET_ADDRESS}&order_direction=desc&offset=0&limit=20`,
    // @TODO: switch back to mainnet
    `https://eth-goerli.g.alchemy.com/nft/v2/${process.env.NEXT_PUBLIC_ALCHEMY_ID}/getNFTs?owner=${address}&contractAddresses[]=${process.env.NEXT_PUBLIC_ADOPT_ADDRESS}&contractAddresses[]=${process.env.NEXT_PUBLIC_TICKET_ADDRESS}&order_direction=desc&offset=0&limit=20`,
  );

  if (!result.ok) {
    throw new Error(`Failed to fetch data with status code: ${res.status}`);
  }

  const data = await result.json();
  return NextResponse.json(data);
}
