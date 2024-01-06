<script setup lang="ts">
import JournalPost from './JournalPost.vue'

</script>

<template>
  <JournalPost :postName="'WhatAreWeDoingHere'">
	<template #heading>What are we doing here?</template>
	<template #timestamp>January 5th, 2024</template>
  </JournalPost>
</template>

<style scoped>
p {
  margin-top: 16px;
}
</style>