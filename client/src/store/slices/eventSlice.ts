import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface EventState {
	author: string
	guests: any[]
	date: string
	description: string
	title: string
}

const initialState: EventState = {
	author: '',
	guests: [],
	date: '',
	description: '',
	title: '',
}

const eventSlice = createSlice({
	name: 'event',
	initialState,
	reducers: {
		setAuthor: (state, action: PayloadAction<string>) => {
			state.author = action.payload
		},
		setGuests: (state, action: PayloadAction<any[]>) => {
			state.guests = action.payload
		},
		setDate: (state, action: PayloadAction<string>) => {
			state.date = action.payload
		},
		setDescription: (state, action: PayloadAction<string>) => {
			state.description = action.payload
		},
		setTitle: (state, action: PayloadAction<string>) => {
			state.title = action.payload
		},
	},
})

export const { setAuthor, setGuests, setDate, setDescription, setTitle } =
	eventSlice.actions
export default eventSlice.reducer
