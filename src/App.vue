<script setup lang="ts">
import { RouterView } from 'vue-router'
import AppTitle from './components/AppTitle.vue'
import NavBar from './components/NavBar.vue'
</script>

<template>
  <header>
    <div>
      <AppTitle msg="Jakob's Site" />
      <NavBar/>
    </div>
  </header>
  <RouterView />
</template>

<style scoped>
</style>
