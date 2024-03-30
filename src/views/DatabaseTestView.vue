<script setup lang="ts">
async function fetchTableThen() {
	const response = fetch('http://localhost:3001/')
	// const response = fetch('http://127.0.0.1:3001/') <= how to get this to work?
		.then(response => response.json())
		.then(json => json)
	console.log(await response)
}

async function fetchTableAwait() {
	const response = await fetch('http://localhost:3001/')
	// const response = await fetch('http://127.0.0.1:3001/') <= how to get this to work?
	const json = await response.json()
	console.log(json)
}

</script>

<template>
	<div>
		<button @click="fetchTableThen">Make Fetch Then Request</button>
		<button @click="fetchTableAwait">Make Fetch AWAIT Request</button>
	</div>
</template>

<style scoped>
</style>