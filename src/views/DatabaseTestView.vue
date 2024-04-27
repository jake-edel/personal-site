<script setup lang="ts">
import * as api from '@/composables/useAPI'
import {
	ref,
	computed,
	onMounted
} from 'vue'

let columns = ref<string[] | undefined>([])
onMounted(async () => { columns.value = await api.getTableColumns() })
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
			{{ api.retrievedData.data }}
			<button @click="api.updateRow(updatedElementId, updatedElementValue)" class="update-btn">
				Update Row
			</button>
			<label v-for="column, index in columns"
				:for="`${column}-input`"
				:class="`${column}-label`"
				:style="{gridColumn: index + 2}">
				{{ column[0].toUpperCase() + column.slice(1) }}
			</label>
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
			<tr v-if="columns" >
				<th v-for="column in columns">{{ column[0].toUpperCase() + column.slice(1) }}</th>
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
		color: black;
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
		.input-labels {
			grid-row: 3
		}
		.update-btn {
			grid-row: 4;
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