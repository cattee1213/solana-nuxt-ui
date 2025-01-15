<script setup lang="ts">
useHead({
  title: 'solana-ui'
});
const notification = useNotification();
const solanaWeb3 = useSolanaWeb3();
const isLoading = ref(false);
const solanaVersion = ref('');
const balance = ref(0);
const wallet = useWallet();

solanaVersion.value = await solanaWeb3.getVersion();

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

const getAirdropHandler = async () => {
  if (!wallet.publicKey.value) {
    return false;
  }
  isLoading.value = true;
  try {
    await solanaWeb3.requestAirdrop(wallet.publicKey.value, 5);
  } catch (error: any) {
    notification.error({
      title: 'Error',
      content: error.message
    });
  }
  isLoading.value = false;
  await getBalanceHandler();
};

// solanaWeb3.connection.onAccountChange(
//   wallet.publicKey.value as PublicKey,
//   (updatedAccountInfo, context) => {
//     console.log('Updated account info: ', updatedAccountInfo);
//   },

//   'confirmed'
// );
</script>

<template>
  <div>
    <div>solana-core version:{{ solanaVersion }}</div>
    <div>Address:{{ wallet.publicKey }}</div>
    <div>balance:{{ balance / 10 ** 9 }}</div>
    <div>
      <n-button :loading="isLoading" @click="getAirdropHandler" type="primary"
        >Airdrop 5 sol</n-button
      >
      <n-button :loading="isLoading" @click="getBalanceHandler" type="primary"
        >Get Balance</n-button
      >
      <Wallet />
    </div>
  </div>
</template>
