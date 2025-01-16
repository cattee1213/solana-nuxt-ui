<script setup lang="ts">
useHead({
  title: 'account'
});
const notification = useNotification();
const solanaWeb3 = useSolanaWeb3();
const isLoading = ref(false);
const balance = ref(0);
const wallet = useWallet();

const getBalanceHandler = async () => {
  if (!wallet.publicKey.value) {
    return false;
  }
  isLoading.value = true;
  try {
    balance.value = await solanaWeb3.getBalance(wallet.publicKey.value);
  } catch (error: any) {
    notification.error({
      title: 'Error',
      content: error.error
    });
  }
  isLoading.value = false;
};

watchEffect(() => {
  getBalanceHandler();
});
getBalanceHandler();
</script>

<template>
  <div>
    <div>Address:{{ wallet.publicKey }}</div>
    <div>balance:{{ balance / 10 ** 9 }}</div>
  </div>
</template>
