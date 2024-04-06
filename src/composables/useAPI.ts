import { ref, reactive } from 'vue'
import type { APIResponse, Row } from '@/definitions/apiTypes'

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

async function createData(data: string) {
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
		getTable()
	} catch (error) {
		console.error(error)
	}
}

let retrievedData:Row = reactive({ id: 0, data: '' })
async function readData(id: NumberInput) {
	if (id === '') return
	try {
		const response = await fetch(`http://localhost:3001/testTable/${id}`, {
			method: 'GET'
		})
		const data:APIResponse = await response.json()
		console.log(data)
		retrievedData = data.data[0]
		getTable()
	} catch (error) {
		console.error
	}
}

// Input type="number" is going to be a empty string when input is empty
type NumberInput = number | string
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

async function deleteRow(id: number | undefined) {
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

export {
	getTable,
	createData,
	readData,
	updateRow,
	deleteRow,
	table,
	retrievedData
}