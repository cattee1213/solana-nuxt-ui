<script setup lang="ts">
import { clusterApiUrl, Connection, PublicKey, LAMPORTS_PER_SOL } from '@solana/web3.js';
useHead({
  title: 'solana-ui'
});
const solanaVersion = ref('');
const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');
const { data } = await useFetch('/api/solana-core-version');
solanaVersion.value = data.value['solana-core'];

const balance = ref(0);
const address = ref('A5KBL6b4e9UGXzKmDzbwMqKFg2UoZg87gXUZBZaw529Z');
const getBalanceHandler = async () => {
  balance.value = (await connection.getBalance(new PublicKey(address.value))) / 10 ** 9;
};

const getAirdropHandler = async () => {
  try {
    const signature = await connection.requestAirdrop(
      new PublicKey(address.value),
      LAMPORTS_PER_SOL * 5
    );
    const { blockhash, lastValidBlockHeight } = await connection.getLatestBlockhash();
    await connection.confirmTransaction({
      blockhash,
      lastValidBlockHeight,
      signature
    });
  } catch (error) {
    // alert(error)
    useDialog().open(JSON.stringify(error));
  }

  await getBalanceHandler();
};
</script>

<template>
  <div>
    <div>solana-core version:{{ solanaVersion }}</div>
    <div>Address:{{ address }}</div>
    <div>balance:{{ balance }}</div>
    <div>
      <n-button @click="getAirdropHandler" type="primary">Airdrop 5 sol</n-button>
      <n-button @click="getBalanceHandler" type="primary">Get Balance</n-button>
    </div>
  </div>
</template>
