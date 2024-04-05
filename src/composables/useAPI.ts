import { ref, reactive } from 'vue'
import type { APIResponse } from '@/definitions/apiTypes'

const defaultResponse = {
	status: '',
	data: [],
	length: 0,
	controller: ''
}

const table: APIResponse = reactive(defaultResponse)
function getTable(): any {
	try {
		fetch('http://localhost:3001/testTable')
			.then(response => response.json())
			.then(json => table.data = json.data)
	} catch (error) {
		console.error(error)
	}
}

const newRowData = ref()
async function insertRow(data: string) {
	if (!data) return

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
		getTable()
	} catch (error) {
		console.error(error)
	}
}

export {
	getTable,
	table,
	insertRow,
	newRowData
}