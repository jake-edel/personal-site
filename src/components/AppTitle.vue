<script setup lang="ts">
defineProps<{
  msg: string
}>()
</script>

<template>
  <div class="app-title">
    <h1>{{ msg }}</h1>
  </div>
</template>

<style scoped>
.app-title {
  font-size: 32px;
  color: hsla(160, 100%, 37%, 1);
}
</style>
