<template>
  <div class="layout-default">
    <div class="header">
      <div>
        <n-menu v-model:value="currMenuKey" :options="menuOptions" mode="horizontal" />
      </div>
    </div>
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="tsx">
import { RouterLink } from 'vue-router';
const currMenuKey = ref(useRoute().name);

const menuOptions = [
  {
    key: 'transaction',
    label: () => <RouterLink to={{ path: '/transaction' }}>Transaction</RouterLink>
  }
];
</script>

<style scoped lang="scss">
.layout-default {
  width: 100%;
  height: 100%;
  padding: 10px;
  display: flex;
  flex-direction: column;
}

.header {
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: space-between;
}

.content {
  width: 100%;
  height: calc(100% - 50px);
}
</style>
