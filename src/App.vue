<script setup lang="ts">
import { RouterView } from 'vue-router'
import AppTitle from './components/AppTitle.vue'
import NavBar from './components/NavBar.vue'
</script>

<template>
  <div id="app-wrapper">
    <header>
      <div>
        <AppTitle msg="Jakob's Journal" />
        <NavBar/>
      </div>
    </header>
    <RouterView />
  </div>
</template>

<style scoped>
#app-wrapper {
  margin: 0 5% 0 5%;
}
</style>
