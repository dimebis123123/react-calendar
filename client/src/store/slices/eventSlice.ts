import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface EventState {
	author: string
	guest: string
	date: string
	description: string
	title: string
}

const initialState: EventState = {
	author: '',
	guest: '',
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
		setGuest: (state, action: PayloadAction<string>) => {
			state.guest = action.payload
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

export const { setAuthor, setGuest, setDate, setDescription, setTitle } =
	eventSlice.actions
export default eventSlice.reducer
