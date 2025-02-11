<template>
  <ClientOnly>
    <n-dropdown trigger="click" :options="options" @Select="handleSelect" class="network">
      <div class="btn">{{ networkStore.getCurrentNetwork.label }}</div>
    </n-dropdown>
  </ClientOnly>
</template>

<script lang="ts" setup>
import { useThemeVars } from 'naive-ui';
import { useNetworkStore } from '~/stores/network';
const networkStore = useNetworkStore();
const themeVars = useThemeVars();

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

<style lang="scss" scoped>
.btn {
  cursor: pointer;
  padding: 0 24px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: v-bind('themeVars.primaryColor');
  color: v-bind('themeVars.baseColor');
  border-radius: 6px;
  font-size: 16px;
  font-weight: 600;
  height: 48px;
}
</style>
