<template>
  <n-list hoverable clickable>
    <n-list-item @click="explorer(tx.signature)" v-for="tx in txs" :key="tx.signature"
      >{{ tx.signature }}
    </n-list-item>
  </n-list>
</template>

<script setup lang="ts">
import { type ConfirmedSignatureInfo } from '@solana/web3.js';
const notification = useNotification();
const wallet = useWallet();

const explorer = (signature: string) => {
  window.open(`https://explorer.solana.com/tx/${signature}?cluster=devnet`, '_blank');
};

const txs = ref<ConfirmedSignatureInfo[]>([]);
const getTxsHandler = async () => {
  if (!wallet.publicKey.value) {
    return false;
  }
  const connection = useConnection();
  try {
    txs.value = await connection.getSignaturesForAddress(wallet.publicKey.value, { limit: 10 });
    return txs;
  } catch (error) {
    notification.error({
      title: 'Error',
      content: 'Failed to get txs'
    });
  }
};
watchEffect(() => {
  getTxsHandler();
});

defineExpose({
  getTxsHandler
});
</script>

<style scoped></style>
