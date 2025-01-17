import { clusterApiUrl, Connection, LAMPORTS_PER_SOL, PublicKey } from '@solana/web3.js';

export default () => {
  const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');
  const getBalance = async (publicKey: string | PublicKey) => {
    try {
      if (typeof publicKey === 'string') {
        publicKey = new PublicKey(publicKey);
      }
      const balance = await connection.getBalance(publicKey);
      return balance;
    } catch (error) {
      throw createError('Failed to get balance');
    }
  };

  const getVersion = async () => {
    try {
      const version = await connection.getVersion();
      return version['solana-core'];
    } catch (error) {
      throw createError('Failed to get version');
    }
  };

  const requestAirdrop = async (publicKey: string | PublicKey, number: number) => {
    try {
      if (typeof publicKey === 'string') {
        publicKey = new PublicKey(publicKey);
      }
      const signature = await connection.requestAirdrop(publicKey, LAMPORTS_PER_SOL * number);
      const { blockhash, lastValidBlockHeight } = await connection.getLatestBlockhash();
      await connection.confirmTransaction({
        blockhash,
        lastValidBlockHeight,
        signature
      });
    } catch (error) {
      throw createError('Failed to request airdrop');
    }
  };

  const getTxs = async (publicKey: PublicKey | string) => {
    if (typeof publicKey === 'string') {
      publicKey = new PublicKey(publicKey);
    }
    try {
      const txs = await connection.getSignaturesForAddress(publicKey, { limit: 10 });
      return txs;
    } catch (error) {
      throw createError('Failed to get txs');
    }
  };

  return {
    connection,
    getBalance,
    getVersion,
    requestAirdrop,
    getTxs
  };
};
