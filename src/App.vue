<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import AppTitle from './components/AppTitle.vue'
</script>

<template>
  <div id="app-wrapper">
    <header>
      <div>
        <AppTitle msg="Jakob's Journal" />
        <nav>
          <RouterLink to="/">Home</RouterLink>
          <RouterLink to="/about">About</RouterLink>
        </nav>
      </div>
    </header>
    <RouterView />
  </div>
</template>

<style scoped>
#app-wrapper {
  margin: 0 5% 0 5%;
}

nav {
  width: 100%;
  font-size: 16px;
  text-align: center;
  text-decoration:none;
}

nav a.router-link-exact-active {
  color: hsla(160, 100%, 37%, 1);
  text-decoration: none;
}

nav a {
  display: inline-block;
  padding: 0px 16px 0px 16px;
  border-left: 1px solid var(--color-border);
  text-decoration: none;
}

nav a:first-of-type {
  border: 0;
}
</style>
