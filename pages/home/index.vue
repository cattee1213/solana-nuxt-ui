<script setup lang="ts">
useHead({
  title: 'home'
});
const connection = useConnection();
const solanaVersion = ref('');

async function getVersion() {
  try {
    if (connection == null) {
      return false;
    }
    const version = await connection.getVersion();
    solanaVersion.value = version['solana-core'];
  } catch (error) {
    throw createError('Failed to get version');
  }
}

onMounted(async () => {
  await getVersion();
});
getVersion();
</script>

<template>
  <div>
    <div>solana-core version:{{ solanaVersion }}</div>
  </div>
</template>
