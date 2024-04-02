<script setup lang="ts">
import {
	ref, 
	reactive,
	computed,
	onMounted } from 'vue'

interface Row {
	id: number
	data: string
}

interface APIResponse {
	status: string
	data: Array<Row>
	length: number
	controller: string
}
const defaultResponse = {
	status: '',
	data: [],
	length: 0,
	controller: ''

}



onMounted(getTable)
const table: APIResponse = reactive(defaultResponse)
function getTable() {
	fetch('http://localhost:3001/')
		.then(response => response.json())
		.then(json => table.data = json.data)
}

const rowInput = ref()
const newRowData = ref('')
async function insertRow(data: string) {
	if (data === '') return

	try {
		const response = await fetch('http://localhost:3001/',{
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ data })
		})
		console.log(await response.json())
		newRowData.value = ''
		rowInput.value.focus()
		getTable()
	} catch (error) {
		console.error(error)
	}
}

const lastElementId = computed(() => table?.data[table.data.length - 1].id)
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

// Input type="number" is going to be a empty string when input is empty
type NumberInput = number | string
const updatedElementId = ref(0)
const updatedElementValue = ref('')
async function updateRow(id: NumberInput , data: string) {
	if (id === '' || data === '') return

	const response = await fetch('http://localhost:3001/',{
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ id, data })
	})
	console.log(await response.json())
	getTable()
}

let retrievedRow:Row = reactive({ id: 0, data: '' })
const gotElementId = ref<NumberInput>(0)
async function getRow(id: NumberInput) {
	if (id === '') return
	
	const response = await fetch(`http://localhost:3001/${id}`, {
		method: 'GET'
	})
	const retrievedData:APIResponse = await response.json()
	console.log(retrievedData)
	retrievedRow = retrievedData.data[0]
	getTable()
}
</script>

<template>
	<div>
		<button @click="insertRow(newRowData)">
			Create Row
		</button>
		<input v-model="newRowData" ref="rowInput">
		<br>
		<button @click="getRow(gotElementId)">
			Read Row
		</button>
		<input v-model="gotElementId">
		| {{ retrievedRow.data }} |
		<br>
		<button @click="updateRow(updatedElementId, updatedElementValue)">
			Update Row
		</button>
		<input v-model="updatedElementId" type="number">
		<input v-model="updatedElementValue">
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