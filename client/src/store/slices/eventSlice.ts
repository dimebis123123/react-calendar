import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface EventState {
	author: string
	guests: any[]
	date: string
	description: string
	title: string
	events: any[]
}

const initialState: EventState = {
	author: '',
	guests: [],
	date: '',
	description: '',
	title: '',
	events: [],
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
		setEvents: (state, action: PayloadAction<any[]>) => {
			state.events = action.payload
		},
	},
})

export const {
	setAuthor,
	setGuests,
	setDate,
	setDescription,
	setTitle,
	setEvents,
} = eventSlice.actions
export default eventSlice.reducer
