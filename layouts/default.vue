<template>
  <div>
    <n-menu :options="menuOptions" mode="horizontal" />
    <slot></slot>
  </div>
</template>

<script setup lang="tsx">
import { RouterLink } from 'vue-router';

const menuOptions = [
  {
    key: 'Home',
    label: () => <RouterLink to={{ path: '/home' }}>Home</RouterLink>
  },
  {
    key: 'Transaction',
    label: () => <RouterLink to={{ path: '/transaction' }}>Transaction</RouterLink>
  }
];
</script>

<style scoped></style>
