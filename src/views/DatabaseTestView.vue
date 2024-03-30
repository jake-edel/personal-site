<script setup lang="ts">
import { ref } from 'vue'

interface Row {
	id: number
	data: string
}

interface APIResponse {
	data: Array<Row>
}
const table = ref<APIResponse | undefined>()

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