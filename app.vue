<template>
  <n-notification-provider>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </n-notification-provider>
</template>

<script setup lang="ts">
useHead({
  titleTemplate: `%s - solana-ui`
});
</script>

<style lang="scss">
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
#__nuxt {
  width: 100vw;
  height: 100vh;
}
</style>
