<script setup lang="ts">
import * as api from '@/composables/useAPI'
import type { Row } from '@/definitions/apiTypes';
import {
	ref, 
	computed,
	onMounted
} from 'vue'

onMounted(() => { api.getTableColumns() })
onMounted(() => { api.getTable() })

const rowInput = ref()
const newRowData = ref()
function createRow(data: string) {
	api.createData(data)
	newRowData.value = ''
	rowInput.value.focus()
}

type NumberInput = number | string
const readElementId = ref<NumberInput>(0)

const lastElementId = computed(() => api.table?.data[api.table.data.length - 1].id)

const updatedElementId = ref(0)
const updatedElementValue = ref('')


</script>

<template>
	<div class="dbtest-container">
		<div class="database-controls">
			<button @click="createRow(newRowData)">
				Create Row
			</button>
			<input 
				v-model="newRowData"
				class="id-input"
				ref="rowInput"
				@keyup.enter="createRow(newRowData)">
			<button @click="api.readData(readElementId)">
				Read Row
			</button>
			<input v-model="readElementId" @keyup.enter="api.readData(readElementId)" type="number">
			| {{ api.retrievedData.data }} |
			<button @click="api.updateRow(updatedElementId, updatedElementValue)">
				Update Row
			</button>
			<input
				v-model="updatedElementId"
				class="id-input"
				type="number">
			<input
				class="data-input"
				v-model="updatedElementValue">
			<button @click="api.deleteRow(lastElementId)">
				Delete Last Row
			</button>
		</div>
		<table>
			<tr>
				<th>ID</th>
				<th>Data</th>
			</tr>
			<tr v-if="api.table" v-for="row in api.table.data">
				<td>{{ row.id }}</td>
				<td>{{ row.data }}</td>
			</tr>
		</table>
	</div>
</template>

<style scoped lang="scss">
.dbtest-container {
	display: flex;
	flex-direction: column;
	align-items: center;
	.database-controls {
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