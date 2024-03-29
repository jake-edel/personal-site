<script setup>
import JournalPost from '../components/JournalPost.vue'
import { postConfigs } from '@/data/postConfig.ts'
</script>

<template>
	<div v-for="post in postConfigs">
		<JournalPost :postConfig="post"/>
	</div>
</template>

<style scoped>
p {
  margin-top: 16px;
}
</style>