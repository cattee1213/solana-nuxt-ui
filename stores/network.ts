import { defineStore } from 'pinia';

export const useNetworkStore = defineStore('network', {
  state: () => ({
    currentNetwork: { key: 'devnet', label: 'Devnet' } // 默认网络设置为 devnet
  }),
  getters: {
    getCurrentNetwork: (state) => state.currentNetwork
  },
  actions: {
    updateNetwork(network: any) {
      this.currentNetwork = network;
    }
  },
  persist: true
});
