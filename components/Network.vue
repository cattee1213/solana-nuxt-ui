<template>
  <ClientOnly>
    <n-dropdown trigger="click" :options="options" @Select="handleSelect">
      <n-button> {{ networkStore.getCurrentNetwork.label }}</n-button>
    </n-dropdown>
  </ClientOnly>
</template>

<script lang="ts" setup>
import { useNetworkStore } from '~/stores/network';
const networkStore = useNetworkStore();

const options = [
  {
    label: 'Mainnet Beta',
    key: 'mainnet-beta'
  },
  {
    label: 'Devnet',
    key: 'devnet'
  },
  {
    label: 'Testnet',
    key: 'testnet'
  },
  {
    label: 'Localnet',
    key: 'http://127.0.0.1:8899'
  }
];
const handleSelect = (key: string | number, option: any) => {
  networkStore.updateNetwork(option);
};
</script>
