<template>
  <div><n-button @click="createHandler">create new poll</n-button></div>
</template>

<script setup lang="ts">
import {
  PublicKey,
  sendAndConfirmTransaction,
  Transaction,
  TransactionInstruction
} from '@solana/web3.js';
const programId = new PublicKey('HnVat5syJwbkEok6x5N3FJnevY8jRpvSNeXVZF8VKjMp');
useHead({
  title: 'transaction'
});
const notification = useNotification();
const solanaWeb3 = useSolanaWeb3();
const wallet = useWallet();

const createHandler = async () => {
  if (!wallet.publicKey.value) {
    return false;
  }
  // 创建一个指令
  const instruction = new TransactionInstruction({
    programId,
    keys: [
      // 需要签名的账户
      { pubkey: wallet.publicKey.value, isSigner: true, isWritable: true }
    ],
    data: Buffer.from(Uint8Array.of(123))
  });

  // 将指令加入到交易中
  const tx = new Transaction().add(instruction);
  try {
    const signature = await wallet.sendTransaction(tx, solanaWeb3.connection);
    await solanaWeb3.connection.confirmTransaction(signature, 'processed');

    notification.success({
      title: 'Success',
      content: signature
    });
  } catch (error: any) {
    notification.error({
      title: 'Error',
      content: error.error
    });
  }
};
</script>

<style scoped></style>
