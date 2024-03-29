<script setup lang="ts">
import { RouterLink } from 'vue-router'

const routes = [
  {
    name: 'Journal',
    path: '/journal'
  },
  {
    name: 'About',
    path: '/about'
  }
]
</script>

<template>
	<nav>
    <RouterLink v-for="route in routes"
      :to="route.path"
      :key="route.name">
      {{ route.name }}
    </RouterLink>
	</nav>
</template>

<style scoped>
nav {
  width: 100%;
  font-size: 16px;
  text-decoration: none;
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