<script setup lang="ts">
import { ref, reactive, computed } from 'vue'

interface Row {
	id: number
	data: string
}

interface APIResponse {
	data: Array<Row>
}

const table: APIResponse = reactive({ data: [] })
const lastElementId = computed(() => table?.data[table.data.length - 1].id)

const getTable = () => fetch('http://localhost:3001/')
	.then(response => response.json())
	.then(json => table.data = json)

const rowInput = ref()
async function insertRow(data: string) {
	if (data === '') return

	const response = await fetch('http://localhost:3001/',{
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ data })
	})
	console.log(await response.json())
	newRow.value = ''
	rowInput.value.focus()
	getTable()
}

async function deleteLastRow(id: number | undefined) {
	if (id === undefined) return

	const response = await fetch('http://localhost:3001/',{
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ id })
	})
	console.log(await response.json())
	getTable()
	}

const newRow = ref('')
</script>

<template>
	<div>
		<button @click="getTable">
			Get Data
		</button>
		<br>
		<button @click="insertRow(newRow)">
			Create Row
		</button>
		<input v-model="newRow" ref="rowInput">
		<br>
		<button @click="deleteLastRow(lastElementId)">
			Delete Row
		</button>
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