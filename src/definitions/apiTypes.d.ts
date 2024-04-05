export type Row = {
	id: number
	data: string
}

export type APIResponse = {
	status: string
	data: Array<Row>
	length: number
	controller: string
}