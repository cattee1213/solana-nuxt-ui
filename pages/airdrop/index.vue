<script setup lang="ts">
useHead({
  title: 'airdrop'
});
import { CheckmarkCircle } from '@vicons/ionicons5';
const notification = useNotification();
const solanaWeb3 = useSolanaWeb3();
const isLoading = ref(false);
const wallet = useWallet();
const publicKey = ref(wallet.publicKey.value?.toString() || '');

const tags = ref([2, 5, 10]);
const number = ref(2);

const getAirdropHandler = async () => {
  if (!wallet.publicKey.value) {
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
