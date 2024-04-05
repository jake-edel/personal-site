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
	try {
		fetch('http://localhost:3001/testTable')
			.then(response => response.json())
			.then(json => table.data = json.data)
	} catch (error) {
		console.error(error)
	}
}

const rowInput = ref()
const newRowData = ref('')
async function insertRow(data: string) {
	if (data === '') return

	try {
		const response = await fetch('http://localhost:3001/testTable',{
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

	try {
		const response = await fetch('http://localhost:3001/testTable',{
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ id })
		})
		console.log(await response.json())
		getTable()
	} catch (error) {
		console.error(error)
	}
}

// Input type="number" is going to be a empty string when input is empty
type NumberInput = number | string
const updatedElementId = ref(0)
const updatedElementValue = ref('')
async function updateRow(id: NumberInput , data: string) {
	if (id === '' || data === '') return

	try {
		const response = await fetch('http://localhost:3001/testTable',{
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ id, data })
		})
		console.log(await response.json())
		getTable()
	} catch (error) {
		console.error(error)
	}
}

let retrievedRow:Row = reactive({ id: 0, data: '' })
const readElementId = ref<NumberInput>(0)
async function getRow(id: NumberInput) {
	if (id === '') return
	try {
		const response = await fetch(`http://localhost:3001/testTable/${id}`, {
			method: 'GET'
		})
		const retrievedData:APIResponse = await response.json()
		console.log(retrievedData)
		retrievedRow = retrievedData.data[0]
		getTable()
	} catch (error) {
		console.error
	}
}
</script>

<template>
	<div id="dbtest-container">
		<div id="database-controls">
			<button @click="insertRow(newRowData)">
				Create Row
			</button>
			<input 
				v-model="newRowData"
				class="id-input"
				ref="rowInput">
			<button @click="getRow(readElementId)">
				Read Row
			</button>
			<input v-model="readElementId" type="number">
			| {{ retrievedRow.data }} |
			<button @click="updateRow(updatedElementId, updatedElementValue)">
				Update Row
			</button>
			<input
				v-model="updatedElementId"
				class="id-input"
				type="number">
			<input
				class="data-input"
				v-model="updatedElementValue">
			<button @click="deleteLastRow(lastElementId)">
				Delete Last Row
			</button>
		</div>
		<table>
			<tr>
				<th>ID</th>
				<th>Data</th>
			</tr>
			<tr v-if="table" v-for="row in table.data">
				<td>{{ row.id }}</td>
				<td>{{ row.data }}</td>
			</tr>
		</table>
	</div>
</template>

<style scoped lang="scss">
#dbtest-container {
	display: flex;
	flex-direction: column;
	align-items: center;
	#database-controls {
		margin-bottom: 16px;
		display: grid;
		grid-template-columns: 128px 128px 128px;
		gap: 8px;
		background-color: hsla(160, 100%, 37%, 1);
		border-radius: 8px;
		padding: 8px;
		width: fit-content;
		button {
			grid-column: 1
		}
	}
	table {
		border-collapse: collapse;
		width: 100%;
		th, td {
			border: 1px solid;
			padding: 8px;
		}
	}
}
</style>