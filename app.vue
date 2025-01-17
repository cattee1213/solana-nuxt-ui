<template>
  <n-config-provider :theme="darkTheme" :theme-overrides="themeOverrides">
    <n-notification-provider>
      <n-global-style />
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </n-notification-provider>
  </n-config-provider>
</template>

<script setup lang="ts">
import { NConfigProvider, type GlobalThemeOverrides } from 'naive-ui';
import { darkTheme } from 'naive-ui';
useHead({
  titleTemplate: `%s - solana-ui`
});

const themeOverrides: GlobalThemeOverrides = {
  common: {
    primaryColor: '#4f46e5'
  },
  Button: {
    textColor: '#fff'
  }
};
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
  // background-color: $bg-color;
}
</style>
