<script setup lang="ts">
import JournalPost from './JournalPost.vue'

const postConfig = {
	postName: 'WhatAreWeDoingHere',
	title: 'What are we doing here?',
	timestamp: '5:15am | January 5th, 2024'
}

</script>

<template>
	<JournalPost :postConfig="postConfig" :postName="'WhatAreWeDoingHere'"/>
</template>

<style scoped>
p {
  margin-top: 16px;
}
</style>