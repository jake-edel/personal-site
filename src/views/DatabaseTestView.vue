<script setup lang="ts">
import {
	getTable,
	createData,
	readData,
	updateRow,
	deleteRow,
	retrievedData,
	table
} from '@/composables/useAPI';
import type { Row } from '@/definitions/apiTypes';
import {
	ref, 
	reactive,
	computed,
	onMounted
} from 'vue'

onMounted(() => { getTable() })

const rowInput = ref()
const newRowData = ref()
function createRow(data: string) {
	createData(data)
	newRowData.value = ''
	rowInput.value.focus()
}

type NumberInput = number | string
const readElementId = ref<NumberInput>(0)

const lastElementId = computed(() => table?.data[table.data.length - 1].id)

const updatedElementId = ref(0)
const updatedElementValue = ref('')


</script>

<template>
	<div id="dbtest-container">
		<div id="database-controls">
			<button @click="createRow(newRowData)">
				Create Row
			</button>
			<input 
				v-model="newRowData"
				class="id-input"
				ref="rowInput"
				@keyup.enter="createRow(newRowData)">
			<button @click="readData(readElementId)">
				Read Row
			</button>
			<input v-model="readElementId" @keyup.enter="readData(readElementId)" type="number">
			| {{ retrievedData.data }} |
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
			<button @click="deleteRow(lastElementId)">
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
		grid-template-columns: $spacing-xxl $spacing-xxl $spacing-xxl;
		gap: $spacing-base;
		background-color: hsla(160, 100%, 37%, 1);
		border-radius: 8px;
		padding: $spacing-base;
		width: fit-content;
		button {
			grid-column: 1
		}
	}
	table {
		border-collapse: collapse;
		th, td {
			border: 1px solid;
			padding: $spacing-base;
		}
	}
}
</style>