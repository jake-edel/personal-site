<script setup lang="ts">
import JournalPost from './JournalPost.vue'
import { postConfigs } from '@/data/postConfigs.js'
import { test } from '@/data/test'
</script>

<template>
	{{  postConfigs }}
	{{  test }}
	<div v-for="post in postConfigs">
		<JournalPost :postConfig="post"/>
	</div>
</template>

<style scoped>
p {
  margin-top: 16px;
}
</style>