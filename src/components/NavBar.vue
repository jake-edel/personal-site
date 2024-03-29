<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
	<nav>
		<RouterLink to="/">Home</RouterLink>
		<RouterLink to="/about">About</RouterLink>
	</nav>
</template>

<style scoped>
nav {
  width: 100%;
  font-size: 16px;
  text-align: center;
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