<script setup lang="ts">
import JournalPost from '../components/JournalPost.vue'
import { postConfigs } from '@/data/postConfig'
</script>

<template>
	<div v-for="post in postConfigs">
		<JournalPost :postConfig="post"/>
	</div>
</template>

<style scoped>
</style>