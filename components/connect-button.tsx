'use client';

import Button from './common/button';
import { ConnectButton } from '@rainbow-me/rainbowkit';

export const ConnectButtonCustom = () => {
  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        authenticationStatus,
        mounted,
      }) => {
        const ready = mounted && authenticationStatus !== 'loading';
        const connected =
          ready &&
          account &&
          chain &&
          (!authenticationStatus || authenticationStatus === 'authenticated');
        return (
          <div
            {...(!ready && {
              'aria-hidden': true,
              style: {
                opacity: 0,
                pointerEvents: 'none',
                userSelect: 'none',
                background: 'white',
              },
            })}
          >
            {(() => {
              if (!connected) {
                return (
                  <Button size="xs" color="white" onClick={openConnectModal} type="button">
                    Connect Wallet
                  </Button>
                );
              }
              if (chain.unsupported) {
                return (
                  <Button size="xs" color="white" onClick={openChainModal} type="button">
                    Wrong network
                  </Button>
                );
              }
              return (
                <Button size="xs" color="white" onClick={openAccountModal} type="button">
                  {account.displayName}
                  {account.displayBalance ? ` (${account.displayBalance})` : ''}
                </Button>
              );
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
};
