<script setup lang="ts">
useHead({
  title: 'home'
});
const solanaWeb3 = useSolanaWeb3();
const solanaVersion = ref('');

solanaVersion.value = await solanaWeb3.getVersion();

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
  </div>
</template>
