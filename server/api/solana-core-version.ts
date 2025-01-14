import { clusterApiUrl, Connection } from '@solana/web3.js';

export default defineEventHandler(async (event) => {
  const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');
  const verison = await connection.getVersion();
  return verison;
});
