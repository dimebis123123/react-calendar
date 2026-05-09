import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface UserState {
	name: string
	isAuth: boolean
}

const initialState: UserState = {
	name: 'Dmitriy Bondar',
	isAuth: true,
}

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setName: (state, action: PayloadAction<string>) => {
			state.name = action.payload
		},
		setAuth: (state, action: PayloadAction<boolean>) => {
			state.isAuth = action.payload
		},
	},
})

export const { setName, setAuth } = userSlice.actions
export default userSlice.reducer
