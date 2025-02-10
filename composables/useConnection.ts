import { clusterApiUrl, Connection, type Cluster } from '@solana/web3.js';

import { useNetworkStore } from '~/stores/network';
export default () => {
  const networkStore = useNetworkStore();
  let connection: Connection | null = null;
  if (networkStore.getCurrentNetwork.label === 'Localnet') {
    connection = new Connection(networkStore.getCurrentNetwork.key, 'confirmed');
  } else {
    connection = new Connection(
      clusterApiUrl(networkStore.getCurrentNetwork.key as Cluster),
      'confirmed'
    );
  }

  return connection;
};
