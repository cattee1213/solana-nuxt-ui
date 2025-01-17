<script setup lang="ts">
useHead({
  title: 'airdrop'
});
import type { ConfirmedSignatureInfo } from '@solana/web3.js';
import { CheckmarkCircle } from '@vicons/ionicons5';
const notification = useNotification();
const solanaWeb3 = useSolanaWeb3();
const isLoading = ref(false);
const wallet = useWallet();
const publicKey = ref(wallet.publicKey.value?.toString() || '');
const txs = ref<ConfirmedSignatureInfo[]>([]);

const tags = ref([2, 5, 10]);
const number = ref(2);

const getTxsHandler = async () => {
  if (!publicKey.value) {
    return false;
  }
  try {
    txs.value = await solanaWeb3.getTxs(publicKey.value);
  } catch (error: any) {
    notification.error({
      title: 'Error',
      content: error.message
    });
  }
};

const getAirdropHandler = async () => {
  if (!publicKey.value) {
    return false;
  }
  isLoading.value = true;
  try {
    await solanaWeb3.requestAirdrop(publicKey.value, number.value);
    notification.success({
      title: 'Success',
      content: `Airdrop ${number.value} sol success`
    });
  } catch (error: any) {
    notification.error({
      title: 'Error',
      content: error.message
    });
  }
  isLoading.value = false;
  getTxsHandler();
};

getTxsHandler();

const explorer = (signature: string) => {
  window.open(`https://explorer.solana.com/tx/${signature}?cluster=devnet`, '_blank');
};
</script>

<template>
  <div class="airdrop-container">
    <div class="form">
      <n-input v-model:value="publicKey"></n-input>
      <div class="tags-btn">
        <n-tag
          class="pointer"
          v-for="tag in tags"
          :key="tag"
          @click="
            () => {
              number = tag;
            }
          "
        >
          <template #icon>
            <n-icon v-show="tag === number" :component="CheckmarkCircle" />
          </template>
          <template #default> {{ tag }} sol </template>
        </n-tag>
        <n-button :loading="isLoading" @click="getAirdropHandler" type="primary">Airdrop</n-button>
      </div>
      <n-list hoverable clickable>
        <n-list-item @click="explorer(tx.signature)" v-for="tx in txs" :key="tx.signature"
          >{{ tx.signature }}
        </n-list-item>
      </n-list>
    </div>
  </div>
</template>

<style scoped lang="scss">
.airdrop-container {
  width: 100%;
  height: 100%;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .form {
    width: 400px;
    height: 400px;
    display: flex;
    flex-direction: column;
    align-items: center;

    .tags-btn {
      display: flex;
      height: 50px;
      justify-content: center;
      align-items: center;
      gap: 10px;
    }
  }
}
.pointer {
  cursor: pointer;
}
</style>
