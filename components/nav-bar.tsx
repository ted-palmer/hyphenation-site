import { ConnectButton } from '@rainbow-me/rainbowkit';

const Navbar = () => {
  return (
    <div className="sticky top-0 flex w-full items-center justify-end p-6">
      <ConnectButton chainStatus={'none'} />
    </div>
  );
};

export default Navbar;
