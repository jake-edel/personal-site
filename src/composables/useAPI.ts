import { reactive } from 'vue'
import type { APIResponse } from '@/definitions/apiTypes'

const defaultResponse = {
	status: '',
	data: [],
	length: 0,
	controller: ''
}

export const table: APIResponse = reactive(defaultResponse)
export function getTable() {
	try {
		fetch('http://localhost:3001/testTable')
			.then(response => response.json())
			.then(json => table.data = json.data)
	} catch (error) {
		console.error(error)
	}
}
