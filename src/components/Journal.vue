<script setup lang="ts">
import JournalPost from './JournalPost.vue'

const postConfig = [
	{
		postName: 'WhatAreWeDoingHere',
		title: 'What are we doing here?',
		timestamp: '5:15am | January 5th, 2024'
	},
	{
		postName: 'NoSleep',
		title: 'No Sleep',
		timestamp: '5:30 am | January 7th, 2024'
	}
]

</script>

<template>
	<div v-for="post in postConfig">
		<JournalPost :postConfig="post" :postName="'WhatAreWeDoingHere'"/>
	</div>
</template>

<style scoped>
p {
  margin-top: 16px;
}
</style>