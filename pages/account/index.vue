<script setup lang="ts">
useHead({
  title: 'account'
});
const balance = ref(0);
const wallet = useWallet();

const getBalanceHandler = async () => {
  const connection = useConnection();
  if (!wallet.publicKey.value) {
    return false;
  }
  balance.value = await connection.getBalance(wallet.publicKey.value);
};
watchEffect(() => {
  getBalanceHandler();
});
</script>

<template>
  <div>
    <div>Address:{{ wallet.publicKey }}</div>
    <div>balance:{{ balance / 10 ** 9 }}</div>
  </div>
</template>
