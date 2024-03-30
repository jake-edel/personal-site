<script setup lang="ts">
import { ref } from 'vue';

// async function fetchTableThen() {
// 	const response = fetch('http://localhost:3001/')
// 	// const response = fetch('http://127.0.0.1:3001/') <= how to get this to work?
// 		.then(response => response.json())
// 		.then(json => json)
// 	console.log(await response)
// }

// async function fetchTableAwait() {
// 	const response = await fetch('http://localhost:3001/')
// 	// const response = await fetch('http://127.0.0.1:3001/') <= how to get this to work?
// 	const json = await response.json()
// 	console.log(json)
// }

const table = ref(null)
const getTable = () => fetch('http://localhost:3001/')
	.then(response => response.json())
	.then(json => table.value = json)


async function insertRow(data: string) {
	const response = await fetch('http://localhost:3001/',{
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ data })
	})
	console.log((await response).json())
	getTable()
}

async function deleteLastRow(id: number) {
	const response = await fetch('http://localhost:3001/',{
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ id })
	})
	console.log((await response).json())
	getTable()
	}

	const newRow = ref('')
</script>

<template>
	<div>
		<button @click="getTable">Get Data</button><br>
		<button @click="insertRow(newRow)">Create Row</button><input v-model="newRow"><br>
		<button @click="deleteLastRow(table.data[table.data.length -1].id)">Delete Row</button>
		<table>
			<th>
				<td>ID</td>
				<td>Data</td>
			</th>
			<tr v-if="table" v-for="row in table.data">
				<td>{{ row.id }}</td>
				<td>{{ row.data }}</td>
			</tr>
		</table>
	</div>
</template>

<style scoped>
</style>