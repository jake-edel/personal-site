<script setup lang="ts">

async function fetchTableThen() {
	const response = fetch('http://localhost:3001/')
		.then(response => response.json())
		.then(json => json)

	return response
}
console.log('fetchTableThen: ', await fetchTableThen())

async function fetchTableAwait() {
	const response = await fetch('http://localhost:3001/')
	const json = await response.json()
	return json
}
console.log('fetchTableAwait: ', await fetchTableAwait())

</script>

<template>
	<div>
		<button @click="fetchTableThen">Make Fetch Then Request</button>
		<button @click="fetchTableAwait">Make Fetch AWAIT Request</button>
	</div>
</template>

<style scoped>
</style>