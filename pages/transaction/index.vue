<template>
  <div class="flex flex-col">
    <div>
      <n-button @click="createHandler">create new poll</n-button>
      <n-button @click="fetchAccountHandler">fetch account</n-button>
    </div>
    <div>
      <n-card v-for="poll in polls" :key="poll.publicKey.toString()">
        <div>pollId: {{ poll.account.pollId.toString() }}</div>
        <div>candicatorsAmount: {{ poll.account.candicatorsAmount.toString() }}</div>
        <div>startTime: {{ poll.account.startTime.toString() }}</div>
        <div>endTime: {{ poll.account.endTime.toString() }}</div>
        <div>description: {{ poll.account.description }}</div>
      </n-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { clusterApiUrl, Connection } from '@solana/web3.js';
import idl from '@/assets/idls/idl.json';
import { type VotingProgram } from '@/assets/idls/idl_types';
import { Program, AnchorProvider, setProvider, BN, type ProgramAccount } from '@coral-xyz/anchor';
import { useAnchorWallet } from 'solana-wallets-vue';
useHead({
  title: 'transaction'
});
const notification = useNotification();
const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');
const wallet = useAnchorWallet();

const provider = new AnchorProvider(connection, wallet.value as any, { commitment: 'confirmed' });
setProvider(provider);
const program = new Program(idl as unknown as VotingProgram, provider);

const createHandler = async () => {
  if (!wallet.value?.publicKey) {
    notification.error({ title: 'Error', content: 'Please connect wallet' });
    return;
  }
  try {
    await connection.getLatestBlockhash('confirmed');
    const sign = await program.methods
      .initialize(new BN(new Date().getTime()))
      .accounts({ signer: wallet.value.publicKey })
      .rpc();
    notification.success({ title: 'Success', content: 'Poll created successfully' });
  } catch (error: any) {
    notification.error({ title: 'Error', content: JSON.stringify(error) });
  }
};

const polls = ref<
  ProgramAccount<{
    pollId: BN;
    candicatorsAmount: BN;
    startTime: BN;
    endTime: BN;
    description: string;
  }>[]
>([]);
const fetchAccountHandler = async () => {
  polls.value = await program.account.poll.all();
  console.log(polls.value);
};
</script>

<style scoped></style>
